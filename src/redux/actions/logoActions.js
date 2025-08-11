import * as ActionTypes from '../ActionTypes.js'

export const setLogoState = ({ state }) => {
  return {
    type: ActionTypes.SET_LOGOCUBE_STATE,
    state: state,
  }
}
