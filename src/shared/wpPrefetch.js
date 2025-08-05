import { precacheAndRoute } from 'workbox-precaching'
import { wpGetFeaturedImage } from './wpGetFeaturedImage'
import { CACHE_NAME_API, CACHE_NAME_IMAGE } from './constants'


export const wpPrefetch = async (url) => {
  let response

  // 1. Check API response apiCache
  const apiCache = await caches.open(CACHE_NAME_API)
  response = await apiCache.match(url)

  if (!response) {
    try {
      console.log("wpPrefetch() prefetching API json object: ", url)
      response = await fetch(url)
      if (response.ok) {
        apiCache.put(url, response.clone())
      } else {
        console.error('wpPrefetch() API Error ' + response.status + ': ' + response.statusText)
        return
      }
    } catch (error) {
      console.error('wpPrefetch() API Fetch error:', error)
      return
    }
  } else {
    console.log("wpPrefetch() found cached API json response", url)
  }

  // 2. Parse API response
  let arr
  try {
    arr = await response.json()
  } catch (error) {
    console.error('wpPrefetch() JSON parse error:', error)
    return
  }

  // 3. Extract image URLs and prefetch/apiCache them
  const imageCache = await caches.open(CACHE_NAME_IMAGE)
  const urls = []

  for (const post of arr) {
    const imageUrl = wpGetFeaturedImage(post)
    if (imageUrl) {
      urls.push({
        url: imageUrl,
        revision: post.modified,
      })

      // Check if image is cached
      const cachedImage = await imageCache.match(imageUrl)
      if (!cachedImage) {
        try {
          console.log("wpPrefetch() prefetching image: ", imageUrl)
          const imageResponse = await fetch(imageUrl)
          if (imageResponse.ok) {
            imageCache.put(imageUrl, imageResponse.clone())
          } else {
            console.error('wpPrefetch() Image Error ' + imageResponse.status + ': ' + imageResponse.statusText)
          }
        } catch (error) {
          console.error('wpPrefetch() Image Fetch error:', error)
        }
      } else {
        console.log("wpPrefetch() found cached image: ", imageUrl)
      }
    }
  }

  // 4. Precache with Workbox (optional, if you want Workbox to manage these)
  if (urls.length > 0) {
    console.log('wpPrefetch() precaching images with Workbox: ', urls)
    precacheAndRoute(urls)
  }
}
