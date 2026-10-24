import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { IsSetState } from './types'

export type ClientGridAction = { type: typeof ActionTypes.SET_CLIENTGRID_STATE }

export const ClientGridRedux = (
  state: IsSetState = {
    isSet: false,
  },
  incoming: UnknownAction
): IsSetState => {
  const action = incoming as ClientGridAction
  switch (action.type) {
    case ActionTypes.SET_CLIENTGRID_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
