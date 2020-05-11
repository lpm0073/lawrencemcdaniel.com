import * as ActionTypes from './ActionTypes';


export const Feedback = (state = {
    isLoading: true,
    errMess: null,
    feedback: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state, isLoading: false, errMess: null, feedback: action.payload};

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feedback: []};
            
        default: 
            return state;
    }
};
