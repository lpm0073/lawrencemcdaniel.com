import * as ActionTypes from './ActionTypes';
import { imagePreFetcher } from '../shared/imagePrefetcher';
import { CDNSpecialtiesURL, CDNPortfolioURL, CDNEducationURL, CDNRecommendationsURL, CDNProjectsURL, CDNClientsURL } from '../shared/urls';



/*  ----------------------------------- 
    methods to track whether page entry animations
    have rendered.
    -----------------------------------  */
export const setHomePage = () => {
    return ({
        type: ActionTypes.SET_HOMEPAGE_STATE
        });
    
}

export const setCoursesGrid = () => {
    return ({
        type: ActionTypes.SET_COURSESGRID_STATE
        });
    
}

export const setClientGrid = () => {
    return ({
        type: ActionTypes.SET_CLIENTGRID_STATE
        });
    
}

export const setAboutPage = () => {
    return ({
        type: ActionTypes.SET_ABOUTPAGE_STATE
        });
    
}
  
export const setLogoState = ({state}) => {
    return ({
        type: ActionTypes.SET_LOGOCUBE_STATE,
        state: state
        });
    
}



/*  ----------------------------------- 
    methods to fetch data from api / cdn
    -----------------------------------  */

export const fetchSpecialties = () => (dispatch) => {
    dispatch(specialtiesLoading(true));

    return fetch(CDNSpecialtiesURL)
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
    .then(specialties => {
        imagePreFetcher(specialties.payload, 0, "Specialities");
        imagePreFetcher([
            'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201305/Lawrence21.jpg'
        ], 5, "Site Static")
        })
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

    return fetch(CDNPortfolioURL)
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
    .then(portfolio => imagePreFetcher(portfolio.payload, 10, "Portfolio"))
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

    return fetch(CDNEducationURL)
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
    .then(education => imagePreFetcher(education.payload, 10, "Education"))
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

    return fetch(CDNRecommendationsURL)
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

export const fetchProjectImages = () => (dispatch) => {
    dispatch(projectImagesLoading(true));

    return fetch(CDNProjectsURL)
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
    .then(images => dispatch(addProjectImages(images)))
    .catch(error => dispatch(projectImagesFailed(error.message)));

}

export const projectImagesLoading = () => ({
    type: ActionTypes.PROJECT_IMAGES_LOADING
});

export const projectImagesFailed = (errmess) => ({
    type: ActionTypes.PROJECT_IMAGES_FAILED,
    payload: errmess
});

export const addProjectImages = (images) => ({
    type: ActionTypes.ADD_PROJECT_IMAGES,
    payload: images
});

/* ----------------------------------- */


export const fetchClients = () => (dispatch) => {
    dispatch(clientsLoading(true));

    return fetch(CDNClientsURL)
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
    .then(clients => dispatch(addClients(clients)))
    .then(clients => imagePreFetcher(clients.payload, 15, "Clients"))
    .catch(error => dispatch(clientsFailed(error.message)));

}

export const clientsLoading = () => ({
    type: ActionTypes.CLIENTS_LOADING
});

export const clientsFailed = (errmess) => ({
    type: ActionTypes.CLIENTS_FAILED,
    payload: errmess
});

export const addClients = (clients) => ({
    type: ActionTypes.ADD_CLIENTS,
    payload: clients
});

/* ----------------------------------- */
