import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { Article } from '../types'
import type { FetchAction, FetchState } from './types'

export interface ArticlesState extends FetchState {
  articles: Article[]
}

export type ArticlesAction = FetchAction<
  typeof ActionTypes.ADD_ARTICLES,
  typeof ActionTypes.ARTICLES_LOADING,
  typeof ActionTypes.ARTICLES_FAILED,
  Article[]
>

export const ArticlesRedux = (
  state: ArticlesState = {
    isLoading: true,
    errMess: null,
    articles: [],
  },
  incoming: UnknownAction
): ArticlesState => {
  const action = incoming as ArticlesAction
  switch (action.type) {
    case ActionTypes.ADD_ARTICLES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        articles: action.payload,
      }

    case ActionTypes.ARTICLES_LOADING:
      return { ...state, isLoading: true, errMess: null, articles: [] }

    case ActionTypes.ARTICLES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        articles: [],
      }

    default:
      return state
  }
}
