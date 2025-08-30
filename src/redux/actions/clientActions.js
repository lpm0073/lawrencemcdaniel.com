import * as ActionTypes from '../ActionTypes.js'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

const clientsLoading = () => ({
  type: ActionTypes.CLIENTS_LOADING,
})

const clientsFailed = (errmess) => ({
  type: ActionTypes.CLIENTS_FAILED,
  payload: errmess,
})

const addClients = (clients) => ({
  type: ActionTypes.ADD_CLIENTS,
  payload: clients,
})

export const setClientGrid = () => {
  return {
    type: ActionTypes.SET_CLIENTGRID_STATE,
  }
}

export const fetchClients = () => async (dispatch) => {
  dispatch(clientsLoading(true))

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.clients)

    if (cachedResponse) {
      const clients = await cachedResponse.json()
      dispatch(addClients(clients))
      imagePreFetcher(clients, 15, 'Clients')
    } else {
      const response = await fetch(APP_CONFIG.apis.clients)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      console.log('fetched and cached clients')
      await cache.put(APP_CONFIG.apis.clients, response.clone())
      const clients = await response.json()
      dispatch(addClients(clients))
      imagePreFetcher(clients, 15, 'Clients')
    }
  } catch (error) {
    dispatch(clientsFailed(error.message))
  }
}
