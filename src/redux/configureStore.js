import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { RepositoriesRedux } from './repositories.js'
import { SpecialtiesRedux } from './specialties.js'
import { PortfolioRedux } from './portfolio.js'
import { EducationRedux } from './education.js'
import { ProjectRedux } from './project.js'
import { RecommendationsRedux } from './recommendations.js'
import { ClientsRedux } from './clients.js'
import { LogoCubeRedux } from './logoCube.js'
import { AboutPageRedux } from './aboutPage.js'
import { ClientGridRedux } from './clientGrid.js'
import { CoursesGridRedux } from './coursesGrid.js'
import { HomePageRedux } from './homePage.js'

import logger from 'redux-logger'

const rootReducer = combineReducers({
  specialties: SpecialtiesRedux,
  portfolio: PortfolioRedux,
  education: EducationRedux,
  recommendations: RecommendationsRedux,
  repositories: RepositoriesRedux,
  project: ProjectRedux,
  clients: ClientsRedux,
  logoCube: LogoCubeRedux,
  aboutPage: AboutPageRedux,
  clientGrid: ClientGridRedux,
  coursesGrid: CoursesGridRedux,
  homePage: HomePageRedux,
})

export const ConfigureStore = () => {
  const middleware = (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware()
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger)
    }
    return middlewares
  }

  return configureStore({
    reducer: rootReducer,
    middleware,
  })
}
