import { configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// redux-logger is a CommonJS bundle. Vite's dev server imports its default export
// as the whole module object, so import the named createLogger instead.
import { createLogger } from 'redux-logger'

import { AboutPageRedux } from './aboutPage'
import { ArticlesRedux } from './articles'
import { ClientGridRedux } from './clientGrid'
import { ClientsRedux } from './clients'
import { CoursesGridRedux } from './coursesGrid'
import { EducationRedux } from './education'
import { HomePageRedux } from './homePage'
import { LogoCubeRedux } from './logoCube'
import { PortfolioRedux } from './portfolio'
import { ProjectRedux } from './project'
import { RecommendationsRedux } from './recommendations'
import { RepositoriesRedux } from './repositories'
import { SpecialtiesRedux } from './specialties'
import { VideosRedux } from './videos'

export const rootReducer = combineReducers({
  articles: ArticlesRedux, // blog posts from blog.lawrencemcdaniel.com
  videos: VideosRedux, // youtube videos
  repositories: RepositoriesRedux, // github repositories
  specialties: SpecialtiesRedux, // logos from api.lawrencemcdaniel.com
  portfolio: PortfolioRedux, // portfolio posts from api.lawrencemcdaniel.com
  education: EducationRedux, // education posts from api.lawrencemcdaniel.com
  recommendations: RecommendationsRedux, // client recommendations from api.lawrencemcdaniel.com
  project: ProjectRedux, // project details from api.lawrencemcdaniel.com
  clients: ClientsRedux, // client details from api.lawrencemcdaniel.com
  logoCube: LogoCubeRedux,
  aboutPage: AboutPageRedux,
  clientGrid: ClientGridRedux,
  coursesGrid: CoursesGridRedux,
  homePage: HomePageRedux,
})

export type RootState = ReturnType<typeof rootReducer>

export const ConfigureStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      import.meta.env.DEV && import.meta.env.MODE !== 'test'
        ? getDefaultMiddleware().concat(createLogger())
        : getDefaultMiddleware(),
  })

export type AppStore = ReturnType<typeof ConfigureStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>
