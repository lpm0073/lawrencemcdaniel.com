import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Specialties } from './specialties';
import { Portfolio } from './portfolio';
import { Education } from './education';
import thunk from 'redux-thunk';
import logger from 'redux-thunk';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {

    const store = createStore(
        
        combineReducers({
            specialties: Specialties,
            portfolio: Portfolio,
            education: Education,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};