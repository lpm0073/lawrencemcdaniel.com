import * as ActionTypes from './ActionTypes';


export const Specialties = (state = {
    isLoading: true,
    errMess: null,
    items: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SPECIALTIES:
            return {...state, isLoading: false, errMess: null, items: action.payload};

        case ActionTypes.SPECIALTIES_LOADING:
            return {...state, isLoading: true, errMess: null, items: []};

        case ActionTypes.SPECIALTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, items: []};
            
        default: 
            return state;
    }
};
