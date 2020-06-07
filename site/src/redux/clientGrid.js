import * as ActionTypes from './ActionTypes';


export const ClientGridRedux = (state = {
    isSet: false,
    state: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_CLIENTGRID_STATE:
            return {...state, isSet: true, state: action.state};
            
        default: 
            return state;
    }
};
