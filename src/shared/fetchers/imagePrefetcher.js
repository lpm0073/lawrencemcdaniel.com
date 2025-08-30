import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { APP_CONFIG } from '../constants'

export const imagePreFetcher = (arr, delay, desc) => {
  arr.forEach(async (post) => {
    const url = wpGetFeaturedImage(post)
    if (!url) return

    try {
      const cache = await caches.open(APP_CONFIG.caching.names.cdn)
      const response = await cache.match(url)
      if (!response) {
        const fetchResponse = await fetch(url)
        if (fetchResponse.ok) {
          let cache = await caches.open(APP_CONFIG.caching.names.cdn)
          cache.put(url, fetchResponse.clone())
        }
      }
    } catch (err) {
      console.error(`Image prefetch failed: ${desc} - ${url}`, err)
    }
  })
}
