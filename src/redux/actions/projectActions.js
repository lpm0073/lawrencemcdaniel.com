import * as ActionTypes from '../ActionTypes.js'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

const projectImagesLoading = () => ({
  type: ActionTypes.PROJECT_IMAGES_LOADING,
})

const projectImagesFailed = (errmess) => ({
  type: ActionTypes.PROJECT_IMAGES_FAILED,
  payload: errmess,
})

const addProjectImages = (images) => ({
  type: ActionTypes.ADD_PROJECT_IMAGES,
  payload: images,
})

export const fetchProjectImages = () => (dispatch) => {
  dispatch(projectImagesLoading(true))

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.projects).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((images) => {
          dispatch(addProjectImages(images))
          imagePreFetcher(images, 10, 'Projects')
        })
      } else {
        fetch(APP_CONFIG.apis.projects)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched project images')
                cache.put(APP_CONFIG.apis.projects, response.clone())
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
          .then((images) => dispatch(addProjectImages(images)))
          .then((images) => imagePreFetcher(images.payload, 10, 'Projects'))
          .catch((error) => dispatch(projectImagesFailed(error.message)))
      }
    })
  })
}
