import type { WPImageSource } from '../../types'
import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { APP_CONFIG } from '../constants'

/*
 Pre-fetch images for a list of posts. If the image
 exists in the cache then skip it. If not then
 fetch it asynchronously and put in the cache.

 Only images on the CDN (cdn.lawrencemcdaniel.com) are prefetched:
 - the CDN sends Access-Control-Allow-Origin: *, so fetch() can read its
   images. Images that WordPress serves itself, from
   api.lawrencemcdaniel.com/wp-content/uploads, have no CORS header, so the
   browser blocks fetch() for them from every origin.
 - the service worker serves the cdn cache only for CDN urls. It caches
   api.lawrencemcdaniel.com images on its own, when an <img> loads them
   (which needs no CORS header).
 */
const isOnCdn = (url: string): boolean => {
  try {
    return new URL(url).origin === APP_CONFIG.urls.cdn
  } catch {
    return false
  }
}

export const imagePreFetcher = async (
  arr: readonly WPImageSource[],
  desc: string
): Promise<void> => {
  const cache = await caches.open(APP_CONFIG.caching.names.cdn)
  for (const post of arr) {
    const url = wpGetFeaturedImage(post)
    if (!url || !isOnCdn(url)) continue

    try {
      const response = await cache.match(url)
      if (!response) {
        const fetchResponse = await fetch(url)
        if (fetchResponse.ok) {
          await cache.put(url, fetchResponse.clone())
        }
      }
    } catch (err) {
      console.error(`imagePreFetcher() failed: ${desc} - ${url}`, err)
    }
  }
}
