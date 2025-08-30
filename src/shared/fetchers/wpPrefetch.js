import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
import { APP_CONFIG } from '../constants'
import { imagePreFetcher } from './imagePrefetcher'

async function fetchAndCache(url, cache) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`wpPrefetch() API Error ${response.status}: ${response.statusText}`)
      return null
    }
    await cache.put(url, response.clone())
    return response
  } catch (error) {
    console.error('wpPrefetch() API Fetch error:', error)
    return null
  }
}

function extractImageUrls(posts) {
  const urlMap = new Map()
  for (const post of posts) {
    const imageUrl = wpGetFeaturedImage(post)
    if (imageUrl) {
      const baseUrl = imageUrl.split('?__WB_REVISION__=')[0]
      urlMap.set(baseUrl, {
        url: imageUrl,
        revision: post.modified,
      })
    }
  }
  return Array.from(urlMap.values())
}

export const wpPrefetch = async (url) => {
  // 1. Check API response apiCache
  let response
  const apiCache = await caches.open(APP_CONFIG.caching.names.api)
  response = await apiCache.match(url)

  if (!response) {
    response = await fetchAndCache(url, apiCache)
    if (!response) return
  }

  // 2. Parse API response
  let posts
  try {
    posts = await response.json()
    if (!Array.isArray(posts)) {
      console.error('wpPrefetch() Unexpected API response format:', posts)
      return
    }
  } catch (error) {
    console.error('wpPrefetch() JSON parse error:', error)
    return
  }

  // 3. Extract image URLs and deduplicate
  const imageUrls = extractImageUrls(posts)

  // 4. Precache with imagePrefetcher
  if (imageUrls.length > 0) {
    imagePreFetcher(imageUrls, 100, 'wpPrefetch')
  }
}
