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

export const fetchRecommendations = () => async (dispatch) => {
  dispatch(recommendationsLoading(true))

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.recommendations)

    if (cachedResponse) {
      const recommendations = await cachedResponse.json()
      dispatch(addRecommendations(recommendations))
      imagePreFetcher(recommendations, 'Recommendations')
    } else {
      const response = await fetch(APP_CONFIG.apis.recommendations)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      console.log('fetched and cached recommendations')
      await cache.put(APP_CONFIG.apis.recommendations, response.clone())
      const recommendations = await response.json()
      dispatch(addRecommendations(recommendations))
      imagePreFetcher(recommendations, 'Recommendations')
    }
  } catch (error) {
    dispatch(recommendationsFailed(error.message))
  }
}
