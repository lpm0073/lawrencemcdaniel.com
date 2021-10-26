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
import { CORSOrigins } from './urls';
import { wpGetFeaturedImage } from './wpGetFeaturedImage';

export const wpPrefetch = (url) => {
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
