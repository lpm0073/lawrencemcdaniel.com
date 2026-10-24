import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { Repository } from '../types'
import type { FetchAction, FetchState } from './types'

export interface RepositoriesState extends FetchState {
  repos: Repository[]
}

export type RepositoriesAction = FetchAction<
  typeof ActionTypes.ADD_REPOS,
  typeof ActionTypes.REPOS_LOADING,
  typeof ActionTypes.REPOS_FAILED,
  Repository[]
>

export const RepositoriesRedux = (
  state: RepositoriesState = {
    isLoading: true,
    errMess: null,
    repos: [],
  },
  incoming: UnknownAction
): RepositoriesState => {
  const action = incoming as RepositoriesAction
  switch (action.type) {
    case ActionTypes.ADD_REPOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        repos: action.payload,
      }

    case ActionTypes.REPOS_LOADING:
      return { ...state, isLoading: true, errMess: null, repos: [] }

    case ActionTypes.REPOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        repos: [],
      }

    default:
      return state
  }
}
