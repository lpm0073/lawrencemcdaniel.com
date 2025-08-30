/*
 Gets the featured image URL from a WordPress post object.
 The Wordpress back end uses image scrunching and caching to optimize image delivery.
 This results in the need for analyzing the post object to locate the
 best available image given whatever is available on a post-by-post basis.

 This site generally presents smallish images in which the smallest possible
 format, 'medium', works well. However, these are only generated for some
 arbitrary minimum original file sizes, assumed to be somewhere greater than
 1mb.

 Urls pointing to the scrunched (ie reduced) images are located in
 post._embedded.['wp:featuredmedia'].[0].media_details.sizes, which
 may or may not exist, and the full path will vary depending on
 whether not image optimization has been performed.

 This function currently only retrieves the image URL and does not account
 for the possibility of missing or incomplete data in the post object.

 Fix note: added a placeholder url for fallback.

 example post?._embedded?.['wp:featuredmedia']?.[0]:
  [
      {
          "id": 3694,
          "slug": "black-logo",
          "type": "attachment",
          "link": "https://api.lawrencemcdaniel.com/2025/08/14/black/black-logo/",
          "media_type": "image",
          "mime_type": "image/webp",
          "media_details": {
              "width": 1000,
              "height": 420,
              "file": "2025/08/black-logo.webp",
              "filesize": 33966,
              "sizes": {
                  "medium": {
                      "file": "black-logo-300x126.webp",
                      "width": 300,
                      "height": 126,
                      "filesize": 3534,
                      "mime_type": "image/webp",
                      "source_url": "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2025/08/14155906/black-logo-300x126.webp"
                  },
                  "thumbnail": {
                      "file": "black-logo-150x150.webp",
                      "width": 150,
                      "height": 150,
                      "filesize": 3854,
                      "mime_type": "image/webp",
                      "source_url": "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2025/08/14155906/black-logo-150x150.webp"
                  },
                  "medium_large": {
                      "file": "black-logo-768x323.webp",
                      "width": 768,
                      "height": 323,
                      "filesize": 10678,
                      "mime_type": "image/webp",
                      "source_url": "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2025/08/14155906/black-logo-768x323.webp"
                  },
                  "full": {
                      "file": "black-logo.webp",
                      "width": 1000,
                      "height": 420,
                      "mime_type": "image/webp",
                      "source_url": "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2025/08/14155906/black-logo.webp"
                  }
              },
          },
          "source_url": "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2025/08/14155906/black-logo.webp",
      }
  ]
 */
export const wpGetFeaturedImage = (post, imageSize = 'medium') => {
  return (
    post?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[imageSize]
      ?.source_url ||
    post?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.['medium']
      ?.source_url ||
    post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    post?.source_url ||
    null
  )
}
