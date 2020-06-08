import * as ActionTypes from './ActionTypes';


export const CoursesGridRedux = (state = {
    isSet: false
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_COURSESGRID_STATE:
            return {...state, isSet: true};
            
        default: 
            return state;
    }
};
