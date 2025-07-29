import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { Specialties } from './specialties'
import { Portfolio } from './portfolio'
import { Education } from './education'
import { Project } from './project'
import { Recommendations } from './recommendations'
import { Clients } from './clients'
import { LogoCube } from './logoCube'
import { AboutPageRedux } from './aboutPage'
import { ClientGridRedux } from './clientGrid'
import { CoursesGridRedux } from './coursesGrid'
import { HomePageRedux } from './homePage.js'

//import { thunk } from 'redux-thunk'
import logger from 'redux-logger'

const rootReducer = combineReducers({
  specialties: Specialties,
  portfolio: Portfolio,
  education: Education,
  recommendations: Recommendations,
  project: Project,
  clients: Clients,
  logoCube: LogoCube,
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
