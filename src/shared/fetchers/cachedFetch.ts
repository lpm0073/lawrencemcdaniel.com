import { APP_CONFIG } from '../constants'

/**
 * Fetch a JSON document, cache-first: return the copy in the browser's api
 * cache (APP_CONFIG.caching.names.api) if there is one, otherwise fetch it,
 * cache the response, and return it. Used by every thunk in
 * src/redux/actions. Throws on an HTTP error, with the status in the message.
 *
 * @param url the document's url, which is also its cache key.
 * @param description what the document is, for the log message.
 */
export async function cachedFetchJson<T>(url: string, description: string): Promise<T> {
  const cache = await caches.open(APP_CONFIG.caching.names.api)
  const cachedResponse = await cache.match(url)
  if (cachedResponse) {
    return (await cachedResponse.json()) as T
  }

  const response = await fetch(url)
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
  console.log(`fetched and cached ${description}`)
  await cache.put(url, response.clone())
  return (await response.json()) as T
}

/** The message of whatever a failed fetch threw. */
export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
