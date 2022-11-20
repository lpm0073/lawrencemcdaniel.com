/*
https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c

mcdaniel oct-2021: also see https://blog.bitsrc.io/using-service-workers-with-react-27a4c5e2d1a9
 */
import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'

//import reportWebVitals from './reportWebVitals';

import { Online, Offline } from 'react-detect-offline'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-social/bootstrap-social.css'
import './index.css'

import App from './App'

const store = ConfigureStore()
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Online>
        <App cls="online" />
      </Online>
      <Offline>
        <App cls="offline" />
      </Offline>
    </Provider>
  </React.StrictMode>,
  container
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
