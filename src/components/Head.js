import React from 'react'
import { Helmet } from 'react-helmet'

import { nameLawrenceMcDaniel, basePageTitle } from '../shared/seo/gsdCommon'
import { URL_SITE, URL_CDN, DEFAULT_IMAGE } from '../shared/constants'
import { defaultPageDescription } from '../shared/seo/gsdGraph'

/* eslint-disable no-unused-vars */
export default function Head(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{basePageTitle}</title>
        <meta name="author" content={nameLawrenceMcDaniel} />
        <link rel="canonical" href={URL_SITE + '/'} />
        <meta name="description" content={defaultPageDescription()} />
        <meta
          name="keywords"
          content="Lawrence McDaniel, data scientist, open edx consultant, full stack developer, Cloud computing consultant, Python, ReactJS, Terraform, AWS, Azure, Kubernetes, digital content creator"
        />
        <link rel="shortcut icon" href="/favicon.jpg" type="image/vnd.microsoft.icon" />

        <link rel="apple-touch-icon" href={URL_SITE + '/logo192.png'} />
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#f1f1f1" />

        <meta
          property="og:description"
          content="Lawrence McDaniel is a data scientist, full stack developer, digital content creator, and Open edX® Consultant specializing in Python, ReactJS, Terraform, AWS, Azure, and Kubernetes."
        />
        <meta property="og:title" content={basePageTitle} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
        <meta property="og:author" content={nameLawrenceMcDaniel} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL_SITE} />
        <meta property="og:site_name" content={basePageTitle} />
        <meta property="og:image:alt" content="Lawrence McDaniel Banner" />
        <meta property="og:image:width" content="1849" />
        <meta property="og:image:height" content="1848" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LorenzoDPolanco" />
        <meta name="twitter:domain" content="lawrencemcdaniel.com" />
        <meta name="twitter:title" content={basePageTitle} />
        <meta
          name="twitter:image"
          content={URL_CDN + '/lawrencemcdaniel-headshot-square.jpeg'}
        />
        <meta name="twitter:description" content={basePageTitle} />
        <meta name="twitter:image:alt" content="Lawrence McDaniel headshot" />
        <meta
          itemProp="image"
          content={URL_CDN + '/lawrencemcdaniel-headshot-square.jpeg'}
        />
      </Helmet>
    </React.Fragment>
  )
}
