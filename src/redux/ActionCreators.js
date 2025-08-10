import * as ActionTypes from './ActionTypes'
import { imagePreFetcher } from '../shared/fetchers/imagePrefetcher'
import { APP_CONFIG } from '../shared/constants'
import { getCategories } from '../shared/categories'

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

/*  ---------------------------------------------------------------------------
    methods to fetch data from api / cdn / cache
    -----------------------------------------------------------------------  */

export const fetchArticles = () => (dispatch) => {
  dispatch(articlesLoading())

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.articles).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((articles) => {
          dispatch(addArticles(articles))
        })
      } else {
        fetch(APP_CONFIG.apis.articles)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched wordpress blog posts')
                cache.put(APP_CONFIG.apis.articles, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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
          .then((articles) => {
            dispatch(addArticles(articles))
          })
          .catch((error) => dispatch(articlesFailed(error.message)))
      }
    })
  })
}

export const articlesLoading = () => ({
  type: ActionTypes.ARTICLES_LOADING,
})

export const articlesFailed = (errmess) => ({
  type: ActionTypes.ARTICLES_FAILED,
  payload: errmess,
})

export const addArticles = (articles) => {
  let payload
  if (Array.isArray(articles)) {
    payload = articles.map((article) => ({
      ...article,
      categories: getCategories(article.categories),
    }))
  } else {
    payload = {
      ...articles,
      categories: getCategories(articles.categories),
    }
  }

  return {
    type: ActionTypes.ADD_ARTICLES,
    payload,
  }
}
/* ----------------------------------- */

export const fetchVideos = () => (dispatch) => {
  dispatch(videosLoading())

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.videos).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((videos) => {
          dispatch(addVideos(videos))
        })
      } else {
        fetch(APP_CONFIG.apis.videos)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched youtube videos')
                cache.put(APP_CONFIG.apis.videos, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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
          .then((videos) => {
            dispatch(addVideos(videos))
          })
          .catch((error) => dispatch(videosFailed(error.message)))
      }
    })
  })
}

export const videosLoading = () => ({
  type: ActionTypes.VIDEOS_LOADING,
})
export const videosFailed = (errmess) => ({
  type: ActionTypes.VIDEOS_FAILED,
  payload: errmess,
})
export const addVideos = (videos) => {
  let payload
  if (Array.isArray(videos)) {
    payload = videos.map((video) => ({
      ...video,
      categories: getCategories(video.tags),
    }))
  } else {
    payload = {
      ...videos,
      categories: getCategories(videos.tags),
    }
  }

  return {
    type: ActionTypes.ADD_VIDEOS,
    payload,
  }
}

/* ----------------------------------- */

export const fetchRepositories = () => (dispatch) => {
  dispatch(repositoriesLoading())

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.repositories).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((repositories) => {
          dispatch(addRepositories(repositories))
        })
      } else {
        fetch(APP_CONFIG.apis.repositories)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched github repositories')
                cache.put(APP_CONFIG.apis.repositories, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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
          .then((repositories) => {
            dispatch(addRepositories(repositories))
          })
          .catch((error) => dispatch(repositoriesFailed(error.message)))
      }
    })
  })
}

export const repositoriesLoading = () => ({
  type: ActionTypes.REPOS_LOADING,
})
export const repositoriesFailed = (errmess) => ({
  type: ActionTypes.REPOS_FAILED,
  payload: errmess,
})
export const addRepositories = (repositories) => ({
  type: ActionTypes.ADD_REPOS,
  payload: repositories,
})

/* ----------------------------------- */

export const fetchSpecialties = () => (dispatch) => {
  dispatch(specialtiesLoading(true))

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.specialties).then((cachedResponse) => {
      if (cachedResponse) {
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
        fetch(APP_CONFIG.apis.specialties)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched specialties')
                cache.put(APP_CONFIG.apis.specialties, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.portfolio).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((portfolio) => {
          dispatch(addPortfolio(portfolio))
          imagePreFetcher(portfolio, 10, 'Portfolio')
        })
      } else {
        fetch(APP_CONFIG.apis.portfolio)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched portfolio')
                cache.put(APP_CONFIG.apis.portfolio, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.education).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((education) => {
          dispatch(addEducation(education))
          imagePreFetcher(education, 10, 'Education')
        })
      } else {
        fetch(APP_CONFIG.apis.education)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched education')
                cache.put(APP_CONFIG.apis.education, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.recommendations).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((recommendations) => {
          dispatch(addRecommendations(recommendations))
          imagePreFetcher(recommendations, 10, 'Recommendations')
        })
      } else {
        fetch(APP_CONFIG.apis.recommendations)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched recommendations')
                cache.put(APP_CONFIG.apis.recommendations, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.projects).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((images) => {
          dispatch(addProjectImages(images))
          imagePreFetcher(images, 10, 'Projects')
        })
      } else {
        fetch(APP_CONFIG.apis.projects)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched project images')
                cache.put(APP_CONFIG.apis.projects, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.clients).then((cachedResponse) => {
      if (cachedResponse) {
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
        fetch(APP_CONFIG.apis.clients)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched clients')
                cache.put(APP_CONFIG.apis.clients, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
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
