import * as ActionTypes from './ActionTypes.js'

export const AboutPageRedux = (
  state = {
    isSet: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_ABOUTPAGE_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
