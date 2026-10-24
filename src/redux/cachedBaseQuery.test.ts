import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makeRepository } from '../../test/fixtures'
import { server } from '../../test/server'
import { APP_CONFIG } from '../shared/constants'
import { queryErrorMessage, siteApi } from './api'
import { resetRefreshed, setDataOrigin } from './cachedBaseQuery'
import { ConfigureStore } from './configureStore'

const GITHUB = '*/data/github.json'

/** One visit to the site: a new store, as a page load makes, loading the repositories. */
async function visit() {
  const store = ConfigureStore()
  const result = await store.dispatch(siteApi.endpoints.getRepositories.initiate())
  return result
}

/** A new page load: the background refreshes of the last one are forgotten. */
function reload() {
  resetRefreshed()
}

/** Serve these repositories, counting the requests. */
function serveRepositories(...names: string[]) {
  const requests = { count: 0 }
  server.use(
    http.get(GITHUB, () => {
      requests.count += 1
      return HttpResponse.json(names.map((name) => makeRepository({ name })))
    })
  )
  return requests
}

async function cachedNames(): Promise<string[] | undefined> {
  const cache = await caches.open(APP_CONFIG.caching.names.data)
  const response = await cache.match(APP_CONFIG.apis.repositories)
  if (!response) return undefined
  const repositories: { name: string }[] = await response.json()
  return repositories.map((repo) => repo.name)
}

const names = (result: Awaited<ReturnType<typeof visit>>) =>
  result.data?.map((repo) => repo.name)

beforeEach(() => {
  reload()
})

describe('cachedBaseQuery', () => {
  it('fetches a first visit from the network, and caches it', async () => {
    const requests = serveRepositories('first')

    expect(names(await visit())).toEqual(['first'])
    expect(requests.count).toBe(1)
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['first']))
  })

  it('answers a returning visit from the cache, then refreshes the cache for next time', async () => {
    serveRepositories('old')
    await visit()
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['old']))

    // the data changed on the server.
    const requests = serveRepositories('new')
    reload()
    expect(names(await visit())).toEqual(['old'])
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['new']))
    expect(requests.count).toBe(1)

    reload()
    expect(names(await visit())).toEqual(['new'])
  })

  it("doesn't wait for a slow server when the response is cached", async () => {
    serveRepositories('cached')
    await visit()
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['cached']))

    // a server that never answers.
    server.use(http.get(GITHUB, () => new Promise<never>(() => {})))
    reload()

    expect(names(await visit())).toEqual(['cached'])
  })

  it('refreshes a url only once per page load', async () => {
    serveRepositories('one')
    await visit()
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['one']))

    const requests = serveRepositories('two')
    reload()
    await visit()
    await visit()
    await visit()

    await vi.waitFor(() => expect(requests.count).toBe(1))
  })

  it("doesn't cache an error", async () => {
    server.use(http.get(GITHUB, () => new HttpResponse(null, { status: 503 })))

    expect(queryErrorMessage((await visit()).error)).toBe('Error 503')
    expect(await cachedNames()).toBeUndefined()
  })

  it('keeps the cached data when the background refresh fails', async () => {
    serveRepositories('kept')
    await visit()
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['kept']))

    let refreshed = false
    server.use(
      http.get(GITHUB, () => {
        refreshed = true
        return new HttpResponse(null, { status: 500 })
      })
    )
    reload()
    expect(names(await visit())).toEqual(['kept'])
    await vi.waitFor(() => expect(refreshed).toBe(true))
    expect(await cachedNames()).toEqual(['kept'])
  })

  it('drops a cached response that the schema no longer accepts, and fetches it again', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const cache = await caches.open(APP_CONFIG.caching.names.data)
    await cache.put(APP_CONFIG.apis.repositories, HttpResponse.json([{ name: 42 }]))
    const requests = serveRepositories('valid')

    const result = await visit()

    expect(result.error).toBeUndefined()
    expect(names(result)).toEqual(['valid'])
    expect(requests.count).toBeGreaterThanOrEqual(1)
    await vi.waitFor(async () => expect(await cachedNames()).toEqual(['valid']))
  })

  it('fetches again when the cached response is unreadable', async () => {
    const cache = await caches.open(APP_CONFIG.caching.names.data)
    await cache.put(APP_CONFIG.apis.repositories, new Response('not json'))
    serveRepositories('fresh')

    expect(names(await visit())).toEqual(['fresh'])
  })

  it('fetches relative urls from the data origin, when one is set', async () => {
    const urls: string[] = []
    server.use(
      http.get(GITHUB, ({ request }) => {
        urls.push(request.url)
        return HttpResponse.json([makeRepository({ name: 'from the origin' })])
      })
    )
    setDataOrigin('https://example.test')
    try {
      expect(names(await visit())).toEqual(['from the origin'])
      expect(urls).toEqual(['https://example.test/data/github.json'])
    } finally {
      setDataOrigin('')
    }
  })

  it('works without the Cache API', async () => {
    const original = globalThis.caches
    Reflect.deleteProperty(globalThis, 'caches')
    try {
      serveRepositories('uncached')
      expect(names(await visit())).toEqual(['uncached'])
    } finally {
      Object.defineProperty(globalThis, 'caches', { value: original, configurable: true })
    }
  })

  it('works when the Cache API refuses to open or to store', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    serveRepositories('anyway')

    const open = vi.spyOn(caches, 'open').mockRejectedValueOnce(new Error('denied'))
    expect(names(await visit())).toEqual(['anyway'])
    open.mockRestore()

    const cache = await caches.open(APP_CONFIG.caching.names.data)
    vi.spyOn(caches, 'open').mockResolvedValue({
      ...cache,
      match: async () => undefined,
      put: async () => {
        throw new Error('quota exceeded')
      },
    } as unknown as Cache)
    reload()
    expect(names(await visit())).toEqual(['anyway'])
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('could not cache'),
      expect.any(Error)
    )
  })
})
