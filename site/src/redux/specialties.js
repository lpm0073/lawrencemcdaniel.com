import * as ActionTypes from './ActionTypes';


export const Specialties = (state = {
    isLoading: true,
    errMess: null,
    specialties: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SPECIALTIES:
            return {...state, isLoading: false, errMess: null, specialties: action.payload};

        case ActionTypes.SPECIALTIES_LOADING:
            return {...state, isLoading: true, errMess: null, specialties: []};

        case ActionTypes.SPECIALTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, specialties: []};
            
        default: 
            return state;
    }
};
