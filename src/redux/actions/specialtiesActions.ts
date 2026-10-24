import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { WPPost } from '../../types'
import { APP_CONFIG } from '../../shared/constants'
import { fetchPostTags } from '../../shared/fetchers/apiPostTagsFetcher'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

const specialtiesLoading = () => ({
  type: ActionTypes.SPECIALTIES_LOADING,
})

const specialtiesFailed = (errmess: string) => ({
  type: ActionTypes.SPECIALTIES_FAILED,
  payload: errmess,
})

const addSpecialties = (specialties: WPPost[]) => ({
  type: ActionTypes.ADD_SPECIALTIES,
  payload: specialties,
})

export const fetchSpecialties = (): AppThunk => async (dispatch) => {
  dispatch(specialtiesLoading())

  try {
    const posts = await cachedFetchJson<WPPost[]>(
      APP_CONFIG.apis.specialties,
      'specialties'
    )

    // add each specialty's tag names, as its skills.
    const tags = await fetchPostTags()
    const specialties = posts.map((specialty) => ({
      ...specialty,
      skills: Array.isArray(specialty.tags)
        ? specialty.tags.map((id) => tags.find((tag) => tag.id === id)?.name ?? null)
        : [],
    }))

    dispatch(addSpecialties(specialties))
    imagePreFetcher(specialties, 'Specialities')
  } catch (error) {
    dispatch(specialtiesFailed(errorMessage(error)))
  }
}
