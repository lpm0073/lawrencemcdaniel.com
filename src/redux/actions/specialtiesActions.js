import * as ActionTypes from '../ActionTypes.js'
import { fetchPostTags } from '../../shared/fetchers/apiPostTagsFetcher'
import { imagePreFetcher } from '../../shared/fetchers/imagePrefetcher'

import { APP_CONFIG } from '../../shared/constants.js'

const specialtiesLoading = () => ({
  type: ActionTypes.SPECIALTIES_LOADING,
})

const specialtiesFailed = (errmess) => ({
  type: ActionTypes.SPECIALTIES_FAILED,
  payload: errmess,
})

const addSpecialties = (specialties) => ({
  type: ActionTypes.ADD_SPECIALTIES,
  payload: specialties,
})

export const fetchSpecialties = () => async (dispatch) => {
  dispatch(specialtiesLoading(true))

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.specialties)

    let specialties
    if (cachedResponse) {
      specialties = await cachedResponse.json()
    } else {
      const response = await fetch(APP_CONFIG.apis.specialties)
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      console.log('fetched and cached specialties')
      await cache.put(APP_CONFIG.apis.specialties, response.clone())
      specialties = await response.json()
    }

    const tags = await fetchPostTags()
    specialties = specialties.map((specialty) => ({
      ...specialty,
      skills: Array.isArray(specialty.tags)
        ? specialty.tags.map((id) => {
            const tag = tags.find((tag) => tag.id === id)
            return tag ? tag.name : null
          })
        : [],
    }))

    dispatch(addSpecialties(specialties))
    imagePreFetcher(specialties, 0, 'Specialities')
  } catch (error) {
    dispatch(specialtiesFailed(error.message))
  }
}
