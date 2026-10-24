import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { WPPost } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

const educationLoading = () => ({
  type: ActionTypes.EDUCATION_LOADING,
})

const educationFailed = (errmess: string) => ({
  type: ActionTypes.EDUCATION_FAILED,
  payload: errmess,
})

const addEducation = (education: WPPost[]) => ({
  type: ActionTypes.ADD_EDUCATION,
  payload: education,
})

export const fetchEducation = (): AppThunk => async (dispatch) => {
  dispatch(educationLoading())

  try {
    const education = await cachedFetchJson<WPPost[]>(
      APP_CONFIG.apis.education,
      'education'
    )
    dispatch(addEducation(education))
    imagePreFetcher(education, 'Education') // Prefetch in background
  } catch (error) {
    dispatch(educationFailed(errorMessage(error)))
  }
}
