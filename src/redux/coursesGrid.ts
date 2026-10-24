import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { IsSetState } from './types'

export type CoursesGridAction = { type: typeof ActionTypes.SET_COURSESGRID_STATE }

export const CoursesGridRedux = (
  state: IsSetState = {
    isSet: false,
  },
  incoming: UnknownAction
): IsSetState => {
  const action = incoming as CoursesGridAction
  switch (action.type) {
    case ActionTypes.SET_COURSESGRID_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
