import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'

/** The logo cube's own component state, kept so it survives navigation. */
export type LogoCubeComponentState = Record<string, unknown>

export interface LogoCubeState {
  isSet: boolean
  state: LogoCubeComponentState | null
}

export type LogoCubeAction = {
  type: typeof ActionTypes.SET_LOGOCUBE_STATE
  state: LogoCubeComponentState
}

export const LogoCubeRedux = (
  state: LogoCubeState = {
    isSet: false,
    state: null,
  },
  incoming: UnknownAction
): LogoCubeState => {
  const action = incoming as LogoCubeAction
  switch (action.type) {
    case ActionTypes.SET_LOGOCUBE_STATE:
      return { ...state, isSet: true, state: action.state }

    default:
      return state
  }
}
