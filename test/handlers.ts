/**
 * MSW handlers that answer every request the site makes: the JSON files in
 * public/data, the WordPress REST API (posts by category, media, tags), and
 * the CDN's images.
 *
 *   server.use(...siteHandlers)                 // one small record of each kind
 *
 *   server.use(...serveSiteData({               // these records instead, the rest as above
 *     specialties: [makePost({ title: { rendered: 'Python' } })],
 *     repositories: [],
 *     videos: 503,                              // an HTTP error instead of data
 *   }))
 *
 * Components and pages load their own data (src/redux/hooks.ts), so a test
 * gives them data by serving it, as the real API would, rather than by
 * preloading the store. Serving it also checks it against the schemas.
 */
import { http, HttpResponse } from 'msw'

import type { Article, Repository, Video, WPMedia, WPPost, WPTag } from '../src/types'
import { makeArticle, makeMedia, makePost, makeRepository, makeVideo } from './fixtures'

const WP_API = 'https://api.lawrencemcdaniel.com/wp-json/wp/v2'

/** WordPress category ids, as in APP_CONFIG.apis. */
const CATEGORIES = {
  specialties: 43,
  education: 44,
  recommendations: 45,
  clients: 46,
  portfolio: 47,
} as const

type PostSource = keyof typeof CATEGORIES

/** What to serve for each data source: its records, or an HTTP status to fail with. */
export interface SiteData {
  articles?: Article[] | number
  videos?: Video[] | number
  repositories?: Repository[] | number
  specialties?: WPPost[] | number
  education?: WPPost[] | number
  recommendations?: WPPost[] | number
  clients?: WPPost[] | number
  portfolio?: WPPost[] | number
  projectImages?: WPMedia[] | number
  tags?: WPTag[] | number
}

const respond = (records: unknown[] | number) =>
  typeof records === 'number'
    ? new HttpResponse(null, { status: records })
    : HttpResponse.json(records)

/** The default post of a category: one record, with the slug post-<category id>. */
const defaultPost = (category: number) =>
  makePost({ id: category, slug: `post-${category}`, categories: [category] })

export function serveSiteData(data: SiteData = {}) {
  const posts = (source: PostSource) => data[source] ?? [defaultPost(CATEGORIES[source])]
  const byCategory = new Map<number, unknown[] | number>(
    Object.entries(CATEGORIES).map(([source, id]) => [id, posts(source as PostSource)])
  )

  return [
    http.get('*/data/github.json', () =>
      respond(data.repositories ?? [makeRepository()])
    ),
    http.get('*/data/youtube.json', () => respond(data.videos ?? [makeVideo()])),
    http.get('*/data/blog.lawrencemcdaniel.com.json', () =>
      respond(data.articles ?? [makeArticle()])
    ),
    http.get(`${WP_API}/posts`, ({ request }) => {
      const category = Number(new URL(request.url).searchParams.get('categories'))
      return respond(byCategory.get(category) ?? [])
    }),
    http.get(`${WP_API}/media`, () => respond(data.projectImages ?? [makeMedia()])),
    http.get(`${WP_API}/tags`, () => respond(data.tags ?? [{ id: 7, name: 'Python' }])),
    http.get('https://cdn.lawrencemcdaniel.com/*', () => new HttpResponse('image')),
  ]
}

export const siteHandlers = serveSiteData()
