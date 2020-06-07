import * as ActionTypes from './ActionTypes';


export const AboutPageRedux = (state = {
    isSet: false,
    state: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_ABOUTPAGE_STATE:
            return {...state, isSet: true, state: action.state};
            
        default: 
            return state;
    }
};
