import * as ActionTypes from './ActionTypes';


export const Portfolio = (state = {
    isLoading: true,
    errMess: null,
    portfolio: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PORTFOLIO:
            return {...state, isLoading: false, errMess: null, portfolio: action.payload};

        case ActionTypes.PORTFOLIO_LOADING:
            return {...state, isLoading: true, errMess: null, portfolio: []};

        case ActionTypes.PORTFOLIO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, portfolio: []};
            
        default: 
            return state;
    }
};
