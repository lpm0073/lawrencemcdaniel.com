import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { WPPost } from '../types'
import type { FetchAction, FetchState } from './types'

export interface EducationState extends FetchState {
  courses: WPPost[]
}

export type EducationAction = FetchAction<
  typeof ActionTypes.ADD_EDUCATION,
  typeof ActionTypes.EDUCATION_LOADING,
  typeof ActionTypes.EDUCATION_FAILED,
  WPPost[]
>

export const EducationRedux = (
  state: EducationState = {
    isLoading: true,
    errMess: null,
    courses: [],
  },
  incoming: UnknownAction
): EducationState => {
  const action = incoming as EducationAction
  switch (action.type) {
    case ActionTypes.ADD_EDUCATION:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload,
      }

    case ActionTypes.EDUCATION_LOADING:
      return { ...state, isLoading: true, errMess: null, courses: [] }

    case ActionTypes.EDUCATION_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        courses: [],
      }

    default:
      return state
  }
}
