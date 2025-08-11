import * as ActionTypes from './ActionTypes.js'

export const HomePageRedux = (
  state = {
    isSet: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_HOMEPAGE_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
