/**
 * Typed versions of react-redux's hooks, and one hook per data source.
 *
 * The data hooks wrap the RTK Query hooks of api.ts in the shape the pages
 * use: { isLoading, errMess, data }, where data is empty (rather than
 * undefined) until it has loaded, and errMess is a sentence.
 */
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { Article, Repository, Video, WPMedia, WPPost } from '../types'
import {
  queryErrorMessage,
  type SiteEndpoint,
  type Specialties,
  useGetArticlesQuery,
  useGetClientsQuery,
  useGetEducationQuery,
  useGetPortfolioQuery,
  useGetProjectImagesQuery,
  useGetRecommendationsQuery,
  useGetRepositoriesQuery,
  useGetSpecialtiesQuery,
  useGetVideosQuery,
} from './api'
import type { AppDispatch, RootState } from './configureStore'
import { RenderedEndpoints } from './renderedEndpoints'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

/** A data source, as a page uses it. */
export interface SiteData<T> {
  isLoading: boolean
  errMess: string | null
  data: T
}

const NO_POSTS: WPPost[] = []
const NO_MEDIA: WPMedia[] = []
const NO_ARTICLES: Article[] = []
const NO_VIDEOS: Video[] = []
const NO_REPOSITORIES: Repository[] = []
const NO_SPECIALTIES: Specialties = { items: [], logos: [], featured_logos: [] }

/** A query's state as a SiteData, recording that the page read endpoint's data. */
function useSiteData<T>(
  endpoint: SiteEndpoint,
  query: {
    isLoading: boolean
    data?: T
    error?: Parameters<typeof queryErrorMessage>[0]
  },
  empty: T
): SiteData<T> {
  useContext(RenderedEndpoints)?.add(endpoint)
  return {
    isLoading: query.isLoading,
    errMess: queryErrorMessage(query.error),
    data: query.data ?? empty,
  }
}

export const useArticles = () =>
  useSiteData('getArticles', useGetArticlesQuery(), NO_ARTICLES)
export const useVideos = () => useSiteData('getVideos', useGetVideosQuery(), NO_VIDEOS)
export const useRepositories = () =>
  useSiteData('getRepositories', useGetRepositoriesQuery(), NO_REPOSITORIES)
export const useSpecialties = () =>
  useSiteData('getSpecialties', useGetSpecialtiesQuery(), NO_SPECIALTIES)
export const usePortfolio = () =>
  useSiteData('getPortfolio', useGetPortfolioQuery(), NO_POSTS)
export const useEducation = () =>
  useSiteData('getEducation', useGetEducationQuery(), NO_POSTS)
export const useRecommendations = () =>
  useSiteData('getRecommendations', useGetRecommendationsQuery(), NO_POSTS)
export const useClients = () => useSiteData('getClients', useGetClientsQuery(), NO_POSTS)
export const useProjectImages = () =>
  useSiteData('getProjectImages', useGetProjectImagesQuery(), NO_MEDIA)
