import React from 'react'
import { Helmet } from 'react-helmet'

import { nameLawrenceMcDaniel, basePageTitle } from '../shared/seo/gsdCommon'
import { APP_CONFIG } from '../shared/constants'
import { defaultPageDescription, defaultKeywords } from '../shared/seo/gsdGraph'

export default function Head() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{basePageTitle}</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/vnd.microsoft.icon" />

        <link rel="apple-touch-icon" href={APP_CONFIG.urls.site + '/logo192.png'} />
        <link rel="manifest" href="/manifest.json" />

        {/* Generic meta tags */}
        <meta charSet="utf-8" />
        <meta name="author" content={nameLawrenceMcDaniel} />
        {/* no default canonical link: each page names its own (PageMeta.tsx), and the
            404 page has none, rather than one that says it is the home page. */}
        <meta name="description" content={defaultPageDescription()} />
        <meta name="keywords" content={defaultKeywords()} />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />

        {/* Additional SEO and Technical Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Language" content="en-us" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="7 days" />

        {/* Security Headers */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Additional Structured Data */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />

        {/* Mobile App Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={basePageTitle} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={basePageTitle} />

        {/* Microsoft Tiles & Legacy browsers */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Facebook Open Graph Meta Tags */}
        <meta property="og:description" content={defaultPageDescription()} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={basePageTitle} />
        <meta property="og:image" content={APP_CONFIG.static.images.share.default.url} />
        <meta property="og:author" content={nameLawrenceMcDaniel} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={APP_CONFIG.urls.site} />
        <meta property="og:site_name" content={basePageTitle} />
        <meta
          property="og:image:alt"
          content={APP_CONFIG.static.images.share.default.alt}
        />
        <meta
          property="og:image:width"
          content={String(APP_CONFIG.static.images.share.default.width)}
        />
        <meta
          property="og:image:height"
          content={String(APP_CONFIG.static.images.share.default.height)}
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:creator" content="@LorenzoDPolanco" />
        <meta name="twitter:site" content="@LorenzoDPolanco" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="lawrencemcdaniel.com" />
        <meta name="twitter:title" content={basePageTitle} />
        <meta name="twitter:image" content={APP_CONFIG.static.images.share.default.url} />
        <meta name="twitter:description" content={defaultPageDescription()} />
        <meta
          name="twitter:image:alt"
          content={APP_CONFIG.static.images.share.default.alt}
        />
        <meta
          itemProp="image"
          content={APP_CONFIG.urls.cdn + '/lawrencemcdaniel-headshot-square.jpeg'}
        />
      </Helmet>
    </React.Fragment>
  )
}
