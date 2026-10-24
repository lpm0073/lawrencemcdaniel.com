import type { UnknownAction } from '@reduxjs/toolkit'
import * as ActionTypes from './ActionTypes'
import type { WPPost } from '../types'
import type { FetchAction, FetchState } from './types'

import { wpGetFeaturedImage } from '../shared/wpGetFeaturedImage'
import { shuffleArray } from '../shared/shuffle'

/** WordPress category id of a featured technology. */
const FEATURED_TECHNOLOGY = 48

export interface SpecialtiesState extends FetchState {
  items: WPPost[]
  logos: (string | null)[]
  featured_logos: (string | null)[]
}

export type SpecialtiesAction = FetchAction<
  typeof ActionTypes.ADD_SPECIALTIES,
  typeof ActionTypes.SPECIALTIES_LOADING,
  typeof ActionTypes.SPECIALTIES_FAILED,
  WPPost[]
>

function extractUrls(posts: WPPost[]) {
  const logos = shuffleArray(posts.map((post) => wpGetFeaturedImage(post, 'medium')))

  const featured_logos = shuffleArray(
    posts
      .filter((post) => post.categories.includes(FEATURED_TECHNOLOGY))
      .map((featuredPost) => wpGetFeaturedImage(featuredPost, 'medium'))
  )

  return {
    logos: logos,
    featured_logos: featured_logos,
  }
}

export const SpecialtiesRedux = (
  state: SpecialtiesState = {
    isLoading: true,
    errMess: null,
    items: [],
    logos: [],
    featured_logos: [],
  },
  incoming: UnknownAction
): SpecialtiesState => {
  const action = incoming as SpecialtiesAction
  switch (action.type) {
    case ActionTypes.ADD_SPECIALTIES: {
      const parsed_urls = extractUrls(action.payload)
      return {
        ...state,
        isLoading: false,
        errMess: null,
        logos: parsed_urls.logos,
        featured_logos: parsed_urls.featured_logos,
        items: action.payload,
      }
    }

    case ActionTypes.SPECIALTIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        logos: [],
        featured_logos: [],
        items: [],
      }

    case ActionTypes.SPECIALTIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        logos: [],
        featured_logos: [],
        items: [],
      }

    default:
      return state
  }
}
