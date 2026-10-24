import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { WPMedia } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

const projectImagesLoading = () => ({
  type: ActionTypes.PROJECT_IMAGES_LOADING,
})

const projectImagesFailed = (errmess: string) => ({
  type: ActionTypes.PROJECT_IMAGES_FAILED,
  payload: errmess,
})

const addProjectImages = (projectImages: WPMedia[]) => ({
  type: ActionTypes.ADD_PROJECT_IMAGES,
  payload: projectImages,
})

export const fetchProjectImages = (): AppThunk => async (dispatch) => {
  dispatch(projectImagesLoading())

  try {
    const projectImages = await cachedFetchJson<WPMedia[]>(
      APP_CONFIG.apis.projects,
      'project images'
    )
    dispatch(addProjectImages(projectImages))
    imagePreFetcher(projectImages, 'Projects')
  } catch (error) {
    dispatch(projectImagesFailed(errorMessage(error)))
  }
}
