import * as ActionTypes from './ActionTypes';


export const Project = (state = {
    isLoading: true,
    errMess: null,
    images: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROJECT_IMAGES:
            return {...state, isLoading: false, errMess: null, images: action.payload};

        case ActionTypes.PROJECT_IMAGES_LOADING:
            return {...state, isLoading: true, errMess: null, images: []};

        case ActionTypes.PROJECT_IMAGES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, images: []};
            
        default: 
            return state;
    }
};
