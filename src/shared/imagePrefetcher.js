import { wpGetFeaturedImage } from './wpGetFeaturedImage'
import { CACHE_NAME_CDN } from './constants'

/* eslint-disable no-unused-vars */
export const imagePreFetcher = (arr, delay, desc) => {
  setTimeout(() => {
    arr.forEach((post) => {
      const url = wpGetFeaturedImage(post)
      if (url) {
        caches.open(CACHE_NAME_CDN).then((cache) => {
          cache.match(url).then((response) => {
            if (response) {
              response.blob().then((blob) => {
                const objectURL = URL.createObjectURL(blob)
                new Image().src = objectURL
              })
            } else {
              console.log(`imagePreFetcher() prefetching image: ${desc} - ${url}`)
              fetch(url)
                .then((fetchResponse) => {
                  if (fetchResponse.ok) {
                    cache.put(url, fetchResponse.clone())
                    return fetchResponse.blob()
                  }
                  console.error(`Image fetch failed: ${desc} - ${url}`, fetchResponse.statusText)
                })
                .then((blob) => {
                  const objectURL = URL.createObjectURL(blob)
                  new Image().src = objectURL
                })
                .catch((err) => {
                  console.error(`Image fetch failed: ${desc} - ${url}`, err)
                  // fallback: load directly (may trigger another fetch)
                  new Image().src = url
                })
            }
          })
        })
      }
    })
  }, delay * 1000 * Math.random())

  return arr
}
