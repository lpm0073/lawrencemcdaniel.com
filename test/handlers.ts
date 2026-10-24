/**
 * MSW handlers that answer every request the app makes when it starts:
 * the JSON files in public/data, the WordPress REST API (posts by category,
 * media, tags), and the CDN's images. Each returns a small fixture.
 *
 *   server.use(...siteHandlers)
 *
 * Tests that render the whole app, or SiteRoutes, need these, because
 * SiteRoutes dispatches every fetch thunk when it mounts.
 */
import { http, HttpResponse } from 'msw'

import { makeArticle, makeMedia, makePost, makeRepository, makeVideo } from './fixtures'

const WP_API = 'https://api.lawrencemcdaniel.com/wp-json/wp/v2'

export const siteHandlers = [
  http.get('*/data/github.json', () => HttpResponse.json([makeRepository()])),
  http.get('*/data/youtube.json', () => HttpResponse.json([makeVideo()])),
  http.get('*/data/blog.lawrencemcdaniel.com.json', () =>
    HttpResponse.json([makeArticle()])
  ),
  http.get(`${WP_API}/posts`, ({ request }) => {
    const category = Number(new URL(request.url).searchParams.get('categories'))
    return HttpResponse.json([
      makePost({ id: category, slug: `post-${category}`, categories: [category] }),
    ])
  }),
  http.get(`${WP_API}/media`, () => HttpResponse.json([makeMedia()])),
  http.get(`${WP_API}/tags`, () => HttpResponse.json([{ id: 7, name: 'Python' }])),
  http.get('https://cdn.lawrencemcdaniel.com/*', () => new HttpResponse('image')),
]
