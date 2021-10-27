import React from 'react';
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";

import { nameLawrenceMcDaniel, basePageTitle } from '../shared/seo/gsdCommon';
import { URL_SITE, URL_CDN } from '../shared/urls';


export default function Head(props) {

    return ( 
      <React.Fragment>
          <Online><link rel="shortcut icon" href="/favicon.jpg" type="image/vnd.microsoft.icon"/></Online>
          <Offline><link rel="shortcut icon" href="/favicon-offline.jpg" type="image/vnd.microsoft.icon"/></Offline>
          <Helmet>
            <title>{basePageTitle}</title>
            <meta name="author" content={nameLawrenceMcDaniel} />
            <link rel="canonical" href={URL_SITE + "/"} />
            <meta name="description" content="Full Stack Web Developer and Open edX® Consultant specializing in Python, Django, ReactJS, Redux, AngularJS, and AWS." />
            <meta name="keywords"  content="Lawrence McDaniel, open edx consultant, open edx service provider, Open edX, web developer, freelancer, full stack developer, full stack web developer, web developer, Python, Django, React, ReactJS, Redux, Wordpress, AWS, Boto3, Angular, AngularJS" />

            <link rel="apple-touch-icon" href={URL_SITE + "/logo192.png"} />
            <link rel="manifest" href="/manifest.json" />

            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta name="theme-color" content="#f1f1f1" />

            <meta property="og:description" content="Freelance full stack web developer and Open edX® Consultant specializing in Python, Django, ReactJS, Redux, AngularJS, Wordpress, and AWS." />
            <meta property="og:title" content={basePageTitle} />
            <meta property="og:author" content={nameLawrenceMcDaniel} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={URL_SITE} />
            <meta property="og:site_name" content={basePageTitle} />
            <meta property="og:image" content={URL_CDN + "/social-1200x630.jpg"}  />
            <meta property="og:image:alt" content="Lawrence McDaniel Banner" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@LorenzoDPolanco" />
            <meta name="twitter:domain" content="lawrencemcdaniel.com" />
            <meta name="twitter:title" content={basePageTitle} />
            <meta name="twitter:image" content={ URL_CDN + "/social-1200x675.jpg"} />
            <meta name="twitter:description" content={basePageTitle} />
            <meta itemprop="image" content={URL_CDN + "/social-1200x630.jpg"} />
          </Helmet>
      </React.Fragment>

    );
}

