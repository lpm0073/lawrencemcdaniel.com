import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { Video } from '../../types'
import { getCategories } from '../../shared/categories'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'

/** A video as stored in public/data/, before fetchVideos() adds its skills. */
type RawVideo = Omit<Video, 'skills'>

const videosLoading = () => ({
  type: ActionTypes.VIDEOS_LOADING,
})

const videosFailed = (errmess: string) => ({
  type: ActionTypes.VIDEOS_FAILED,
  payload: errmess,
})

const addVideos = (videos: RawVideo[]) => {
  if (!Array.isArray(videos)) {
    throw new Error('Expected videos to be an array')
  }

  return {
    type: ActionTypes.ADD_VIDEOS,
    payload: videos.map(
      (video): Video => ({
        ...video,
        skills: getCategories(video.tags),
      })
    ),
  }
}

export const fetchVideos = (): AppThunk => async (dispatch) => {
  dispatch(videosLoading())

  try {
    const videos = await cachedFetchJson<RawVideo[]>(
      APP_CONFIG.apis.videos,
      'youtube videos'
    )
    dispatch(addVideos(videos))
  } catch (error) {
    dispatch(videosFailed(errorMessage(error)))
  }
}
