/*

 see https://dev.to/daniellycosta/showing-new-version-available-notification-on-create-react-app-pwas-3jc9#snackbar-provider

 */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Routes from './components/Routes';
import { Header } from './components/header/Component';
import Footer from './components/footer/Component';
import Head from './components/Head';
import AppUpdateAlert from './components/appUpdate/Component';
import './App.css';

const DEBUG = false;
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
    this.resetWorkUpdateState = this.resetWorkUpdateState.bind(this);
    this.onServiceWorkerUpdate = this.onServiceWorkerUpdate.bind(this);
    this.onServiceWorkerUpdateSuccess = this.onServiceWorkerUpdateSuccess.bind(this);

    // App handlers
    this.AppUpdateToast_OKHandler = this.AppUpdateToast_OKHandler.bind(this);

    this.resetWorkUpdateState();
  }

  /* ------------------------------------------
     Workbox Service Worker event handlers
     ------------------------------------------ */

  resetWorkUpdateState() {
    if (DEBUG) console.log("resetWorkUpdateState()")
    this.setState({ 
      newWorker: null,
      newVersionAvailable: false,
      newVersionInstalledSuccessfully: false
    });

  }

  // Workbox service worker registration update handler
  onServiceWorkerUpdate(registration) {
    if (this.state.isSet && registration) {
      if (DEBUG) console.log("onServiceWorkerUpdate()");
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
    if (DEBUG) console.log("onServiceWorkerUpdateSuccess()")
    if (this.state.isSet) {
      this.setState({ 
        newWorker: null,
        newVersionAvailable: false,
        newVersionInstalledSuccessfully: true
      });
    } 
  }

  /* ------------------------------------------
     App UI handlers
     ------------------------------------------ */

  AppUpdateToast_OKHandler() {
    if (DEBUG) console.log("AppUpdateToast_OKHandler()");
    const { newWorker } = this.state;

    if (newWorker && this.state.newVersionAvailable) {
      if (DEBUG) console.log("sending SKIP_WAITING to service worker ...");

      // force the update to install now.
      newWorker.postMessage({ type: 'SKIP_WAITING' })
      
      // browser refresh
      window.location.reload()
      if (DEBUG) console.log("launching update process ...");

    } else {
      if (DEBUG) console.log("Warning: AppUpdateToast_OKHandler() was called but there is no newWorker.");
    }

    this.setState({
      newVersionAvailable: false
    });
  }


  /* ------------------------------------------
    React Component life cycle
    ------------------------------------------ */
  componentDidMount() {
    const d = new Date();
    let text = d.toString();
    if (DEBUG) console.log("App.componentDidMount()", text);

    this.setState({
      isSet: true
    });

    // migrated from index.js
    // register the current service worker. 
    // Do this once and only once. hence, placing thi sin the constructor.
    //
    // see: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (process.env.NODE_ENV === 'production') {

      serviceWorkerRegistration.register({ 
        onUpdate: this.onServiceWorkerUpdate,
        onSuccess: this.onServiceWorkerUpdateSuccess
      });
      if (DEBUG) console.log("serviceWorkerRegistration.register() invoked.")
    }

  }
  componentDidUpdate() {
    const d = new Date();
    let text = d.toString();
    if (DEBUG) console.log("App.componentDidUpdate()", text);

    // success alert has not controls, no handler
    // so we need to disable it ourselves.
    if (this.state.newVersionInstalledSuccessfully) {
      this.resetWorkUpdateState()
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
