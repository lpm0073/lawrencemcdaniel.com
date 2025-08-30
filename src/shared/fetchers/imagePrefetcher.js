import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { APP_CONFIG } from '../constants'

/*
 Pre-fetch images for a list of posts. If the image
 exists in the cache then skip it. If not then
 fetch it asynchronously and put in the cache.
 */
export const imagePreFetcher = async (arr, desc) => {
  const cache = await caches.open(APP_CONFIG.caching.names.cdn)
  for (const post of arr) {
    const url = wpGetFeaturedImage(post)
    if (!url) continue

    try {
      const response = await cache.match(url)
      if (!response) {
        const fetchResponse = await fetch(url)
        if (fetchResponse.ok) {
          await cache.put(url, fetchResponse.clone())
        }
      }
    } catch (err) {
      console.error(`Image prefetch failed: ${desc} - ${url}`, err)
    }
  }
}
