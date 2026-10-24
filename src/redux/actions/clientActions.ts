import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { WPPost } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

const clientsLoading = () => ({
  type: ActionTypes.CLIENTS_LOADING,
})

const clientsFailed = (errmess: string) => ({
  type: ActionTypes.CLIENTS_FAILED,
  payload: errmess,
})

const addClients = (clients: WPPost[]) => ({
  type: ActionTypes.ADD_CLIENTS,
  payload: clients,
})

export const setClientGrid = () => ({
  type: ActionTypes.SET_CLIENTGRID_STATE,
})

export const fetchClients = (): AppThunk => async (dispatch) => {
  dispatch(clientsLoading())

  try {
    const clients = await cachedFetchJson<WPPost[]>(APP_CONFIG.apis.clients, 'clients')
    dispatch(addClients(clients))
    imagePreFetcher(clients, 'Clients')
  } catch (error) {
    dispatch(clientsFailed(errorMessage(error)))
  }
}
