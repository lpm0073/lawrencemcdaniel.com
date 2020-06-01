/*
https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import { Suspense } from 'react';
import Loading from './components/Loading';
import * as serviceWorker from './serviceWorker';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={Loading}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
