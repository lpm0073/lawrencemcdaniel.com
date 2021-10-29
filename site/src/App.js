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
      isSet: false,                            // True once componentDidMount runs
      customClass: props.cls,                  // Expects "online" or "offline"

      // service worker state management
      // -----------------------------------------------------------------------------------------
      newServiceWorker: null,                   // The service worker that is waiting to be updated

      newServiceWorkerVersionAvailable: false,  // Set to True to trigger a Bootstrap alert.
                                                // Set from a Workbox callback 
                                                // after a new service worker has 
                                                // downloaded and if ready to install.

      newServiceWorkerInstalledSuccessfully: false    // Set to True to trigger a Bootstrap alert.
                                                      // Set from a Workbox callback after
                                                      // service worker was successfully installed.
      // -----------------------------------------------------------------------------------------
    };

    // Workbox handlers
    this.resetServiceWorkerState = this.resetServiceWorkerState.bind(this);
    this.onServiceWorkerUpdate = this.onServiceWorkerUpdate.bind(this);
    this.onServiceWorkerUpdateSuccess = this.onServiceWorkerUpdateSuccess.bind(this);

  }

  /* ------------------------------------------
     Workbox Service Worker state management and event handling
     ------------------------------------------ */

  // Callback for AppUpdateAlert component
  resetServiceWorkerState() {
    this.setState({ 
      newServiceWorker: null,
      newServiceWorkerVersionAvailable: false,
      newServiceWorkerInstalledSuccessfully: false
    });
  }

  // Workbox callback for "service worker update ready" event
  onServiceWorkerUpdate(registration) {
    if (this.state.isSet && registration) {
      this.setState({
        newServiceWorker: registration.waiting,
        newServiceWorkerVersionAvailable: true,
        newServiceWorkerInstalledSuccessfully: false
      });
    } else {
      console.log("Warning: onServiceWorkerUpdate() was called without a Workbox registration object, or, component was not yet mounted.");
    }
  }

  // Workbox callback for "service worker installation success" event
  onServiceWorkerUpdateSuccess(registration) {
    if (this.state.isSet) {
      this.setState({ 
        newServiceWorker: registration,
        newServiceWorkerVersionAvailable: false,
        newServiceWorkerInstalledSuccessfully: true
      });
    } 
  }

  /* ------------------------------------------
    React Component life cycle
    ------------------------------------------ */
  componentDidMount() {

    this.resetServiceWorkerState();
    this.setState({
      isSet: true
    });

    // Note: this was migrated from index.js.
    // Calling this multiple times is benign.
    if (process.env.NODE_ENV === 'production') {

      serviceWorkerRegistration.register({ 
        onUpdate: this.onServiceWorkerUpdate,
        onSuccess: this.onServiceWorkerUpdateSuccess
      });

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
                {context.state.newServiceWorkerVersionAvailable && 
                        <AppUpdateAlert 
                          msg={NEW_CONTENT_MESSAGE} 
                          callback={this.resetServiceWorkerState} /> }

                {context.state.newServiceWorkerInstalledSuccessfully && 
                        <AppUpdateAlert 
                          msg={SUCCESSFUL_UPDATE_MESSAGE} 
                          callback={this.resetServiceWorkerState} /> }
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
