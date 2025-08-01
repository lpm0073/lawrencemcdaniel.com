import * as ActionTypes from './ActionTypes'
import { imagePreFetcher } from '../shared/imagePrefetcher'
import {
  URL_API_SPECIALTIES,
  URL_API_PORTFOLIO,
  URL_API_EDUCATION,
  URL_API_RECOMMENDATIONS,
  URL_API_PROJECTS,
  URL_API_CLIENTS,
  CACHE_NAME_API
} from '../shared/constants'
import { setCacheTimestamp, isCacheExpired } from '../shared/caching'


/*  -----------------------------------
    methods to track whether page entry animations
    have rendered.
    -----------------------------------  */
export const setHomePage = () => {
  return {
    type: ActionTypes.SET_HOMEPAGE_STATE,
  }
}

export const setCoursesGrid = () => {
  return {
    type: ActionTypes.SET_COURSESGRID_STATE,
  }
}

export const setClientGrid = () => {
  return {
    type: ActionTypes.SET_CLIENTGRID_STATE,
  }
}

export const setAboutPage = () => {
  return {
    type: ActionTypes.SET_ABOUTPAGE_STATE,
  }
}

export const setLogoState = ({ state }) => {
  return {
    type: ActionTypes.SET_LOGOCUBE_STATE,
    state: state,
  }
}

/*  -----------------------------------
    methods to fetch data from api / cdn / cache
    -----------------------------------  */

