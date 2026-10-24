import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { WPPost } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

const recommendationsLoading = () => ({
  type: ActionTypes.RECOMMENDATIONS_LOADING,
})

const recommendationsFailed = (errmess: string) => ({
  type: ActionTypes.RECOMMENDATIONS_FAILED,
  payload: errmess,
})

const addRecommendations = (recommendations: WPPost[]) => ({
  type: ActionTypes.ADD_RECOMMENDATIONS,
  payload: recommendations,
})

export const fetchRecommendations = (): AppThunk => async (dispatch) => {
  dispatch(recommendationsLoading())

  try {
    const recommendations = await cachedFetchJson<WPPost[]>(
      APP_CONFIG.apis.recommendations,
      'recommendations'
    )
    dispatch(addRecommendations(recommendations))
    imagePreFetcher(recommendations, 'Recommendations') // Prefetch in background
  } catch (error) {
    dispatch(recommendationsFailed(errorMessage(error)))
  }
}
