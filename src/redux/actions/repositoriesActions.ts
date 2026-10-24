import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { Repository } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'

const repositoriesLoading = () => ({
  type: ActionTypes.REPOS_LOADING,
})

const repositoriesFailed = (errmess: string) => ({
  type: ActionTypes.REPOS_FAILED,
  payload: errmess,
})

const addRepositories = (repositories: Repository[]) => ({
  type: ActionTypes.ADD_REPOS,
  payload: repositories,
})

export const fetchRepositories = (): AppThunk => async (dispatch) => {
  dispatch(repositoriesLoading())

  try {
    const repositories = await cachedFetchJson<Repository[]>(
      APP_CONFIG.apis.repositories,
      'repositories'
    )
    dispatch(addRepositories(repositories))
  } catch (error) {
    dispatch(repositoriesFailed(errorMessage(error)))
  }
}
