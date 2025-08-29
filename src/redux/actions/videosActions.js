import * as ActionTypes from '../ActionTypes.js'
import { getCategories } from '../../shared/categories'

import { APP_CONFIG } from '../../shared/constants.js'

const videosLoading = () => ({
  type: ActionTypes.VIDEOS_LOADING,
})

const videosFailed = (errmess) => ({
  type: ActionTypes.VIDEOS_FAILED,
  payload: errmess,
})

const addVideos = (videos) => {
  let payload
  if (Array.isArray(videos)) {
    payload = videos.map((video) => ({
      ...video,
      skills: getCategories(video.tags),
    }))
  } else {
    // not an array, so raise an error
    throw new Error('Expected videos to be an array')
  }

  return {
    type: ActionTypes.ADD_VIDEOS,
    payload,
  }
}

export const fetchVideos = () => (dispatch) => {
  dispatch(videosLoading())

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.videos).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((videos) => {
          dispatch(addVideos(videos))
        })
      } else {
        fetch(APP_CONFIG.apis.videos)
          .then(
            (response) => {
              if (response.ok) {
                console.log('fetched youtube videos')
                cache.put(APP_CONFIG.apis.videos, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((videos) => {
            dispatch(addVideos(videos))
          })
          .catch((error) => dispatch(videosFailed(error.message)))
      }
    })
  })
}
