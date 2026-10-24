/**
 * A page's own head tags, for search engines and link previews: its canonical
 * url, description and preview image, as Open Graph (WhatsApp, Facebook,
 * LinkedIn, Slack) and Twitter card tags. They override the site's defaults in
 * Head.tsx. The page's title comes from RenderPageTitle, its structured data
 * from its own <Helmet>.
 *
 *   <PageMeta path="/smarter" description={description} image={APP_CONFIG.static.images.share.smarter} />
 *
 * Link previews read the html that the build prerenders (src/prerender/), so
 * these tags must not depend on anything that happens after the page loads.
 */
import { Helmet } from 'react-helmet'

import { APP_CONFIG } from '../shared/constants'
import { pageUrl } from '../shared/pageUrl'

/** A preview image: about 1200x630 and under 300 KB, or WhatsApp shows none. */
export interface ShareImage {
  url: string
  width: number
  height: number
  alt: string
}

interface PageMetaProps {
  /** the page's path, e.g. '/smarter', or '/' for the home page. */
  path: string
  /** the page's description, by default the site's. */
  description?: string
  /** the preview image, by default Lawrence's portrait. */
  image?: ShareImage
}

export default function PageMeta({
  path,
  description,
  image = APP_CONFIG.static.images.share.default,
}: PageMetaProps) {
  const url = pageUrl(path)
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta property="og:image" content={image.url} />
      <meta property="og:image:width" content={String(image.width)} />
      <meta property="og:image:height" content={String(image.height)} />
      <meta property="og:image:alt" content={image.alt} />
      <meta name="twitter:image" content={image.url} />
      <meta name="twitter:image:alt" content={image.alt} />
    </Helmet>
  )
}
