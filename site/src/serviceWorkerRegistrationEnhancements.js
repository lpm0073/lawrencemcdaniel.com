// Lawrence McDaniel
// Nov-2021
//
// Enhancements to the default behavior of serviceWorkerRegistration.js
// that is installed by `create-react-app my-app --template cra-template-pwa-typescript`
import { DEBUG } from "./shared/constants";

const AUTOMATIC_UPDATE_CHECK_INTERVAL = 15;   // expressed in minutes

// periodically poll for updates to the service worker
function checkUpdates(registration) {

    if (registration && registration.update) {
        if (DEBUG) console.log("service worker automatically checking for updates.");
        registration.update();
        setTimeout(function() {  // queue up the next update check
            checkUpdates(registration);
        }, 1000 * 60 * AUTOMATIC_UPDATE_CHECK_INTERVAL);   
    
    } else {
        console.log("Warning: checkUpdates() ran but registration has no update() function: ", registration);
    }
}

/* ========================================================================
Additional event management for service worker registration

Note: the possible service worker states are:
-----------------
"installing" - the install event has fired, but not yet complete
"installed"  - install complete
"activating" - the activate event has fired, but not yet complete
"activated"  - fully active
"redundant"  - discarded. Either failed install, or it's been replaced by a newer version
 ==========================================================================*/
export function serviceWorkerRegistrationEnhancements(config, registration) {

    if (DEBUG) console.log("service worker is registered");

    // initiate periodic update checks.
    checkUpdates(registration);

    const newInstalling = registration.installing;
    const newWaiting = registration.waiting;
    const activeWorker = registration.active;

    // tests to determine which of these worker state objects were
    // actually set prior to this thread being executed.
    if (newInstalling && DEBUG) console.log("newInstalling created");
    if (newWaiting && DEBUG) console.log("newWaiting created");
    if (activeWorker && DEBUG) console.log("activeWorker found");

    // add a listener for an `updatefound` event on the
    // newly-registered service worker. 
    registration.addEventListener('updatefound', () => {
        // this is assumed to exists at the point in time
        // when the `updatefound` event fires.
        const newWorker = registration.installing;

        if (DEBUG) {
            console.log("updatefound event listener fired.");
            console.log("newWorker state is: ", newWorker.state);
        }

        // add a `statechange` listener to the new service worker
        // object. We want to catch a possible state change to
        // `activated`, and if we catch this then we'll look for
        // and execute the `onActivate` event handler.
        newWorker.addEventListener('statechange', () => {
            if (DEBUG) console.log("newWorker.state changed to: ", newWorker.state);
            if (newWorker.state === 'activated' && config && config.onActivate) {
                if (DEBUG) console.log("invoking the onActivate callback.");
                config.onActivate(registration);
            }
        });
    });
}