import * as ActionTypes from './ActionTypes'

export const Education = (
  state = {
    isLoading: true,
    errMess: null,
    courses: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_EDUCATION:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload,
      }

    case ActionTypes.EDUCATION_LOADING:
      return { ...state, isLoading: true, errMess: null, courses: [] }

    case ActionTypes.EDUCATION_FAILED:
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
