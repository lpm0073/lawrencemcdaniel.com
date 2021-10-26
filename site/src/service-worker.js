/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

import { wpGetFeaturedImage } from './shared/wpGetFeaturedImage';
import { cdnUrl, apiUrl, siteUrl, CORSOrigins, 
         APISpecialtiesURL, APIPortfolioURL, APIEducationURL, 
         APIRecommendationsURL, APIProjectsURL, APIClientsURL } from './shared/urls';

// Image precache engine for Wordpress REST apis.
//
// expects a URL for a Wordpress REST api for 
// any kind of `Post` data. Calls an internal function wpGetFeaturedImage()
// to extract the url of the featured image of the post, assumed to point to cdn.lawrencemcdaniel.com,
// and fetches this file, assumed to be an image.
//
// example url: https://api.lawrencemcdaniel//wp-json/wp/v2/posts?categories=43&_embed&per_page=100
// example imageUrl: https://cdn.lawrencemcdaniel.com/wp-content/uploads/2021/02/12213439/swagger_logo.png
//
function precacheArray(url) {
  fetch(url)
  .then(
      response => {
        if (response.ok) {
              return response;
          } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
      },
      error => {
          var errmess = new Error(error.message);
          throw errmess;
      })
  .then(response => response.json())
  .then(arr => {

    arr.forEach((post) => {
      const imageUrl = wpGetFeaturedImage(post);
      if (imageUrl) {
        fetch(imageUrl, {
          mode: 'no-cors',
          headers: { 'Access-Control-Allow-Origin': CORSOrigins },
        })
        .then(response => {}, error => {
            console.log("precache error: ", imageUrl, error.message);
        })
      }

    });
    
  });
}

// ----------------------------------------
// create-react-app generated Workbox code
// ----------------------------------------
clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);


// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/*
  --------------------------------------------------------------------------------
  McDaniel Oct-2021
  Custom caching behavior.
  --------------------------------------------------------------------------------
 */
  function isImageFile(url) {
    return (
      url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.jpg') || 
      url.pathname.endsWith('.jpeg') || 
      url.pathname.endsWith('.gif') || 
      url.pathname.endsWith('.tif') || 
      url.pathname.endsWith('.svg')
      );
  }
  
  
// Cache the app manifest
//
// no max, no expiration.
// docs: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.StaleWhileRevalidate
registerRoute(
  ({url}) => url.origin === siteUrl + '/manifest.json',
  new StaleWhileRevalidate({
    cacheName: 'manifest',
    plugins: [
      new ExpirationPlugin({}),
    ],
  }),
);
  
// Cache api responses with a stale-while-revalidate strategy
// these are small, as they're only the json response objects.
//
// no max, no expiration.
// docs: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.StaleWhileRevalidate
registerRoute(
  ({url}) => url.origin === apiUrl,
  new StaleWhileRevalidate({
    cacheName: 'api-responses',
    plugins: [
      new ExpirationPlugin({}),
    ],
  }),
);

// Cache cdn content with a CacheFirst strategy
// Set a high maxEntries so that we hopefully cache everything
// but we keep some kind of reasonable ceiling in order to always
// play nice.
//
// the api responses above have their own cache-busting strategy based
// on the ultimate url routes, thus, we can use an arbitrarily
// long cache life for this.
// These are large files, as they're
// the image objects referenced in the api-responses above.
//
// docs: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies.CacheFirst
// A cache first strategy is useful for assets that have been revisioned, 
// such as URLs like /styles/example.a8f5f1.css, since they can be cached for long periods of time.
registerRoute(
  ({url}) => url.origin === cdnUrl,
  new CacheFirst({
    cacheName: 'cdn-responses',
    plugins: [
      new CacheableResponsePlugin({statuses: [0, 200]}),
      new ExpirationPlugin({maxEntries: 1000}),
    ],
  }),
);

// Images that are statically served from the React build itself.
// precache, in this case same-origin .png, jpg, svg requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && isImageFile(url),
  new StaleWhileRevalidate({
    cacheName: 'static-images',
    plugins: [
      new ExpirationPlugin({}),
    ],
  })
);

// Cache Google Fonts with a stale-while-revalidate strategy, with
// a maximum number of entries.
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({maxEntries: 20}),
    ],
  }),
);

// CDN IMAGE PRECACHING.
// ---------------------
// invoke each image api and call the imagePreFetcher.
// this should result in all static images getting cached 
// via a registerRoute below on the CDN responses.
precacheArray(APISpecialtiesURL);    // do me first!!!
precacheArray(APIClientsURL);
precacheArray(APIEducationURL);
precacheArray(APIPortfolioURL);
precacheArray(APIProjectsURL);
precacheArray(APIRecommendationsURL);

