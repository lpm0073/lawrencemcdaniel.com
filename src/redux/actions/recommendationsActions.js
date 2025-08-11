import * as ActionTypes from '../ActionTypes.js'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

const recommendationsLoading = () => ({
  type: ActionTypes.RECOMMENDATIONS_LOADING,
})

const recommendationsFailed = (errmess) => ({
  type: ActionTypes.RECOMMENDATIONS_FAILED,
  payload: errmess,
})

const addRecommendations = (recommendations) => ({
  type: ActionTypes.ADD_RECOMMENDATIONS,
  payload: recommendations,
})

export const fetchRecommendations = () => (dispatch) => {
  dispatch(recommendationsLoading(true))

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.recommendations).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((recommendations) => {
          dispatch(addRecommendations(recommendations))
          imagePreFetcher(recommendations, 10, 'Recommendations')
        })
      } else {
        fetch(APP_CONFIG.apis.recommendations)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched recommendations')
                cache.put(APP_CONFIG.apis.recommendations, response.clone())
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
          .then((recommendations) => dispatch(addRecommendations(recommendations)))
          .then((recommendations) =>
            imagePreFetcher(recommendations.payload, 10, 'Recommendations')
          )
          .catch((error) => dispatch(recommendationsFailed(error.message)))
      }
    })
  })
}
