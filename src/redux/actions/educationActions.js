import * as ActionTypes from '../ActionTypes.js'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

const educationLoading = () => ({
  type: ActionTypes.EDUCATION_LOADING,
})

const educationFailed = (errmess) => ({
  type: ActionTypes.EDUCATION_FAILED,
  payload: errmess,
})

const addEducation = (education) => ({
  type: ActionTypes.ADD_EDUCATION,
  payload: education,
})

export const fetchEducation = () => async (dispatch) => {
  dispatch(educationLoading(true))

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.education)

    if (cachedResponse) {
      const education = await cachedResponse.json()
      dispatch(addEducation(education))
      imagePreFetcher(education, 10, 'Education') // Prefetch in background
    } else {
      const response = await fetch(APP_CONFIG.apis.education)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      console.log('fetched and cached education')
      await cache.put(APP_CONFIG.apis.education, response.clone())
      const education = await response.json()
      dispatch(addEducation(education))
      imagePreFetcher(education, 10, 'Education') // Prefetch in background
    }
  } catch (error) {
    dispatch(educationFailed(error.message))
  }
}
