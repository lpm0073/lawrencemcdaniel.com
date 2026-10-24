import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { describe, expect, it, vi } from 'vitest'

import {
  makeArticle,
  makeMedia,
  makePost,
  makeRepository,
  makeVideo,
} from '../../test/fixtures'
import { serveSiteData, siteHandlers } from '../../test/handlers'
import { server } from '../../test/server'
import { APP_CONFIG } from '../shared/constants'
import { prefetchSiteData, queryErrorMessage, schemaFailureMessage, siteApi } from './api'
import { ConfigureStore } from './configureStore'
import {
  useArticles,
  useClients,
  useEducation,
  usePortfolio,
  useProjectImages,
  useRecommendations,
  useRepositories,
  useSpecialties,
  useVideos,
} from './hooks'
import { entryAnimationPlayed, logoCubeSaved } from './uiSlice'

const posts = (url: string) => url.split('?')[0]
const CDN_IMAGE = 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/*'

/** Run an endpoint's query in a new store, and return the result. */
async function query<T>(
  run: (store: ReturnType<typeof ConfigureStore>) => Promise<T>
): Promise<{ result: T; store: ReturnType<typeof ConfigureStore> }> {
  const store = ConfigureStore()
  const result = await run(store)
  return { result, store }
}

describe('the data files in public/data', () => {
  it('loads the articles, and adds their skills', async () => {
    server.use(
      http.get('*/data/blog.lawrencemcdaniel.com.json', () =>
        HttpResponse.json([makeArticle({ categories: ['aws', 'reactjs'] })])
      )
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getArticles.initiate())
    )
    expect([...(result.data?.[0].skills ?? [])].sort()).toEqual(['cloud', 'react'])
  })

  it('loads the videos, and adds their skills', async () => {
    server.use(
      http.get('*/data/youtube.json', () =>
        HttpResponse.json([makeVideo({ tags: ['python', 'django'] })])
      )
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getVideos.initiate())
    )
    expect(result.data?.[0].skills).toEqual(['full-stack'])
  })

  it('loads the repositories', async () => {
    server.use(
      http.get('*/data/github.json', () =>
        HttpResponse.json([makeRepository(), makeRepository({ readme: null })])
      )
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getRepositories.initiate())
    )
    expect(result.data?.map((repo) => repo.name)).toHaveLength(2)
  })
})

describe('the WordPress endpoints', () => {
  it('load posts and media, and prefetch their featured images', async () => {
    const images: string[] = []
    server.use(
      http.get(posts(APP_CONFIG.apis.education), ({ request }) => {
        const category = new URL(request.url).searchParams.get('categories')
        return HttpResponse.json([makePost({ slug: `category-${category}` })])
      }),
      http.get(posts(APP_CONFIG.apis.projects), () => HttpResponse.json([makeMedia()])),
      http.get(CDN_IMAGE, ({ request }) => {
        images.push(request.url)
        return new HttpResponse('image')
      })
    )
    const store = ConfigureStore()

    const [education, portfolio, recommendations, clients, projects] = await Promise.all([
      store.dispatch(siteApi.endpoints.getEducation.initiate()),
      store.dispatch(siteApi.endpoints.getPortfolio.initiate()),
      store.dispatch(siteApi.endpoints.getRecommendations.initiate()),
      store.dispatch(siteApi.endpoints.getClients.initiate()),
      store.dispatch(siteApi.endpoints.getProjectImages.initiate()),
    ])

    expect(education.data?.[0].slug).toBe('category-44')
    expect(portfolio.data?.[0].slug).toBe('category-47')
    expect(recommendations.data?.[0].slug).toBe('category-45')
    expect(clients.data?.[0].slug).toBe('category-46')
    expect(projects.data?.[0].id).toBe(3694)
    await waitFor(() => expect(images.length).toBeGreaterThan(0))
  })

  it('treats an empty acf array as no fields', async () => {
    server.use(
      http.get(posts(APP_CONFIG.apis.education), () =>
        HttpResponse.json([{ ...makePost(), acf: [] }])
      ),
      http.get(CDN_IMAGE, () => new HttpResponse('image'))
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getEducation.initiate())
    )
    expect(result.data?.[0].acf).toEqual({})
  })

  it('treats a null acf field as missing', async () => {
    server.use(
      http.get(posts(APP_CONFIG.apis.education), () =>
        HttpResponse.json([
          {
            ...makePost(),
            acf: { institution: 'MIT', course_title: null, certificate_url: null },
          },
        ])
      ),
      http.get(CDN_IMAGE, () => new HttpResponse('image'))
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getEducation.initiate())
    )
    expect(result.error).toBeUndefined()
    expect(result.data?.[0].acf).toEqual({
      institution: 'MIT',
      course_title: undefined,
      certificate_url: undefined,
    })
  })
})

