/**
 * Typed versions of react-redux's hooks, and one hook per data source.
 *
 * The data hooks wrap the RTK Query hooks of api.ts in the shape the pages
 * use: { isLoading, errMess, data }, where data is empty (rather than
 * undefined) until it has loaded, and errMess is a sentence.
 */
import { useDispatch, useSelector } from 'react-redux'

import type { Article, Repository, Video, WPMedia, WPPost } from '../types'
import {
  queryErrorMessage,
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

function siteData<T>(
  query: {
    isLoading: boolean
    data?: T
    error?: Parameters<typeof queryErrorMessage>[0]
  },
  empty: T
): SiteData<T> {
  return {
    isLoading: query.isLoading,
    errMess: queryErrorMessage(query.error),
    data: query.data ?? empty,
  }
}

export const useArticles = () => siteData(useGetArticlesQuery(), NO_ARTICLES)
export const useVideos = () => siteData(useGetVideosQuery(), NO_VIDEOS)
export const useRepositories = () => siteData(useGetRepositoriesQuery(), NO_REPOSITORIES)
export const useSpecialties = () => siteData(useGetSpecialtiesQuery(), NO_SPECIALTIES)
export const usePortfolio = () => siteData(useGetPortfolioQuery(), NO_POSTS)
export const useEducation = () => siteData(useGetEducationQuery(), NO_POSTS)
export const useRecommendations = () => siteData(useGetRecommendationsQuery(), NO_POSTS)
export const useClients = () => siteData(useGetClientsQuery(), NO_POSTS)
export const useProjectImages = () => siteData(useGetProjectImagesQuery(), NO_MEDIA)
