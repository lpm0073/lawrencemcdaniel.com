import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { Video } from '../types'
import type { FetchAction, FetchState } from './types'

export interface VideosState extends FetchState {
  videos: Video[]
}

export type VideosAction = FetchAction<
  typeof ActionTypes.ADD_VIDEOS,
  typeof ActionTypes.VIDEOS_LOADING,
  typeof ActionTypes.VIDEOS_FAILED,
  Video[]
>

export const VideosRedux = (
  state: VideosState = {
    isLoading: true,
    errMess: null,
    videos: [],
  },
  incoming: UnknownAction
): VideosState => {
  const action = incoming as VideosAction
  switch (action.type) {
    case ActionTypes.ADD_VIDEOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        videos: action.payload,
      }

    case ActionTypes.VIDEOS_LOADING:
      return { ...state, isLoading: true, errMess: null, videos: [] }

    case ActionTypes.VIDEOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        videos: [],
      }

    default:
      return state
  }
}
