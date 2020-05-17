import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Specialties } from './specialties';
import { Portfolio } from './portfolio';
import { Education } from './education';
import { Recommendations } from './recommendations';
import thunk from 'redux-thunk';
import logger from 'redux-thunk';


export const ConfigureStore = () => {

    const store = createStore(
        
        combineReducers({
            specialties: Specialties,
            portfolio: Portfolio,
            education: Education,
            recommendations: Recommendations
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};