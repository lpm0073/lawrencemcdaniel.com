import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { WPPost } from '../types'
import type { FetchAction, FetchState } from './types'

export interface PortfolioState extends FetchState {
  projects: WPPost[]
}

export type PortfolioAction = FetchAction<
  typeof ActionTypes.ADD_PORTFOLIO,
  typeof ActionTypes.PORTFOLIO_LOADING,
  typeof ActionTypes.PORTFOLIO_FAILED,
  WPPost[]
>

export const PortfolioRedux = (
  state: PortfolioState = {
    isLoading: true,
    errMess: null,
    projects: [],
  },
  incoming: UnknownAction
): PortfolioState => {
  const action = incoming as PortfolioAction
  switch (action.type) {
    case ActionTypes.ADD_PORTFOLIO:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        projects: action.payload,
      }

    case ActionTypes.PORTFOLIO_LOADING:
      return { ...state, isLoading: true, errMess: null, projects: [] }

    case ActionTypes.PORTFOLIO_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        projects: [],
      }

    default:
      return state
  }
}
