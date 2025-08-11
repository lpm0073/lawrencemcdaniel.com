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

export const fetchEducation = () => (dispatch) => {
  dispatch(educationLoading(true))

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.education).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((education) => {
          dispatch(addEducation(education))
          imagePreFetcher(education, 10, 'Education')
        })
      } else {
        fetch(APP_CONFIG.apis.education)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched education')
                cache.put(APP_CONFIG.apis.education, response.clone())
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
          .then((education) => dispatch(addEducation(education)))
          .then((education) => imagePreFetcher(education.payload, 10, 'Education'))
          .catch((error) => dispatch(educationFailed(error.message)))
      }
    })
  })
}
