import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import {
  makeArticle,
  makeMedia,
  makePost,
  makeRepository,
  makeVideo,
} from '../../../test/fixtures'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import { ConfigureStore } from '../configureStore'
import { fetchArticles } from './articlesActions'
import { fetchClients, setClientGrid } from './clientActions'
import { fetchEducation } from './educationActions'
import { fetchPortfolio } from './portfolioActions'
import { fetchProjectImages } from './projectActions'
import { fetchRecommendations } from './recommendationsActions'
import { fetchRepositories } from './repositoriesActions'
import { fetchSpecialties } from './specialtiesActions'
import { fetchVideos } from './videosActions'

const CDN_IMAGE = 'https://cdn.lawrencemcdaniel.com/wp-content/uploads/*'

/** The images that the WordPress thunks prefetch in the background. */
const imageHandler = http.get(CDN_IMAGE, () => new HttpResponse('image'))

describe('fetchRepositories', () => {
  it('loads the repositories from public/data', async () => {
    server.use(
      http.get('*/data/github.json', () => HttpResponse.json([makeRepository()]))
    )
    const store = ConfigureStore()

    await store.dispatch(fetchRepositories())

    const { repositories } = store.getState()
    expect(repositories.isLoading).toBe(false)
    expect(repositories.errMess).toBeNull()
    expect(repositories.repos.map((repo) => repo.name)).toEqual([
      'FullStackWithLawrence/react-mdr',
    ])
  })

  it('reads a cached copy instead of fetching again', async () => {
    let requests = 0
    server.use(
      http.get('*/data/github.json', () => {
        requests += 1
        return HttpResponse.json([makeRepository()])
      })
    )

    await ConfigureStore().dispatch(fetchRepositories())
    const store = ConfigureStore()
    await store.dispatch(fetchRepositories())

    expect(requests).toBe(1)
    expect(store.getState().repositories.repos).toHaveLength(1)
  })

  it('stores the HTTP error', async () => {
    server.use(
      http.get(
        '*/data/github.json',
        () => new HttpResponse(null, { status: 500, statusText: 'Server Error' })
      )
    )
    const store = ConfigureStore()

    await store.dispatch(fetchRepositories())

    const { repositories } = store.getState()
    expect(repositories.isLoading).toBe(false)
    expect(repositories.errMess).toBe('Error 500: Server Error')
    expect(repositories.repos).toEqual([])
  })
})

describe('fetchArticles and fetchVideos', () => {
  it('add each article and video its skills', async () => {
    server.use(
      http.get('*/data/blog.lawrencemcdaniel.com.json', () =>
        HttpResponse.json([makeArticle({ categories: ['aws', 'reactjs'] })])
      ),
      http.get('*/data/youtube.json', () =>
        HttpResponse.json([makeVideo({ tags: ['python', 'django'] })])
      )
    )
    const store = ConfigureStore()

    await store.dispatch(fetchArticles())
    await store.dispatch(fetchVideos())

    const { articles, videos } = store.getState()
    expect(articles.articles[0].skills.sort()).toEqual(['cloud', 'react'])
    expect(videos.videos[0].skills).toEqual(['full-stack'])
  })

  it('fail when the document is not a list', async () => {
    server.use(http.get('*/data/youtube.json', () => HttpResponse.json({ items: [] })))
    const store = ConfigureStore()

    await store.dispatch(fetchVideos())

    expect(store.getState().videos.errMess).toBe('Expected videos to be an array')
  })
})

describe('fetchSpecialties', () => {
  it('names each specialty skill after its WordPress tags', async () => {
    server.use(
      http.get(APP_CONFIG.apis.specialties.split('?')[0], () =>
        HttpResponse.json([makePost({ tags: [7, 8] })])
      ),
      http.get(APP_CONFIG.apis.tags.split('?')[0], () =>
        HttpResponse.json([{ id: 7, name: 'Python' }])
      ),
      imageHandler
    )
    const store = ConfigureStore()

    await store.dispatch(fetchSpecialties())

    const { specialties } = store.getState()
    expect(specialties.errMess).toBeNull()
    expect(specialties.items[0].skills).toEqual(['Python', null])
  })
})

describe('fetchClients', () => {
  it('loads the client posts', async () => {
    server.use(
      http.get(APP_CONFIG.apis.clients.split('?')[0], () =>
        HttpResponse.json([makePost({ slug: 'client' })])
      ),
      imageHandler
    )
    const store = ConfigureStore()

    await store.dispatch(fetchClients())

    expect(store.getState().clients.logos.map((post) => post.slug)).toEqual(['client'])
  })
})

describe('the WordPress thunks', () => {
  const posts = (url: string) => url.split('?')[0]

  it('load education, portfolio and recommendation posts, and project images', async () => {
    server.use(
      http.get(posts(APP_CONFIG.apis.education), ({ request }) => {
        const category = new URL(request.url).searchParams.get('categories')
        return HttpResponse.json([makePost({ slug: `category-${category}` })])
      }),
      http.get(posts(APP_CONFIG.apis.projects), () => HttpResponse.json([makeMedia()])),
      imageHandler
    )
    const store = ConfigureStore()

    await store.dispatch(fetchEducation())
    await store.dispatch(fetchPortfolio())
    await store.dispatch(fetchRecommendations())
    await store.dispatch(fetchProjectImages())

    const state = store.getState()
    expect(state.education.courses[0].slug).toBe('category-44')
    expect(state.portfolio.projects[0].slug).toBe('category-47')
    expect(state.recommendations.items[0].slug).toBe('category-45')
    expect(state.project.images[0].id).toBe(3694)
  })

  it.each([
    ['education', fetchEducation, APP_CONFIG.apis.education],
    ['portfolio', fetchPortfolio, APP_CONFIG.apis.portfolio],
    ['recommendations', fetchRecommendations, APP_CONFIG.apis.recommendations],
    ['project', fetchProjectImages, APP_CONFIG.apis.projects],
    ['clients', fetchClients, APP_CONFIG.apis.clients],
    ['specialties', fetchSpecialties, APP_CONFIG.apis.specialties],
    ['articles', fetchArticles, APP_CONFIG.apis.articles],
  ] as const)('%s: stores the HTTP error', async (slice, thunk, url) => {
    server.use(
      http.get(
        url.startsWith('/') ? `*${url}` : posts(url),
        () => new HttpResponse(null, { status: 503, statusText: 'Service Unavailable' })
      )
    )
    const store = ConfigureStore()

    await store.dispatch(thunk())

    expect(store.getState()[slice].errMess).toBe('Error 503: Service Unavailable')
  })

  it('fails when the articles document is not a list', async () => {
    server.use(
      http.get('*/data/blog.lawrencemcdaniel.com.json', () => HttpResponse.json({}))
    )
    const store = ConfigureStore()

    await store.dispatch(fetchArticles())

    expect(store.getState().articles.errMess).toBe('Expected articles to be an array')
  })

  it('marks the client grid set', () => {
    const store = ConfigureStore()
    store.dispatch(setClientGrid())
    expect(store.getState().clientGrid.isSet).toBe(true)
  })
})
