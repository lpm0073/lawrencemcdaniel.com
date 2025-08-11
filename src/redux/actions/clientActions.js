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
