import * as ActionTypes from '../ActionTypes.js'

import { APP_CONFIG } from '../../shared/constants.js'

const repositoriesLoading = () => ({
  type: ActionTypes.REPOS_LOADING,
})

const repositoriesFailed = (errmess) => ({
  type: ActionTypes.REPOS_FAILED,
  payload: errmess,
})

const addRepositories = (repositories) => ({
  type: ActionTypes.ADD_REPOS,
  payload: repositories,
})

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
