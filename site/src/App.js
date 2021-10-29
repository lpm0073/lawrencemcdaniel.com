/*

 see: https://dev.to/daniellycosta/showing-new-version-available-notification-on-create-react-app-pwas-3jc9#snackbar-provider
 see: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

 */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Head from './components/Head';
import { Header } from './components/header/Component';
import AppUpdateAlert from './components/appUpdate/Component';
import Routes from './components/Routes';
import Footer from './components/footer/Component';

import './App.css';

const NEW_CONTENT_MESSAGE = "New content is available and will be used when all tabs for this page are closed.";
const SUCCESSFUL_UPDATE_MESSAGE = "This app has successfully updated itself in the background. Content is cached for offline use.";
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSet: false,                            // true if componentDidMount
      customClass: props.cls,                  // expecting "online" or "offline"
      newWorker: null,                         // the service worker that is waiting to be updated
      newVersionAvailable: false,              // is there an update?
      newVersionInstalledSuccessfully: false  // app update was successfully installed
    };

    // Workbox handlers
    this.resetWorkerState = this.resetWorkerState.bind(this);
    this.onServiceWorkerUpdate = this.onServiceWorkerUpdate.bind(this);
    this.onServiceWorkerUpdateSuccess = this.onServiceWorkerUpdateSuccess.bind(this);

  }

  /* ------------------------------------------
     Workbox Service Worker event handlers
     ------------------------------------------ */

  resetWorkerState() {
    this.setState({ 
      newWorker: null,
      newVersionAvailable: false,
      newVersionInstalledSuccessfully: false
    });
  }

  // Workbox service worker registration update handler
  onServiceWorkerUpdate(registration) {
    if (this.state.isSet && registration) {
      this.setState({
        newWorker: registration.waiting,
        newVersionAvailable: true,
        newVersionInstalledSuccessfully: false
      });
    } else {
      console.log("Warning: onServiceWorkerUpdate() was called without a registration object or component not mounted.");
    }
  }

  // Workbox handler for service worker update success handler
  onServiceWorkerUpdateSuccess(registration) {

    if (this.state.isSet) {
      this.setState({ 
        newWorker: registration,
        newVersionAvailable: false,
        newVersionInstalledSuccessfully: true
      });
    } 
  }

  /* ------------------------------------------
    React Component life cycle
    ------------------------------------------ */
  componentDidMount() {

    this.resetWorkerState();
    this.setState({
      isSet: true
    });

    // migrated from index.js
    // register the current service worker. 
    if (process.env.NODE_ENV === 'production') {

      serviceWorkerRegistration.register({ 
        onUpdate: this.onServiceWorkerUpdate,
        onSuccess: this.onServiceWorkerUpdateSuccess
      });

    }

  }
  
  componentDidUpdate() {

    // success alert has no controls, no handler
    // so we need to disable it ourselves.
    if (this.state.newVersionInstalledSuccessfully) {
      this.resetWorkerState()
    }
  }

  render() {

    // UI widgets for service worker app update announcement and installation result.
    function AppUpdates(props) {
      const context = props.context;
      
      return(
        <React.Fragment>
            {context.state.isSet &&
              <React.Fragment>
                {context.state.newVersionAvailable && <AppUpdateAlert msg={NEW_CONTENT_MESSAGE} /> }
                {context.state.newVersionInstalledSuccessfully && <AppUpdateAlert msg={SUCCESSFUL_UPDATE_MESSAGE} /> }
              </React.Fragment>
            }
        </React.Fragment>
      )
    }

    return ( 
      <React.Fragment>
        <Head />
        <BrowserRouter>
          <div className={"container-fluid p-0 " + this.state.customClass}>
            <Header />
            <AppUpdates context={this}/>
            <Routes />
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;
