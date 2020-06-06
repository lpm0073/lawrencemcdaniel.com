import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Specialties } from './specialties';
import { Portfolio } from './portfolio';
import { Education } from './education';
import { Project } from './project';
import { Recommendations } from './recommendations';
import { Clients } from './clients';
import { LogoCube } from './logoCube';
import thunk from 'redux-thunk';
import logger from 'redux-thunk';


export const ConfigureStore = () => {

    const store = createStore(
        
        combineReducers({
            specialties: Specialties,
            portfolio: Portfolio,
            education: Education,
            recommendations: Recommendations,
            project: Project,
            clients: Clients,
            logoCube: LogoCube
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};