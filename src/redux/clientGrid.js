import * as ActionTypes from './ActionTypes'

export const ClientGridRedux = (
  state = {
    isSet: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_CLIENTGRID_STATE:
      return { ...state, isSet: true }

    default:
      return state
  }
}
