import * as ActionTypes from './ActionTypes';


export const Portfolio = (state = {
    isLoading: true,
    errMess: null,
    projects: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PORTFOLIO:
            return {...state, isLoading: false, errMess: null, projects: action.payload};

        case ActionTypes.PORTFOLIO_LOADING:
            return {...state, isLoading: true, errMess: null, projects: []};

        case ActionTypes.PORTFOLIO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, projects: []};
            
        default: 
            return state;
    }
};
