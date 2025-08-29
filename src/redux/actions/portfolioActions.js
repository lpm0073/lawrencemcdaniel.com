import * as ActionTypes from '../ActionTypes.js'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

const portfolioLoading = () => ({
  type: ActionTypes.PORTFOLIO_LOADING,
})

const portfolioFailed = (errmess) => ({
  type: ActionTypes.PORTFOLIO_FAILED,
  payload: errmess,
})

const addPortfolio = (portfolio) => ({
  type: ActionTypes.ADD_PORTFOLIO,
  payload: portfolio,
})

export const fetchPortfolio = () => async (dispatch) => {
  dispatch(portfolioLoading(true))

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.portfolio)

    let portfolio
    if (cachedResponse) {
      portfolio = await cachedResponse.json()
    } else {
      const response = await fetch(APP_CONFIG.apis.portfolio)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      await cache.put(APP_CONFIG.apis.portfolio, response.clone())
      portfolio = await response.json()
    }

    dispatch(addPortfolio(portfolio))
    imagePreFetcher(portfolio, 10, 'Portfolio')
  } catch (error) {
    dispatch(portfolioFailed(error.message))
  }
}
