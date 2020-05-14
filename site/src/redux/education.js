import * as ActionTypes from './ActionTypes';


export const Education = (state = {
    isLoading: true,
    errMess: null,
    education: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_EDUCATION:
            return {...state, isLoading: false, errMess: null, education: action.payload};

        case ActionTypes.EDUCATION_LOADING:
            return {...state, isLoading: true, errMess: null, education: []};

        case ActionTypes.EDUCATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload, education: []};
            
        default: 
            return state;
    }
};
