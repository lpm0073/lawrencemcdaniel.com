import * as ActionTypes from './ActionTypes';

import { wpGetFeaturedImage } from '../shared/wpGetFeaturedImage';
import { shuffleArray } from '../shared/shuffle';


export const Specialties = (state = {
    isLoading: true,
    errMess: null,
    items: [],
    logos: [],
    featured_logos: []
    }, action) => {

    function extractUrls() {

            const posts = action.payload;
            const logos = shuffleArray(posts.map((post, indx) => {
                return wpGetFeaturedImage(post, "medium");
            }));
    
            const featured_logos =  shuffleArray(posts.filter((post, indx) => {
                for (var i=0 ; i < post.categories.length ; i++) {
                    if (post.categories[i] === 48) {  /* featured technology */
                        return true;
                    }
                }
                return false;
            }).map((featuredPost, indx) => {
                return wpGetFeaturedImage(featuredPost, "medium");
            }));
    
            return {
                logos: logos,
                featured_logos: featured_logos
            };
        }
    
    
    switch(action.type) {
        case ActionTypes.ADD_SPECIALTIES:
            const parsed_urls = extractUrls();
            return {
                ...state, 
                isLoading: false, 
                errMess: null, 
                logos: parsed_urls.logos,  
                featured_logos: parsed_urls.featured_logos,
                items: action.payload
            };

        case ActionTypes.SPECIALTIES_LOADING:
            return {
                ...state, 
                isLoading: true, 
                errMess: null, 
                logos: [],
                featured_logos: [],
                items: []
            };

        case ActionTypes.SPECIALTIES_FAILED:
            return {
                ...state, 
                isLoading: false, 
                errMess: action.payload, 
                logos: [],
                featured_logos: [],
                items: []
            };
            
        default: 
            return state;
    }
};
