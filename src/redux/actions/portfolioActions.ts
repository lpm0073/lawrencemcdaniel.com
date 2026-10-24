import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { WPPost } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

const portfolioLoading = () => ({
  type: ActionTypes.PORTFOLIO_LOADING,
})

const portfolioFailed = (errmess: string) => ({
  type: ActionTypes.PORTFOLIO_FAILED,
  payload: errmess,
})

const addPortfolio = (portfolio: WPPost[]) => ({
  type: ActionTypes.ADD_PORTFOLIO,
  payload: portfolio,
})

export const fetchPortfolio = (): AppThunk => async (dispatch) => {
  dispatch(portfolioLoading())

  try {
    const portfolio = await cachedFetchJson<WPPost[]>(
      APP_CONFIG.apis.portfolio,
      'portfolio'
    )
    dispatch(addPortfolio(portfolio))
    imagePreFetcher(portfolio, 'Portfolio')
  } catch (error) {
    dispatch(portfolioFailed(errorMessage(error)))
  }
}
