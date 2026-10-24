import { http, HttpResponse } from 'msw'
import { describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../constants'
import { fetchPostTags } from './apiPostTagsFetcher'
import { cachedFetchJson, errorMessage } from './cachedFetch'
import { imagePreFetcher } from './imagePrefetcher'

const IMAGE =
  'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'

async function cachedImage(url = IMAGE) {
  const cache = await caches.open(APP_CONFIG.caching.names.cdn)
  return cache.match(url)
}

describe('cachedFetchJson', () => {
  it('fetches, caches and returns the document', async () => {
    server.use(http.get('*/data/example.json', () => HttpResponse.json({ ok: 1 })))
    vi.spyOn(console, 'log').mockImplementation(() => {})

    expect(await cachedFetchJson('/data/example.json', 'example')).toEqual({ ok: 1 })
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    expect(await cache.match('/data/example.json')).toBeDefined()
  })

  it('describes errors that are not Errors', () => {
    expect(errorMessage(new Error('boom'))).toBe('boom')
    expect(errorMessage('plain')).toBe('plain')
  })
})

describe('imagePreFetcher', () => {
  it('caches each featured image that is not cached yet', async () => {
    let requests = 0
    server.use(
      http.get(IMAGE, () => {
        requests += 1
        return new HttpResponse('image')
      })
    )

    await imagePreFetcher([makePost(), makePost({ _embedded: undefined })], 'Test')
    await imagePreFetcher([makePost()], 'Test')

    expect(requests).toBe(1)
    expect(await cachedImage()).toBeDefined()
  })

  it("doesn't cache a failed response", async () => {
    server.use(http.get(IMAGE, () => new HttpResponse(null, { status: 404 })))

    await imagePreFetcher([makePost()], 'Test')

    expect(await cachedImage()).toBeUndefined()
  })

  it('logs a network error and carries on', async () => {
    server.use(http.get(IMAGE, () => HttpResponse.error()))
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    await imagePreFetcher([makePost()], 'Test')

    expect(error).toHaveBeenCalledWith(
      `imagePreFetcher() failed: Test - ${IMAGE}`,
      expect.any(TypeError)
    )
  })
})

describe('fetchPostTags', () => {
  const TAGS = APP_CONFIG.apis.tags.split('?')[0]

  it("returns each tag's id and name", async () => {
    server.use(
      http.get(TAGS, () => HttpResponse.json([{ id: 7, name: 'Python', count: 3 }]))
    )
    expect(await fetchPostTags()).toEqual([{ id: 7, name: 'Python' }])
  })

  it('returns no tags when the request fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    server.use(http.get(TAGS, () => new HttpResponse(null, { status: 500 })))
    expect(await fetchPostTags()).toEqual([])

    server.use(http.get(TAGS, () => HttpResponse.error()))
    expect(await fetchPostTags()).toEqual([])

    expect(error).toHaveBeenCalledWith(
      'Error fetching Wordpress Api post tags:',
      expect.any(TypeError)
    )
  })
})
