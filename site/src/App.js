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
import AppUpdateSuccessAlert, {AppUpdateToast} from './components/appUpdate/Component';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSet: false,                           // true if componentDidMount
      customClass: props.cls,                 // expecting "online" or "offline"
      waitingWorker: null,                    // the service worker that is waiting to be updated
      newVersionAvailable: false,             // is there an update?
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

    this.setState({ 
      waitingWorker: null,
      newVersionAvailable: false,
      newVersionInstalledSuccessfully: false
    });

  }

     // Workbox service worker registration update handler
  onServiceWorkerUpdate(registration) {
    if (this.state.isSet && registration) {
      console.log("onServiceWorkerUpdate()")
      this.setState({
        waitingWorker: registration.waiting,
        newVersionAvailable: true,
        newVersionInstalledSuccessfully: false
      })
    } else {
      console.log("Warning: onServiceWorkerUpdate() was called without a registration object or component not mounted.")
    }
  }

  // Workbox handler for service worker update success handler
  onServiceWorkerUpdateSuccess() {
    console.log("onServiceWorkerUpdateSuccess()")
    if (this.state.isSet) {
      this.setState({ 
        waitingWorker: null,
        newVersionAvailable: false,
        newVersionInstalledSuccessfully: true
      });
    } 
  }

  /* ------------------------------------------
     App UI handlers
     ------------------------------------------ */

  AppUpdateToast_OKHandler() {
    console.log("AppUpdateToast_OKHandler()");

    if (this.state.waitingWorker && this.state.newVersionAvailable) {
      console.log("launching update process ...")

      // force the update to install now.
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      
      // browser refresh
      window.location.reload()
      console.log("launching update process ...")
    } else {
      console.log("Warning: AppUpdateToast_OKHandler() was called but there is no waitingWorker.")
    }

    this.setState({
      newVersionAvailable: false
    });
  }


  /* ------------------------------------------
    React Component life cycle
    ------------------------------------------ */
  componentDidMount() {

    this.setState({
      isSet: true
    });

    // migrated from index.js
    // register the current service worker. 
    // Do this once and only once. hence, placing thi sin the constructor.
    if (process.env.NODE_ENV === 'production') {

      serviceWorkerRegistration.register({ 
        onUpdate: this.onServiceWorkerUpdate,
        onSuccess: this.onServiceWorkerUpdateSuccess
      });
      console.log("serviceWorkerRegistration.register() invoked.")
    }

  }
  componentDidUpdate() {
    
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
                {context.state.newVersionAvailable && <AppUpdateToast handler={context.AppUpdateToast_OKHandler} /> }
                {context.state.newVersionInstalledSuccessfully && <AppUpdateSuccessAlert /> }
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
