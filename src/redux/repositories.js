import * as ActionTypes from './ActionTypes'

export const RepositoriesRedux = (
  state = {
    isLoading: true,
    errMess: null,
    courses: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_REPOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload,
      }

    case ActionTypes.REPOS_LOADING:
      return { ...state, isLoading: true, errMess: null, courses: [] }
    case ActionTypes.REPOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        courses: [],
      }

    default:
      return state
  }
}
