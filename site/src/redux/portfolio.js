import * as ActionTypes from './ActionTypes';


export const Portfolio = (state = {
    isLoading: true,
    errMess: null,
    specialties: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PORTFOLIO:
            return {...state, isLoading: false, errMess: null, specialties: action.payload};

        case ActionTypes.PORTFOLIO_LOADING:
            return {...state, isLoading: true, errMess: null, specialties: []};

        case ActionTypes.PORTFOLIO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, specialties: []};
            
        default: 
            return state;
    }
};
