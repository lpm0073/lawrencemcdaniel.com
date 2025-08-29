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

export const fetchProjectImages = () => async (dispatch) => {
  dispatch(projectImagesLoading(true))

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.projects)

    let images
    if (cachedResponse) {
      images = await cachedResponse.json()
    } else {
      const response = await fetch(APP_CONFIG.apis.projects)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      await cache.put(APP_CONFIG.apis.projects, response.clone())
      images = await response.json()
    }

    dispatch(addProjectImages(images))
    imagePreFetcher(images, 10, 'Projects')
  } catch (error) {
    dispatch(projectImagesFailed(error.message))
  }
}
