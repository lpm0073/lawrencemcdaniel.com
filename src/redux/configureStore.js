import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { ArticlesRedux } from './articles.js'
import { VideosRedux } from './videos.js'
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
  articles: ArticlesRedux,                // blog posts from blog.lawrencemcdaniel.com
  videos: VideosRedux,                    // youtube videos
  repositories: RepositoriesRedux,        // github repositories
  specialties: SpecialtiesRedux,          // logos from api.lawrencemcdaniel.com
  portfolio: PortfolioRedux,              // portfolio posts from api.lawrencemcdaniel.com
  education: EducationRedux,              // education posts from api.lawrencemcdaniel.com
  recommendations: RecommendationsRedux,  // client recommendations from api.lawrencemcdaniel.com
  project: ProjectRedux,                  // project details from api.lawrencemcdaniel.com
  clients: ClientsRedux,                  // client details from api.lawrencemcdaniel.com
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
