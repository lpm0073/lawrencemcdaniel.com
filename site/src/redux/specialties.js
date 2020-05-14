import * as ActionTypes from './ActionTypes';


export const Specialties = (state = {
    isLoading: true,
    errMess: null,
    portfolio: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SPECIALTIES:
            return {...state, isLoading: false, errMess: null, portfolio: action.payload};

        case ActionTypes.SPECIALTIES_LOADING:
            return {...state, isLoading: true, errMess: null, portfolio: []};

        case ActionTypes.SPECIALTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, portfolio: []};
            
        default: 
            return state;
    }
};
