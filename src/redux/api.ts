/**
 * The site's data: one RTK Query API for the WordPress REST API
 * (api.lawrencemcdaniel.com) and the JSON files in public/data/.
 *
 * - Every response is validated with its schema from src/schemas.ts
 *   (validatedQuery). One that doesn't match fails its query with an error
 *   naming the field (schemaFailureMessage), instead of reaching the pages as
 *   blank fields.
 * - cachedBaseQuery does the fetching, cache-first with a background refresh,
 *   so returning visitors never wait for WordPress. An HTTP error fails the
 *   query with its status, e.g. "Error 503".
 * - The WordPress endpoints prefetch their posts' featured images into the
 *   browser's cdn cache, which the service worker serves.
 * - Site data changes weekly, so a session keeps what it has loaded.
 * - prefetchSiteData() loads everything when the app starts, so that every
 *   page, and every page's images, are ready before they are visited.
 *
 * Offline copies of the responses are the service worker's job
 * (src/service-worker.ts), not this module's.
 */
import { createApi } from '@reduxjs/toolkit/query/react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { z } from 'zod'

import {
  ArticleSchema,
  RepositorySchema,
  VideoSchema,
  WPMediaSchema,
  WPPostSchema,
  WPTagSchema,
} from '../schemas'
import type { Article, Repository, Video, WPMedia, WPPost, WPTag } from '../types'
import type { AppDispatch } from './configureStore'
import { cachedBaseQuery, evictCached, type CachedBaseQueryMeta } from './cachedBaseQuery'
import { getCategories } from '../shared/categories'
import { APP_CONFIG } from '../shared/constants'
import { imagePreFetcher } from '../shared/fetchers/imagePrefetcher'
import { shuffleArray } from '../shared/shuffle'
import { wpGetFeaturedImage } from '../shared/wpGetFeaturedImage'

/** WordPress category id of a featured technology. */
const FEATURED_TECHNOLOGY = 48

/** How long a session keeps data that no page is showing: a day. */
const KEEP_UNUSED_DATA_SECONDS = 24 * 60 * 60

/** The specialties, with their tag names as skills, and their logos. */
export interface Specialties {
  items: WPPost[]
  /** every specialty's logo, shuffled once per session. */
  logos: (string | null)[]
  /** the logos of the featured technologies, shuffled once per session. */
  featured_logos: (string | null)[]
}

/** One problem that a schema found, in the Standard Schema shape that zod and RTK use. */
interface SchemaIssue {
  readonly message: string
  readonly path?: ReadonlyArray<PropertyKey | { readonly key: PropertyKey }>
}

/** The first few problems a schema found, e.g. "getVideos ... 0.title: expected string". */
export function schemaFailureMessage(
  endpoint: string,
  issues: readonly SchemaIssue[]
): string {
  const problems = issues.slice(0, 3).map((issue) => {
    const path = (issue.path ?? [])
      .map((segment) => String(typeof segment === 'object' ? segment.key : segment))
      .join('.')
    return path ? `${path}: ${issue.message}` : issue.message
  })
  return `${endpoint} returned unexpected data. ${problems.join('; ')}`
}

/** Fetch url with the api's base query, and validate the response with schema. */
async function fetchValid<T>(
  baseQuery: FetchUrl,
  url: string,
  schema: z.ZodType<T>,
  endpoint: string
): Promise<{ data: T } | { error: FetchBaseQueryError }> {
  let response = await baseQuery(url)
  if (response.error) return { error: response.error }
  let result = schema.safeParse(response.data)
  // a cached response that the schema no longer accepts (e.g. after a schema
  // change) is dropped and fetched again, rather than failing the page.
  if (!result.success && response.meta?.cached) {
    await evictCached(url)
    response = await baseQuery(url)
    if (response.error) return { error: response.error }
    result = schema.safeParse(response.data)
  }
  if (!result.success) {
    console.error(schemaFailureMessage(endpoint, result.error.issues), result.error)
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: schemaFailureMessage(endpoint, result.error.issues),
        data: result.error.issues,
      },
    }
  }
  return { data: result.data }
}

type FetchUrl = (
  url: string
) => Promise<{ data?: unknown; error?: FetchBaseQueryError; meta?: CachedBaseQueryMeta }>

/**
 * A queryFn that fetches url, validates the response with schema, and returns
 * it, transformed. Every endpoint uses one, so every response is validated
 * the same way, and fails with the same kind of error.
 */
function validatedQuery<Raw, Result>(
  endpoint: string,
  url: string,
  schema: z.ZodType<Raw>,
  transform: (raw: Raw) => Result
) {
  return async (
    _arg: void,
    _api: unknown,
    _extra: unknown,
    baseQuery: (url: string) => unknown
  ): Promise<{ data: Result } | { error: FetchBaseQueryError }> => {
    const response = await fetchValid(baseQuery as FetchUrl, url, schema, endpoint)
    return 'error' in response ? response : { data: transform(response.data) }
  }
}

const unchanged = <T>(value: T): T => value

/** Prefetch the featured images of a query's result, once it has loaded. */
function prefetchImages(description: string) {
  return async (
    _arg: void,
    { queryFulfilled }: { queryFulfilled: Promise<{ data: WPPost[] | WPMedia[] }> }
  ) => {
    try {
      const { data } = await queryFulfilled
      await imagePreFetcher(data, description)
    } catch {
      // the query failed; its error is in its own state.
    }
  }
}

