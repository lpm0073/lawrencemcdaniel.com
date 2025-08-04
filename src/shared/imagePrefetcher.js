import { wpGetFeaturedImage } from './wpGetFeaturedImage'
import { CACHE_NAME_IMAGE, CACHE_EXPIRATION_IMAGES } from './constants'
import { setCacheTimestamp, isCacheExpired } from './caching'

/* eslint-disable no-unused-vars */
export const imagePreFetcher = (arr, delay, desc) => {
  setTimeout(() => {
    arr.forEach((post) => {
      const url = wpGetFeaturedImage(post)
      if (url) {
        caches.open(CACHE_NAME_IMAGE).then((cache) => {
          cache.match(url).then((response) => {
            if (response && !isCacheExpired(url, CACHE_EXPIRATION_IMAGES)) {
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
                    setCacheTimestamp(url)
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
