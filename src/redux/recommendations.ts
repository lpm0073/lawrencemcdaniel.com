import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { WPPost } from '../types'
import type { FetchAction, FetchState } from './types'

export interface RecommendationsState extends FetchState {
  items: WPPost[]
}

export type RecommendationsAction = FetchAction<
  typeof ActionTypes.ADD_RECOMMENDATIONS,
  typeof ActionTypes.RECOMMENDATIONS_LOADING,
  typeof ActionTypes.RECOMMENDATIONS_FAILED,
  WPPost[]
>

export const RecommendationsRedux = (
  state: RecommendationsState = {
    isLoading: true,
    errMess: null,
    items: [],
  },
  incoming: UnknownAction
): RecommendationsState => {
  const action = incoming as RecommendationsAction
  switch (action.type) {
    case ActionTypes.ADD_RECOMMENDATIONS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        items: action.payload,
      }

    case ActionTypes.RECOMMENDATIONS_LOADING:
      return { ...state, isLoading: true, errMess: null, items: [] }

    case ActionTypes.RECOMMENDATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        items: [],
      }

    default:
      return state
  }
}
