import * as ActionTypes from "./ActionTypes";

export const Clients = (
  state = {
    isLoading: true,
    errMess: null,
    logos: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_CLIENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        logos: action.payload,
      };

    case ActionTypes.CLIENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, logos: [] };

    case ActionTypes.CLIENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, logos: [] };

    default:
      return state;
  }
};
