import * as ActionTypes from '../ActionTypes.js'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

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
