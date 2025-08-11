import * as ActionTypes from './ActionTypes.js'

export const RecommendationsRedux = (
  state = {
    isLoading: true,
    errMess: null,
    items: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_RECOMMENDATIONS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        items: action.payload,
      }

    case ActionTypes.RECOMMENDATIONS_LOADING:
      return { ...state, isLoading: true, errMess: null, items: [] }

    case ActionTypes.RECOMMENDATIONS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, items: [] }

    default:
      return state
  }
}
