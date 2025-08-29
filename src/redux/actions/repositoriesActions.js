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

export const fetchRepositories = () => async (dispatch) => {
  dispatch(repositoriesLoading())

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.repositories)

    if (cachedResponse) {
      const repositories = await cachedResponse.json()
      dispatch(addRepositories(repositories))
    } else {
      const response = await fetch(APP_CONFIG.apis.repositories)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      await cache.put(APP_CONFIG.apis.repositories, response.clone())
      const repositories = await response.json()
      dispatch(addRepositories(repositories))
    }
  } catch (error) {
    dispatch(repositoriesFailed(error.message))
  }
}
