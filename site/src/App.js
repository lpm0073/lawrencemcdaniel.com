/*

 see: https://dev.to/daniellycosta/showing-new-version-available-notification-on-create-react-app-pwas-3jc9#snackbar-provider
 see: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

 Note: "SW" = Service Worker.

 */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// the components that draw the app
import Routes from './components/Routes';
import Head from './components/Head';
import { Header } from './components/header/Component';
import Footer from './components/footer/Component';

// UI stuff for service worker notifications
import AppUpdateAlert from './components/appUpdate/Component';

import './App.css';

const UPDATE_AVAILABLE_MESSAGE = "New content is available and will be automatically installed momentarily.";
const SUCCESSFUL_INSTALL_MESSAGE = "This app has successfully updated itself in the background. Content is cached for offline use.";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSet: false,              // True once componentDidMount runs
      customClass: props.cls,    // Expects "online" or "offline"

      // service worker state management
      // -----------------------------------------------------------------------------------------
      updatedSW: null,             // The service worker that is waiting to be updated

      isSWUpdateAvailable: false,  // Set to True to trigger a Bootstrap alert.
                                   // Set from a Workbox callback 
                                   // after a new service worker has 
                                   // downloaded and if ready to install.

      wasSWInstalledSuccessfully: false    // Set to True to trigger a Bootstrap alert.
                                           // Set from a Workbox callback after
                                           // service worker was successfully installed.
      // -----------------------------------------------------------------------------------------
    };

    // Workbox and React component callbacks.
    // We want these bound to this class so that garbage collection
    // never eliminates them while a Workbox event handler might
    // call one of them.
    this.resetSWNotificationStates = this.resetSWNotificationStates.bind(this);
    this.onSWUpdateAvailable = this.onSWUpdateAvailable.bind(this);
    this.onSWInstallSuccess = this.onSWInstallSuccess.bind(this);

  }

  // ---------------------------------------------------------------------------
  // -------- Workbox Service Worker event handlers and state management -------
  // ---------------------------------------------------------------------------

  // Callback for our AppUpdateAlert component.
  resetSWNotificationStates() {

    // this covers the intended use case
    // of allowing a server worker update to proceed
    // automatically, once the user has been made aware
    // that the update exists, was downloaded in the background
    // and is ready to install.
    if (this.state.updatedSW && this.state.isSWUpdateAvailable) {
      this.updatedSW.postMessage({
        type: 'SKIP_WAITING'
      });
    }

    // reset the service worker states
    this.setState({ 
      updatedSW: null,
      isSWUpdateAvailable: false,
      wasSWInstalledSuccessfully: false
    });
  }

  // Workbox callback for "service worker update ready" event
  onSWUpdateAvailable(registration) {
    if (this.state.isSet && registration) {
      this.setState({
        updatedSW: registration.waiting,
        isSWUpdateAvailable: true,
        wasSWInstalledSuccessfully: false
      });
    } else {
      console.log("Warning: onSWUpdateAvailable() was called without a Workbox registration object, or, component was not yet mounted.");
    }
  }

  // Workbox callback for "service worker installation success" event
  onSWInstallSuccess(registration) {
    if (this.state.isSet) {
      this.setState({ 
        updatedSW: registration,
        isSWUpdateAvailable: false,
        wasSWInstalledSuccessfully: true
      });
    } 
  }

  // ----------------------------------------------------
  // ------------ React Component life cycle ------------
  // ----------------------------------------------------
  componentDidMount() {

    this.resetSWNotificationStates();
    this.setState({
      isSet: true
    });

    // Note: I relocated this snippet from index.js
    // in order to add Workbox's two event handlers
    // for onUpdate and onSuccess.
    if (process.env.NODE_ENV === 'production') {

      serviceWorkerRegistration.register({ 
        onUpdate: this.onSWUpdateAvailable,
        onSuccess: this.onSWInstallSuccess
      });

    }

  }
  
  render() {

    // service worker app update alerts.
    function AppUpdateAlerts(props) {
      const context = props.context;
      
      return(
        <React.Fragment>
            {context.state.isSet &&
              <React.Fragment>
                {context.state.isSWUpdateAvailable && 
                        <AppUpdateAlert 
                          msg={UPDATE_AVAILABLE_MESSAGE} 
                          callback={this.resetSWNotificationStates} /> 
                }

                {context.state.wasSWInstalledSuccessfully && 
                        <AppUpdateAlert 
                          msg={SUCCESSFUL_INSTALL_MESSAGE} 
                          callback={this.resetSWNotificationStates} /> 
                }
              </React.Fragment>
            }
        </React.Fragment>
      )
    }

    // render the app!
    return ( 
      <React.Fragment>
        <Head />
        <BrowserRouter>
          <div className={"container-fluid p-0 " + this.state.customClass}>
            <Header />
            <AppUpdateAlerts context={this}/>
            <Routes />
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;
