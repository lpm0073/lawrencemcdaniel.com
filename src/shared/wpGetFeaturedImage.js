export const wpGetFeaturedImage = (post, imageSize = 'medium') => {
  var image_url = null

  try {
    // try to retrieve an optimized version of the image, if it exists
    image_url =
      post._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize].source_url
  } catch (err) {
    // otherwise return the original image
    try {
      //image_url = post._embedded['wp:featuredmedia'][0].source_url
      image_url =
        post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
    } catch (err) {
      try {
        image_url = post.source_url
      } catch (err) {
        // this post has no featured image.
        console.warn(
          `wpGetFeaturedImage() - no featured image found for post ${post.id}`,
          post
        )
      }
    }
  }

  return image_url
}
