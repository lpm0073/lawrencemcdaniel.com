import { wpGetFeaturedImage } from './wpGetFeaturedImage'

/* eslint-disable no-unused-vars */
export const imagePreFetcher = (arr, delay, desc) => {
  setTimeout(
    function () {
      arr.forEach((post) => {
        const url = wpGetFeaturedImage(post)

        if (url) {
          new Image().src = wpGetFeaturedImage(post)
        }
      })
    },
    delay * 1000 * Math.random()
  )

  return arr
}
