import * as ActionTypes from './ActionTypes';
import { baseUrl, backendUrl } from '../shared/urls';




/* ----------------------------------- */

export const fetchSpecialties = () => (dispatch) => {
    dispatch(specialtiesLoading(true));

    return fetch(backendUrl + "posts?categories=43&_embed&per_page=100")
    .then(
        response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(specialties => dispatch(addSpecialties(specialties)))
    .catch(error => dispatch(specialtiesFailed(error.message)));

}

export const specialtiesLoading = () => ({
    type: ActionTypes.SPECIALTIES_LOADING
});

export const specialtiesFailed = (errmess) => ({
    type: ActionTypes.SPECIALTIES_FAILED,
    payload: errmess
});

export const addSpecialties = (specialties) => ({
    type: ActionTypes.ADD_SPECIALTIES,
    payload: specialties
});

/* ----------------------------------- */
export const fetchPortfolio = () => (dispatch) => {
    dispatch(portfolioLoading(true));

    return fetch(backendUrl + "portfolio?_embed&per_page=100")
    .then(
        response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(portfolio => dispatch(addPortfolio(portfolio)))
    .catch(error => dispatch(portfolioFailed(error.message)));

}

export const portfolioLoading = () => ({
    type: ActionTypes.PORTFOLIO_LOADING
});

export const portfolioFailed = (errmess) => ({
    type: ActionTypes.PORTFOLIO_FAILED,
    payload: errmess
});

export const addPortfolio = (portfolio) => ({
    type: ActionTypes.ADD_PORTFOLIO,
    payload: portfolio
});

/* ----------------------------------- */
export const fetchEducation = () => (dispatch) => {
    dispatch(educationLoading(true));

    return fetch(backendUrl + "posts?categories=44&_embed&per_page=100")
    .then(
        response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(education => dispatch(addEducation(education)))
    .catch(error => dispatch(educationFailed(error.message)));

}

export const educationLoading = () => ({
    type: ActionTypes.EDUCATION_LOADING
});

export const educationFailed = (errmess) => ({
    type: ActionTypes.EDUCATION_FAILED,
    payload: errmess
});

export const addEducation = (education) => ({
    type: ActionTypes.ADD_EDUCATION,
    payload: education
});

/* ----------------------------------- */

export const fetchRecommendations = () => (dispatch) => {
    dispatch(recommendationsLoading(true));

    return fetch(backendUrl + "posts?categories=45&_embed&per_page=100")
    .then(
        response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(recommendations => dispatch(addRecommendations(recommendations)))
    .catch(error => dispatch(recommendationsFailed(error.message)));

}

export const recommendationsLoading = () => ({
    type: ActionTypes.RECOMMENDATIONS_LOADING
});

export const recommendationsFailed = (errmess) => ({
    type: ActionTypes.RECOMMENDATIONS_FAILED,
    payload: errmess
});

export const addRecommendations = (recommendations) => ({
    type: ActionTypes.ADD_RECOMMENDATIONS,
    payload: recommendations
});

/* ----------------------------------- */
