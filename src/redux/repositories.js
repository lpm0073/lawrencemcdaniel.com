import * as ActionTypes from './ActionTypes'

export const RepositoriesRedux = (
  state = {
    isLoading: true,
    errMess: null,
    repos: [],
  },
  action
) => {
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
