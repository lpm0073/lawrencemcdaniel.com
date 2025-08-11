import * as ActionTypes from './ActionTypes.js'

export const LogoCubeRedux = (
  state = {
    isSet: false,
    state: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_LOGOCUBE_STATE:
      return { ...state, isSet: true, state: action.state }

    default:
      return state
  }
}
