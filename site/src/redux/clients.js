import * as ActionTypes from './ActionTypes';


export const Clients = (state = {
    isLoading: true,
    errMess: null,
    logos: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SPECIALTIES:
            return {...state, isLoading: false, errMess: null, logos: action.payload};

        case ActionTypes.SPECIALTIES_LOADING:
            return {...state, isLoading: true, errMess: null, logos: []};

        case ActionTypes.SPECIALTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, logos: []};
            
        default: 
            return state;
    }
};
