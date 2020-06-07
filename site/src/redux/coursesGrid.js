import * as ActionTypes from './ActionTypes';


export const CoursesGridRedux = (state = {
    isSet: false,
    state: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.SET_COURSESGRID_STATE:
            return {...state, isSet: true, state: action.state};
            
        default: 
            return state;
    }
};
