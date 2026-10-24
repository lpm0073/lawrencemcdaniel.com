import { combineReducers, configureStore } from '@reduxjs/toolkit'
// redux-logger is a CommonJS bundle. Vite's dev server imports its default export
// as the whole module object, so import the named createLogger instead.
import { createLogger } from 'redux-logger'

import { siteApi } from './api'
import { uiSlice } from './uiSlice'

export const rootReducer = combineReducers({
  [siteApi.reducerPath]: siteApi.reducer, // all of the site's data, see api.ts
  [uiSlice.name]: uiSlice.reducer, // entry animations and the logo cube, see uiSlice.ts
})

export type RootState = ReturnType<typeof rootReducer>

export const ConfigureStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware().concat(siteApi.middleware)
      return import.meta.env.DEV && import.meta.env.MODE !== 'test'
        ? middleware.concat(createLogger())
        : middleware
    },
  })

export type AppStore = ReturnType<typeof ConfigureStore>
export type AppDispatch = AppStore['dispatch']