describe('getSpecialties', () => {
  it('names each skill after its tag, and extracts the logos', async () => {
    const mediumUrl =
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'
    server.use(
      http.get(posts(APP_CONFIG.apis.specialties), () =>
        HttpResponse.json([
          makePost({ id: 1, tags: [7, 8], categories: [43, 48] }),
          makePost({ id: 2, categories: [43], _embedded: undefined }),
        ])
      ),
      http.get(posts(APP_CONFIG.apis.tags), () =>
        HttpResponse.json([{ id: 7, name: 'Python' }])
      ),
      http.get(CDN_IMAGE, () => new HttpResponse('image'))
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getSpecialties.initiate())
    )

    expect(result.data?.items[0].skills).toEqual(['Python', null])
    expect([...(result.data?.logos ?? [])].sort()).toEqual([mediumUrl, null].sort())
    expect(result.data?.featured_logos).toEqual([mediumUrl])
  })

  it('keeps the specialties when the tags fail to load', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    server.use(
      http.get(posts(APP_CONFIG.apis.specialties), () =>
        HttpResponse.json([makePost({ tags: [7] })])
      ),
      http.get(
        posts(APP_CONFIG.apis.tags),
        () => new HttpResponse(null, { status: 500 })
      ),
      http.get(CDN_IMAGE, () => new HttpResponse('image'))
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getSpecialties.initiate())
    )
    expect(result.data?.items[0].skills).toEqual([null])
  })

  it('fails when the specialties fail to load', async () => {
    server.use(
      http.get(
        posts(APP_CONFIG.apis.specialties),
        () => new HttpResponse(null, { status: 503 })
      )
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getSpecialties.initiate())
    )
    expect(queryErrorMessage(result.error)).toBe('Error 503')
  })
})

describe('validation', () => {
  it('fails a query whose response does not match its schema, naming the field', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    server.use(
      http.get('*/data/youtube.json', () =>
        HttpResponse.json([{ ...makeVideo(), title: 42 }])
      )
    )
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getVideos.initiate())
    )

    const message = queryErrorMessage(result.error)
    expect(message).toContain('getVideos returned unexpected data.')
    expect(message).toContain('0.title')
    expect(error).toHaveBeenCalled()
  })

  it('fails a query whose response is not a list', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    server.use(http.get('*/data/github.json', () => HttpResponse.json({ items: [] })))
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getRepositories.initiate())
    )
    expect(queryErrorMessage(result.error)).toMatch(
      /^getRepositories returned unexpected data/
    )
  })

  it('describes the problems it found', () => {
    expect(
      schemaFailureMessage('getX', [
        { message: 'expected string', path: [0, { key: 'title' }] },
        { message: 'expected an array' },
      ])
    ).toBe('getX returned unexpected data. 0.title: expected string; expected an array')
  })
})

describe('queryErrorMessage', () => {
  it('describes each kind of error', () => {
    expect(queryErrorMessage(undefined)).toBeNull()
    expect(queryErrorMessage({ status: 404, data: null })).toBe('Error 404')
    expect(
      queryErrorMessage({ status: 'FETCH_ERROR', error: 'TypeError: Failed to fetch' })
    ).toBe('TypeError: Failed to fetch')
    expect(queryErrorMessage({ message: 'boom' })).toBe('boom')
    expect(queryErrorMessage({})).toBe('Unknown error')
  })

  it('reports a network failure', async () => {
    server.use(http.get('*/data/github.json', () => HttpResponse.error()))
    const { result } = await query((store) =>
      store.dispatch(siteApi.endpoints.getRepositories.initiate())
    )
    expect(queryErrorMessage(result.error)).toMatch(/Failed to fetch/)
  })
})

