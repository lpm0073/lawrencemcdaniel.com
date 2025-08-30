import { wpGetFeaturedImage } from '../wpGetFeaturedImage'
// import { APP_CONFIG } from '../constants'

/* eslint-disable no-unused-vars */
// export const imagePreFetcher = (arr, delay, desc) => {
//   arr.forEach(async (post) => {
//     const url = wpGetFeaturedImage(post)
//     if (!url) return

//     try {
//       const cache = await caches.open(APP_CONFIG.caching.names.cdn)
//       const response = await cache.match(url)
//       if (!response) {
//         const fetchResponse = await fetch(url)
//         if (fetchResponse.ok) {
//           console.debug(`Image fetched and cached: ${desc} - ${url}`)
//           await cache.put(url, fetchResponse.clone())
//         }
//       }
//     } catch (err) {
//       console.debug(`Image fetch failed: ${desc} - ${url}`, err)
//     }
//   })
// }

export const imagePreFetcher = (arr, delay, desc) => {
  arr.forEach(async (post) => {
    const url = wpGetFeaturedImage(post)
    if (!url) return

    try {
      await fetch(url) // This will trigger Workbox's CacheFirst strategy
    } catch (err) {
      console.debug(`Image fetch failed: ${desc} - ${url}`, err)
    }
  })
}
