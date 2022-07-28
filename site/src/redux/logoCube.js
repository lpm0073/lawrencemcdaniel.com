import * as ActionTypes from "./ActionTypes";

export const LogoCube = (
  state = {
    isSet: false,
    state: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_LOGOCUBE_STATE:
      return { ...state, isSet: true, state: action.state };

    default:
      return state;
  }
};
