import { wpGetFeaturedImage } from './wpGetFeaturedImage';

export const imagePreFetcher = (arr, delay, desc) => {

    setTimeout(function() {
        arr.forEach((post) => {
            new Image().src = wpGetFeaturedImage(post);
        });
        }, delay * 1000 * Math.random());

    return arr;
}
