import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { APP_CONFIG } from '../constants'
import { imagePreFetcher } from './imagePrefetcher'

export const wpPrefetch = async (url) => {
  let response

  // 1. Check API response apiCache
  const apiCache = await caches.open(APP_CONFIG.caching.names.api)
  response = await apiCache.match(url)

  if (!response) {
    try {
      response = await fetch(url)
      if (response.ok) {
        apiCache.put(url, response.clone())
      } else {
        console.error(
          'wpPrefetch() API Error ' + response.status + ': ' + response.statusText
        )
        return
      }
    } catch (error) {
      console.error('wpPrefetch() API Fetch error:', error)
      return
    }
  }

  // 2. Parse API response
  let arr
  try {
    arr = await response.json()
  } catch (error) {
    console.error('wpPrefetch() JSON parse error:', error)
    return
  }

  // 3. Extract image URLs and deduplicate
  const urlMap = new Map()
  for (const post of arr) {
    const imageUrl = wpGetFeaturedImage(post)
    if (imageUrl) {
      const baseUrl = imageUrl.split('?__WB_REVISION__=')[0]
      urlMap.set(baseUrl, {
        url: imageUrl,
        revision: post.modified,
      })
    }
  }

  // 4. Precache with imagePrefetcher
  const urls = Array.from(urlMap.values())
  if (urls.length > 0) {
    imagePreFetcher(urls, 100, 'wpPrefetch')
  }
}
