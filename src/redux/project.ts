import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { WPMedia } from '../types'
import type { FetchAction, FetchState } from './types'

export interface ProjectState extends FetchState {
  images: WPMedia[]
}

export type ProjectAction = FetchAction<
  typeof ActionTypes.ADD_PROJECT_IMAGES,
  typeof ActionTypes.PROJECT_IMAGES_LOADING,
  typeof ActionTypes.PROJECT_IMAGES_FAILED,
  WPMedia[]
>

export const ProjectRedux = (
  state: ProjectState = {
    isLoading: true,
    errMess: null,
    images: [],
  },
  incoming: UnknownAction
): ProjectState => {
  const action = incoming as ProjectAction
  switch (action.type) {
    case ActionTypes.ADD_PROJECT_IMAGES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        images: action.payload,
      }

    case ActionTypes.PROJECT_IMAGES_LOADING:
      return { ...state, isLoading: true, errMess: null, images: [] }

    case ActionTypes.PROJECT_IMAGES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        images: [],
      }

    default:
      return state
  }
}
