import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { IsSetState } from './types'

export type HomePageAction = { type: typeof ActionTypes.SET_HOMEPAGE_STATE }

export const HomePageRedux = (
  state: IsSetState = {
    isSet: false,
  },
  incoming: UnknownAction
): IsSetState => {
  const action = incoming as HomePageAction
  switch (action.type) {
    case ActionTypes.SET_HOMEPAGE_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
