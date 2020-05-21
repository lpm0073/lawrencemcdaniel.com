export const wpGetFeaturedImage = (post, imageSize) => {

    var image_url = null;

    try {
        // try to retrieve an optimized version of the image, if it exists
        image_url = post._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize].source_url;
      }
      catch(err) {
        // otherwise return the original image
        try {
          image_url = post._embedded["wp:featuredmedia"][0].source_url;
        }
        catch(err) {
          // this post has no featured image.
        }
      }

    
    return image_url;
}
