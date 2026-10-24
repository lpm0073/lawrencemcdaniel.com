import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { WPPost } from '../types'
import type { FetchAction, FetchState } from './types'

export interface ClientsState extends FetchState {
  logos: WPPost[]
}

export type ClientsAction = FetchAction<
  typeof ActionTypes.ADD_CLIENTS,
  typeof ActionTypes.CLIENTS_LOADING,
  typeof ActionTypes.CLIENTS_FAILED,
  WPPost[]
>

export const ClientsRedux = (
  state: ClientsState = {
    isLoading: true,
    errMess: null,
    logos: [],
  },
  incoming: UnknownAction
): ClientsState => {
  const action = incoming as ClientsAction
  switch (action.type) {
    case ActionTypes.ADD_CLIENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        logos: action.payload,
      }

    case ActionTypes.CLIENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, logos: [] }

    case ActionTypes.CLIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        logos: [],
      }

    default:
      return state
  }
}
