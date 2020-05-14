import * as ActionTypes from './ActionTypes';
import { baseUrl, backendUrl } from '../shared/urls';



/* ----------------------------------- */
export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
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
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
    
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

        const newComment = {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
        newComment.date = new Date().toISOString();

        return fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
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
        .then(response => dispatch(addComment(response)))
        .catch(error => { 
            console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
    
}
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
