/**
 * The API's base query: fetchBaseQuery, with a persistent, stale-while-revalidate
 * cache in the browser's Cache API (APP_CONFIG.caching.names.data).
 *
 * - A request with a cached response is answered from the cache at once, and
 *   the url is fetched again in the background, once per page load, to refresh
 *   the cache for next time. So a returning visitor's pages render without
 *   waiting for WordPress (whose responses take up to 20 seconds), and the data
 *   is at most one visit old.
 * - A request without one goes to the network, and a successful response is
 *   cached.
 * - The cache's name includes the site's version, so each release starts with
 *   an empty cache, and the service worker deletes the old ones.
 *
 * Results from the cache carry meta.cached, so that the API can evict a cached
 * response that its schema no longer accepts (see fetchValid in api.ts).
 */
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

import { APP_CONFIG } from '../shared/constants'

export type CachedBaseQueryMeta = Partial<FetchBaseQueryMeta> & { cached?: boolean }

const network = fetchBaseQuery()

/** The urls refreshed in the background during this page load. */
const refreshed = new Set<string>()

/** The data cache, or undefined where the browser has no Cache API. */
async function openCache(): Promise<Cache | undefined> {
  try {
    return typeof caches === 'undefined'
      ? undefined
      : await caches.open(APP_CONFIG.caching.names.data)
  } catch {
    return undefined
  }
}

async function store(cache: Cache, url: string, data: unknown): Promise<void> {
  try {
    await cache.put(
      url,
      new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
    )
  } catch (error) {
    console.error(`cachedBaseQuery could not cache ${url}`, error)
  }
}

/** Drop url's cached response, e.g. one that its schema no longer accepts. */
export async function evictCached(url: string): Promise<void> {
  const cache = await openCache()
  await cache?.delete(url)
}

/** The origin that relative urls are fetched from, '' to fetch them from the page's own. */
let dataOrigin = ''

/**
 * Fetch relative urls, i.e. the site's /data/ files, from origin. For the
 * build, which renders the pages in Node (src/prerender/), where there is no
 * page for them to be relative to. Browsers never set it.
 */
export function setDataOrigin(origin: string): void {
  dataOrigin = origin
}

/** Forget which urls were refreshed: for tests, which simulate many page loads. */
export function resetRefreshed(): void {
  refreshed.clear()
}

export const cachedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  CachedBaseQueryMeta
> = async (args, api, extraOptions) => {
  const url = typeof args === 'string' ? args : args.url
  if (dataOrigin && url.startsWith('/')) {
    args =
      typeof args === 'string' ? dataOrigin + url : { ...args, url: dataOrigin + url }
  }
  const cache = await openCache()

  const cached = await cache?.match(url)
  if (cache && cached) {
    try {
      const data: unknown = await cached.json()
      if (!refreshed.has(url)) {
        refreshed.add(url)
        void Promise.resolve(network(args, api, extraOptions)).then(async (fresh) => {
          if (!fresh.error) await store(cache, url, fresh.data)
        })
      }
      return { data, meta: { cached: true } }
    } catch {
      // an unreadable cached response: fetch it again.
    }
  }

  const result = await network(args, api, extraOptions)
  if (cache && !result.error) await store(cache, url, result.data)
  return result
}
