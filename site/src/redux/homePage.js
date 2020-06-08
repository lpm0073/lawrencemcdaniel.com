import * as ActionTypes from './ActionTypes';


export const HomePageRedux = (state = {
    isSet: false
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_HOMEPAGE_STATE:
            return {...state, isSet: true};
            
        default: 
            return state;
    }
};