export const fetchSpecialties = () => (dispatch) => {
  dispatch(specialtiesLoading(true))

  caches.open(CACHE_NAME_API).then((cache) => {
    cache.match(URL_API_SPECIALTIES).then((cachedResponse) => {
      if (cachedResponse && !isCacheExpired(URL_API_SPECIALTIES)) {
        cachedResponse.json().then((specialties) => {
          dispatch(addSpecialties(specialties))
          imagePreFetcher(specialties, 0, 'Specialities')
          imagePreFetcher(
            [
              'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201305/Lawrence21.jpg',
            ],
            5,
            'Site Static'
          )
        })
      } else {
        console.log('No cached specialties found, fetching from network...')
        fetch(URL_API_SPECIALTIES)
          .then(
            (response) => {
              if (response.ok) {
                cache.put(URL_API_SPECIALTIES, response.clone())
                setCacheTimestamp(URL_API_SPECIALTIES)
                return response
              } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((specialties) => {
            dispatch(addSpecialties(specialties))
            imagePreFetcher(specialties, 0, 'Specialities')
            imagePreFetcher(
              [
                'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201305/Lawrence21.jpg',
              ],
              5,
              'Site Static'
            )
          })
          .catch((error) => dispatch(specialtiesFailed(error.message)))
      }
    })
  })
}

export const specialtiesLoading = () => ({
  type: ActionTypes.SPECIALTIES_LOADING,
})

export const specialtiesFailed = (errmess) => ({
  type: ActionTypes.SPECIALTIES_FAILED,
  payload: errmess,
})

export const addSpecialties = (specialties) => ({
  type: ActionTypes.ADD_SPECIALTIES,
  payload: specialties,
})

/* ----------------------------------- */
export const fetchPortfolio = () => (dispatch) => {
  dispatch(portfolioLoading(true))

  caches.open(CACHE_NAME_API).then((cache) => {
    cache.match(URL_API_PORTFOLIO).then((cachedResponse) => {
      if (cachedResponse && !isCacheExpired(URL_API_PORTFOLIO)) {
        cachedResponse.json().then((portfolio) => {
          dispatch(addPortfolio(portfolio))
          imagePreFetcher(portfolio, 10, 'Portfolio')
        })
      } else {
        console.log('No cached portfolio found, fetching from network...')
        fetch(URL_API_PORTFOLIO)
          .then(
            (response) => {
              if (response.ok) {
                cache.put(URL_API_PORTFOLIO, response.clone())
                setCacheTimestamp(URL_API_PORTFOLIO)
                return response
              } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((portfolio) => {
            dispatch(addPortfolio(portfolio))
            imagePreFetcher(portfolio, 10, 'Portfolio')
          })
          .catch((error) => dispatch(portfolioFailed(error.message)))
      }
    })
  })
}


export const portfolioLoading = () => ({
  type: ActionTypes.PORTFOLIO_LOADING,
})

export const portfolioFailed = (errmess) => ({
  type: ActionTypes.PORTFOLIO_FAILED,
  payload: errmess,
})

export const addPortfolio = (portfolio) => ({
  type: ActionTypes.ADD_PORTFOLIO,
  payload: portfolio,
})

/* ----------------------------------- */
export const fetchEducation = () => (dispatch) => {
  dispatch(educationLoading(true))

  caches.open(CACHE_NAME_API).then((cache) => {
    cache.match(URL_API_EDUCATION).then((cachedResponse) => {
      if (cachedResponse && !isCacheExpired(URL_API_EDUCATION)) {
        cachedResponse.json().then((education) => {
          dispatch(addEducation(education))
          imagePreFetcher(education, 10, 'Education')
        })
        } else {
        console.log('No cached education found, fetching from network...')
        fetch(URL_API_EDUCATION)
          .then((response) => {
              if (response.ok) {
                cache.put(URL_API_EDUCATION, response.clone())
                setCacheTimestamp(URL_API_EDUCATION)
                return response
              } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((education) => dispatch(addEducation(education)))
          .then((education) => imagePreFetcher(education.payload, 10, 'Education'))
          .catch((error) => dispatch(educationFailed(error.message)))
      }
    })
  })
}

export const educationLoading = () => ({
  type: ActionTypes.EDUCATION_LOADING,
})

export const educationFailed = (errmess) => ({
  type: ActionTypes.EDUCATION_FAILED,
  payload: errmess,
})

export const addEducation = (education) => ({
  type: ActionTypes.ADD_EDUCATION,
  payload: education,
})

/* ----------------------------------- */

export const fetchRecommendations = () => (dispatch) => {
  dispatch(recommendationsLoading(true))

  caches.open(CACHE_NAME_API).then((cache) => {
    cache.match(URL_API_RECOMMENDATIONS).then((cachedResponse) => {
      if (cachedResponse && !isCacheExpired(URL_API_RECOMMENDATIONS)) {
        cachedResponse.json().then((recommendations) => {
          dispatch(addRecommendations(recommendations))
          imagePreFetcher(recommendations, 10, 'Recommendations')
        })
      } else {
        console.log('No cached recommendations found, fetching from network...')
        fetch(URL_API_RECOMMENDATIONS)
          .then(
            (response) => {
              if (response.ok) {
                cache.put(URL_API_RECOMMENDATIONS, response.clone())
                setCacheTimestamp(URL_API_RECOMMENDATIONS)
                return response
              } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((recommendations) => dispatch(addRecommendations(recommendations)))
          .then((recommendations) =>
            imagePreFetcher(recommendations.payload, 10, 'Recommendations')
          )
          .catch((error) => dispatch(recommendationsFailed(error.message)))
      }
    })
  })
}

export const recommendationsLoading = () => ({
  type: ActionTypes.RECOMMENDATIONS_LOADING,
})

export const recommendationsFailed = (errmess) => ({
  type: ActionTypes.RECOMMENDATIONS_FAILED,
  payload: errmess,
})

export const addRecommendations = (recommendations) => ({
  type: ActionTypes.ADD_RECOMMENDATIONS,
  payload: recommendations,
})

/* ----------------------------------- */

export const fetchProjectImages = () => (dispatch) => {
  dispatch(projectImagesLoading(true))

  caches.open(CACHE_NAME_API).then((cache) => {
    cache.match(URL_API_PROJECTS).then((cachedResponse) => {
      if (cachedResponse && !isCacheExpired(URL_API_PROJECTS)) {
        cachedResponse.json().then((images) => {
          dispatch(addProjectImages(images))
          imagePreFetcher(images, 10, 'Projects')
        })
      } else {
        console.log('No cached project images found, fetching from network...')
        fetch(URL_API_PROJECTS)
        .then(
            (response) => {
              if (response.ok) {
                cache.put(URL_API_PROJECTS, response.clone())
                setCacheTimestamp(URL_API_PROJECTS)
                return response
              } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((images) => dispatch(addProjectImages(images)))
          .then((images) => imagePreFetcher(images.payload, 10, 'Projects'))
          .catch((error) => dispatch(projectImagesFailed(error.message)))
        }
    })
  })
}

export const projectImagesLoading = () => ({
  type: ActionTypes.PROJECT_IMAGES_LOADING,
})

export const projectImagesFailed = (errmess) => ({
  type: ActionTypes.PROJECT_IMAGES_FAILED,
  payload: errmess,
})

export const addProjectImages = (images) => ({
  type: ActionTypes.ADD_PROJECT_IMAGES,
  payload: images,
})

/* ----------------------------------- */

export const fetchClients = () => (dispatch) => {
  dispatch(clientsLoading(true))

    caches.open(CACHE_NAME_API).then((cache) => {
    cache.match(URL_API_CLIENTS).then((cachedResponse) => {
      if (cachedResponse && !isCacheExpired(URL_API_CLIENTS)) {
        cachedResponse.json().then((clients) => {
          dispatch(addClients(clients))
          imagePreFetcher(clients, 15, 'Clients')
          imagePreFetcher(
            [
              'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201857/Lawrence6.jpg',
            ],
            5,
            'Site Static'
          )
        })
      } else {
        console.log('No cached clients found, fetching from network...')
        fetch(URL_API_CLIENTS)
        .then(
          (response) => {
            if (response.ok) {
              cache.put(URL_API_CLIENTS, response.clone())
              setCacheTimestamp(URL_API_CLIENTS)
              return response
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText)
              error.response = response
              throw error
            }
          },
          (error) => {
            var errmess = new Error(error.message)
            throw errmess
          }
        )
        .then((response) => response.json())
        .then((clients) => dispatch(addClients(clients)))
        .then((clients) => {
          imagePreFetcher(clients.payload, 15, 'Clients')
          imagePreFetcher(
            [
              'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201857/Lawrence6.jpg',
            ],
            5,
            'Site Static'
          )
        })
        .catch((error) => dispatch(clientsFailed(error.message)))
          }
        })
      })
}


export const clientsLoading = () => ({
  type: ActionTypes.CLIENTS_LOADING,
})

export const clientsFailed = (errmess) => ({
  type: ActionTypes.CLIENTS_FAILED,
  payload: errmess,
})

export const addClients = (clients) => ({
  type: ActionTypes.ADD_CLIENTS,
  payload: clients,
})

/* ----------------------------------- */