export const siteApi = createApi({
  reducerPath: 'api',
  baseQuery: cachedBaseQuery,
  keepUnusedDataFor: KEEP_UNUSED_DATA_SECONDS,
  endpoints: (build) => ({
    /** blog posts from blog.lawrencemcdaniel.com, via public/data. */
    getArticles: build.query<Article[], void>({
      queryFn: validatedQuery(
        'getArticles',
        APP_CONFIG.apis.articles,
        z.array(ArticleSchema),
        (articles) =>
          articles.map((article) => ({
            ...article,
            skills: getCategories(article.categories),
          }))
      ),
    }),

    /** YouTube videos, via public/data. */
    getVideos: build.query<Video[], void>({
      queryFn: validatedQuery(
        'getVideos',
        APP_CONFIG.apis.videos,
        z.array(VideoSchema),
        (videos) =>
          videos.map((video) => ({ ...video, skills: getCategories(video.tags) }))
      ),
    }),

    /** GitHub repositories, via public/data. */
    getRepositories: build.query<Repository[], void>({
      queryFn: validatedQuery(
        'getRepositories',
        APP_CONFIG.apis.repositories,
        z.array(RepositorySchema),
        unchanged
      ),
    }),

    /** technology logos, with their WordPress tags as skills. */
    getSpecialties: build.query<Specialties, void>({
      async queryFn(_arg, _api, _extra, baseQuery) {
        const fetchUrl = baseQuery as FetchUrl
        const posts = await fetchValid(
          fetchUrl,
          APP_CONFIG.apis.specialties,
          z.array(WPPostSchema),
          'getSpecialties'
        )
        if ('error' in posts) return posts

        // a specialty without tag names is better than no specialties.
        const tagsResult = await fetchValid(
          fetchUrl,
          APP_CONFIG.apis.tags,
          z.array(WPTagSchema),
          'getSpecialties tags'
        )
        const tags: WPTag[] = 'data' in tagsResult ? tagsResult.data : []

        const items = posts.data.map((specialty) => ({
          ...specialty,
          skills: specialty.tags.map(
            (id) => tags.find((tag) => tag.id === id)?.name ?? null
          ),
        }))
        return {
          data: {
            items,
            logos: shuffleArray(items.map((post) => wpGetFeaturedImage(post, 'medium'))),
            featured_logos: shuffleArray(
              items
                .filter((post) => post.categories.includes(FEATURED_TECHNOLOGY))
                .map((post) => wpGetFeaturedImage(post, 'medium'))
            ),
          },
        }
      },
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          await imagePreFetcher(data.items, 'Specialities')
        } catch {
          // the query failed; its error is in its own state.
        }
      },
    }),

    /** portfolio projects. */
    getPortfolio: build.query<WPPost[], void>({
      queryFn: validatedQuery(
        'getPortfolio',
        APP_CONFIG.apis.portfolio,
        z.array(WPPostSchema),
        unchanged
      ),
      onQueryStarted: prefetchImages('Portfolio'),
    }),

    /** education and courses. */
    getEducation: build.query<WPPost[], void>({
      queryFn: validatedQuery(
        'getEducation',
        APP_CONFIG.apis.education,
        z.array(WPPostSchema),
        unchanged
      ),
      onQueryStarted: prefetchImages('Education'),
    }),

    /** client recommendations, from LinkedIn. */
    getRecommendations: build.query<WPPost[], void>({
      queryFn: validatedQuery(
        'getRecommendations',
        APP_CONFIG.apis.recommendations,
        z.array(WPPostSchema),
        unchanged
      ),
      onQueryStarted: prefetchImages('Recommendations'),
    }),

    /** client logos. */
    getClients: build.query<WPPost[], void>({
      queryFn: validatedQuery(
        'getClients',
        APP_CONFIG.apis.clients,
        z.array(WPPostSchema),
        unchanged
      ),
      onQueryStarted: prefetchImages('Clients'),
    }),

    /** the images of the portfolio detail pages. */
    getProjectImages: build.query<WPMedia[], void>({
      queryFn: validatedQuery(
        'getProjectImages',
        APP_CONFIG.apis.projects,
        z.array(WPMediaSchema),
        unchanged
      ),
      onQueryStarted: prefetchImages('Projects'),
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetVideosQuery,
  useGetRepositoriesQuery,
  useGetSpecialtiesQuery,
  useGetPortfolioQuery,
  useGetEducationQuery,
  useGetRecommendationsQuery,
  useGetClientsQuery,
  useGetProjectImagesQuery,
} = siteApi

/** Load every endpoint, as soon as the app starts. */
export const prefetchSiteData = () => (dispatch: AppDispatch) => {
  const endpoints = [
    'getArticles',
    'getVideos',
    'getRepositories',
    'getSpecialties',
    'getPortfolio',
    'getEducation',
    'getRecommendations',
    'getClients',
    'getProjectImages',
  ] as const
  for (const endpoint of endpoints) {
    dispatch(siteApi.util.prefetch(endpoint, undefined, {}))
  }
}

/** A query's error, as a sentence: "Error 503", or a schema failure's message. */
export function queryErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string | null {
  if (!error) return null
  // an HTTP error has a numeric status; a network, parsing or schema error says what went wrong.
  if ('status' in error) {
    return typeof error.status === 'number' ? `Error ${error.status}` : error.error
  }
  return error.message ?? 'Unknown error'
}
