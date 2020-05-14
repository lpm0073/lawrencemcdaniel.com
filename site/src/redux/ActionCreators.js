import * as ActionTypes from './ActionTypes';
import { baseUrl, backendUrl } from '../shared/urls';




/* ----------------------------------- */

export const fetchSpecialties = () => (dispatch) => {
    dispatch(specialtiesLoading(true));

    return fetch(backendUrl + "posts?categories=43&_embed")
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

    return fetch(backendUrl + "portfolio?_embed")
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

    return fetch(backendUrl + "posts?categories=44&_embed")
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


export const postFeedback = (firstname, lastname, telnum, email, agree, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        message: message
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
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
        }

    )
    .then(response => response.json())
    .then(response => {
        alert('Feedback added: ' + response);
    })
    .catch(error => { 
        console.log('Post feedback ', error.message);
        alert('Your feedback could not be posted\nError: ' + error.message);
    });

}

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const feedbackFailed = (errmess) => ({
    type: ActionTypes.FEEDBACK_FAILED,
    payload: errmess
});
