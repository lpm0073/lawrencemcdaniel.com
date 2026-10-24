import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { IsSetState } from './types'

export type AboutPageAction = { type: typeof ActionTypes.SET_ABOUTPAGE_STATE }

export const AboutPageRedux = (
  state: IsSetState = {
    isSet: false,
  },
  incoming: UnknownAction
): IsSetState => {
  const action = incoming as AboutPageAction
  switch (action.type) {
    case ActionTypes.SET_ABOUTPAGE_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