describe('prefetchSiteData', () => {
  it('loads every data source', async () => {
    server.use(...siteHandlers)
    const store = ConfigureStore()

    store.dispatch(prefetchSiteData())

    await waitFor(() => {
      const queries = Object.values(store.getState().api.queries)
      expect(queries).toHaveLength(9)
      expect(queries.every((entry) => entry?.status === 'fulfilled')).toBe(true)
    })
  })
})

describe('the data hooks', () => {
  it('give each page { isLoading, errMess, data }', async () => {
    server.use(...siteHandlers)
    const store = ConfigureStore()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(
      () => ({
        articles: useArticles(),
        videos: useVideos(),
        repositories: useRepositories(),
        specialties: useSpecialties(),
        portfolio: usePortfolio(),
        education: useEducation(),
        recommendations: useRecommendations(),
        clients: useClients(),
        projectImages: useProjectImages(),
      }),
      { wrapper }
    )

    // empty, not undefined, while loading.
    expect(result.current.specialties).toEqual({
      isLoading: true,
      errMess: null,
      data: { items: [], logos: [], featured_logos: [] },
    })
    expect(result.current.articles.data).toEqual([])

    await waitFor(() => {
      for (const source of Object.values(result.current)) {
        expect(source.isLoading).toBe(false)
      }
    })
    expect(result.current.repositories.data).toHaveLength(1)
    expect(result.current.specialties.data.items).toHaveLength(1)
    expect(result.current.projectImages.data).toHaveLength(1)
  })

  it('give the error as a sentence', async () => {
    server.use(
      http.get('*/data/youtube.json', () => new HttpResponse(null, { status: 500 }))
    )
    const store = ConfigureStore()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useVideos(), { wrapper })

    await waitFor(() => expect(result.current.errMess).toBe('Error 500'))
    expect(result.current.data).toEqual([])
  })
})

describe('uiSlice', () => {
  it('remembers which entry animations have played, and the logo cube', () => {
    const store = ConfigureStore()
    expect(store.getState().ui).toEqual({
      entryAnimationsPlayed: { aboutPage: false, clientGrid: false },
      logoCube: null,
    })

    store.dispatch(entryAnimationPlayed('aboutPage'))
    store.dispatch(logoCubeSaved({ face: 2 }))

    expect(store.getState().ui).toEqual({
      entryAnimationsPlayed: { aboutPage: true, clientGrid: false },
      logoCube: { face: 2 },
    })
  })
})

describe('ConfigureStore', () => {
  it('logs every action in development', () => {
    vi.stubEnv('DEV', true)
    vi.stubEnv('MODE', 'development')
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const group = vi.spyOn(console, 'group').mockImplementation(() => {})
    vi.spyOn(console, 'groupCollapsed').mockImplementation(() => {})
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {})

    const store = ConfigureStore()
    store.dispatch(entryAnimationPlayed('clientGrid'))

    expect(store.getState().ui.entryAnimationsPlayed.clientGrid).toBe(true)
    expect([...log.mock.calls, ...group.mock.calls].flat().join(' ')).toContain(
      'ui/entryAnimationPlayed'
    )
    vi.unstubAllEnvs()
  })

  it("doesn't log in tests", () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    ConfigureStore().dispatch(entryAnimationPlayed('clientGrid'))
    expect(log).not.toHaveBeenCalled()
  })
})

describe('serveSiteData (test/handlers.ts)', () => {
  it('serves the records it is given, and an HTTP status as an error', async () => {
    server.use(
      ...serveSiteData({
        clients: [makePost({ slug: 'acme' })],
        videos: 503,
      })
    )
    const store = ConfigureStore()

    const clients = await store.dispatch(siteApi.endpoints.getClients.initiate())
    const portfolio = await store.dispatch(siteApi.endpoints.getPortfolio.initiate())
    const videos = await store.dispatch(siteApi.endpoints.getVideos.initiate())

    expect(clients.data?.map((post) => post.slug)).toEqual(['acme'])
    expect(portfolio.data?.map((post) => post.slug)).toEqual(['post-47'])
    expect(queryErrorMessage(videos.error)).toBe('Error 503')
  })
})
