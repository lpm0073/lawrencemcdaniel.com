/*
https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c

mcdaniel oct-2021: also see https://blog.bitsrc.io/using-service-workers-with-react-27a4c5e2d1a9
 */
import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import { refreshSiteData, seedSiteData } from './redux/api'
import { readSnapshot } from './prerender/snapshot'

//import reportWebVitals from './reportWebVitals'

import { Online, Offline } from 'react-detect-offline'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-social/bootstrap-social.css'
import './index.css'

import App from './App'

const store = ConfigureStore()
const container = document.getElementById('root')
if (!container) throw new Error('index.html has no #root element')

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <Online>
        <App cls="online" />
      </Online>
      <Offline>
        <App cls="offline" />
      </Offline>
    </Provider>
  </React.StrictMode>
)

// A page that the build prerendered (src/prerender/) carries the data it was
// rendered with. Seed the store with it, so that the app's first render matches
// the page's html and React hydrates it, then refresh that data. The dev server's
// pages have no snapshot, and the app renders from scratch.
const snapshot = readSnapshot(document)
if (snapshot) {
  store.dispatch(seedSiteData(snapshot))
  hydrateRoot(container, app)
  store.dispatch(refreshSiteData(snapshot))
} else {
  createRoot(container).render(app)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
