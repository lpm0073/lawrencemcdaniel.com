export const wpGetFeaturedImage = (post, imageSize = 'medium') => {
  let image_url =
    post?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[imageSize]
      ?.source_url ||
    post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    post?.source_url ||
    null

  return image_url
}
