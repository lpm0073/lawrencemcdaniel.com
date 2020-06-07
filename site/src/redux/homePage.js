import * as ActionTypes from './ActionTypes';


export const HomePageRedux = (state = {
    isSet: false,
    state: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_HOMEPAGE_STATE:
            return {...state, isSet: true, state: action.state};
            
        default: 
            return state;
    }
};
