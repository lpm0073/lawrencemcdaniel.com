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

export const fetchSpecialties = () => (dispatch) => {
  dispatch(specialtiesLoading(true))

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.specialties).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse
          .json()
          .then(async (specialties) => {
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
            return specialties
          })
          .then((specialties) => {
            dispatch(addSpecialties(specialties))
            imagePreFetcher(specialties, 0, 'Specialities')
            imagePreFetcher(
              [
                'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201305/Lawrence21.jpg',
              ],
              5,
              'Site Static'
            )
          })
      } else {
        fetch(APP_CONFIG.apis.specialties)
          .then(
            (response) => {
              if (!response.ok) {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
                error.response = response
                throw error
              }
              console.debug('fetched specialties')
              cache.put(APP_CONFIG.apis.specialties, response.clone())
              return response.json()
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then(async (specialties) => {
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
            return specialties
          })
          .then((specialties) => {
            dispatch(addSpecialties(specialties))
            imagePreFetcher(specialties, 0, 'Specialities')
            imagePreFetcher(
              [
                'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05201305/Lawrence21.jpg',
              ],
              5,
              'Site Static'
            )
          })
          .catch((error) => dispatch(specialtiesFailed(error.message)))
      }
    })
  })
}
