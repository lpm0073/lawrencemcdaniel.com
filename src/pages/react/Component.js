import React from 'react'

import { Content } from '../../components/content/Component'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import BlankSpace from '../../components/blankSpace/Component'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdSkillSchemaList } from '../../shared/seo/gsdSkills'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdArticle } from '../../shared/seo/gsdArticle'
import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
const ReactPage = (props) => {
  /* Google Structured Data */
  const slug = 'reactjs'
  const webpageName = 'ReactJS'
  const webpageDescription = ''
  const primaryImageUrl =
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/19131001/aws-react-hosting.png'
  const pageType = ''
  const relatedLink = ''
  const person = {
    ...gsdPersonLawrenceMcDaniel,
    ...{ hasOccupation: hasOccupation },
  }
  const graphExtraData = [
    person,
    gsdArticle(slug, webpageDescription),
    gsdSkillSchemaList(APP_CONFIG.skills.react),
  ]

  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="canonical"
          href={APP_CONFIG.urls.site + '/' + APP_CONFIG.skills.react}
        />
        <meta
          name="description"
          content="Full Stack Web Developer with extensive experience using ReactJS and Redux. Follow links to the GitHub repository for this site."
        />
        <meta
          property="og:description"
          content="Full Stack Web Developer with extensive experience using ReactJS and Redux. Follow links to the GitHub repository for this site."
        />
        <script type="application/ld+json">
          {JSON.stringify(
            gsdGraph(
              slug,
              webpageName,
              webpageDescription,
              primaryImageUrl,
              pageType,
              relatedLink,
              graphExtraData
            )
          )}
        </script>
      </Helmet>
      <main key="react-page" className="site-page react-page" aria-label="ReactJS Page">
        <RenderPageTitle
          theme="light"
          icon="fa-react"
          title="BUILT WITH"
          boxed_title="REACTJS"
        />
        <div className="row mt-lg-5 pl-2">
          <aside className="col-lg-3 hide-medium" aria-label="LinkedIn Badge">
            <div className="text-center">
              <LinkedinBadge />
              <a
                className="mt-4 btn btn-danger"
                role="button"
                target="_blank"
                href={APP_CONFIG.urls.resume}
                rel="noopener noreferrer"
              >
                <i className="fa fa-download"></i> Download Resume
              </a>
            </div>
          </aside>
          <section className="col-lg-8 col-md-12" aria-label="ReactJS Page Content">
            <div className="text-justify">
              <p className="">
                This site uses a<BlankSpace />
                <a
                  href="https://github.com/lpm0073/lawrencemcdaniel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ReactJS/Redux
                </a>
                <BlankSpace />
                front end and a backend powered by a<BlankSpace />
                <a
                  href="https://api.lawrencemcdaniel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wordpress REST api
                </a>
                . I originally built this site in 2016 with Wordpress when I was first
                getting started with web development. I liked the appearance of the
                original site, so the new React version is nearly identical. I developed
                the current ReactJS version in mid-2020 immediately after taking an online
                <BlankSpace />
                <a
                  href="https://www.coursera.org/learn/front-end-react/home/welcome"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ReactJS course
                </a>
                <BlankSpace />
                on Coursera.com. This site was my first foray into creating a fully-blown
                ReactJS/Redux web application.
              </p>
              <div className="">
                <hr />
                <p>
                  I like ReactJS. I've been working with Angular since 2018 and by
                  comparison I find React more intuitive and more performant.
                  Additionally, the ReactJS community is large and growing, which results
                  in more searchable online help content and more and better tooling.
                </p>
                <hr />
              </div>
              <p>
                <span className="react-page-leader">Front End</span>: The front end stack
                is
                <BlankSpace />
                <a href="https://react.org/" target="_blank" rel="noopener noreferrer">
                  ReactJS/Redux
                </a>
                ,<BlankSpace />
                <a
                  href="https://getbootstrap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bootstrap
                </a>
                <BlankSpace />
                and minimal custom JS and CSS. The graphics all come from the free version
                of
                <BlankSpace />
                <a
                  href="https://fontawesome.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Font Awesome
                </a>
                . This was intentional. The original Wordpress version used a
                professionally-designed third-party theme, and I wanted to see if I could
                duplicate it using open source tools. I encountered a variety of design
                and technical challenges with the home page, which you can read more about
                in this blog post,
                <BlankSpace />
                <a
                  href="https://blog.lawrencemcdaniel.com/animations-in-reactjs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Animations in ReactJS
                </a>
                .
              </p>
              <p>
                Source code:
                <BlankSpace />
                <a
                  href="https://github.com/lpm0073/lawrencemcdaniel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/lpm0073/lawrencemcdaniel.com
                </a>
              </p>
              <p>
                I designed and coded the logo cube animation on the home page and then
                later wrote
                <BlankSpace />
                <a
                  href="https://blog.lawrencemcdaniel.com/animations-in-reactjs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this blog article
                </a>
                <BlankSpace />
                that discusses my design considerations and some of the unique challenges
                I encountered along the way, and their solutions.
              </p>
              <p>
                <span className="react-page-leader">Back End</span>: The back end is a
                Wordpress REST api and the AWS Cloudfront content delivery network.
                Wordpress is a great back end solution, though oddly, I never read nor
                hear much about this. I manage a medium-sized Wordpress hosting platform
                for my clients so this obviously impacts my decision. This site mostly
                needs back-end support to provide image assets. Currently, there are
                around 500 images on this site which are all ultimately served by AWS
                Cloudfront CDN. I like Wordpress because there's a lot of important
                minutia like backups, security, permissions, data backups etcetera that
                Wordpress takes care of out of the box. I use some premium Wordpress
                plugins to help with image optimization and CDN synchronization which make
                adding new images pretty painless. The wordpress site is behind a Varnish
                cache which means that in practice, everything is served instantaneously
                by a proxy server, so its really fast. Lastly, the Wordpress REST api is
                robust (and free).
              </p>
              <p>
                Backend API URL:
                <BlankSpace />
                <a
                  href="https://api.lawrencemcdaniel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://api.lawrencemcdaniel.com/
                </a>
              </p>

              <p>
                <span className="react-page-leader">Progressive Web App (PWA)</span>: This
                site is fully-functional and performant regardless of Internet quality,
                even if there's no Internet service at all. It's observably performant
                because all of the site assets are precached and served locally. It's more
                resilient because it works fine even with sparse or non-existent Internet
                service.
              </p>
              <p>
                Part of this is made possible simply because the World Wide Web Consortium
                implemented a set of standards for implementing a local browser
                javascript-based
                <BlankSpace />
                <a
                  href="https://developers.google.com/web/fundamentals/primers/service-workers"
                  target="_blank"
                  rel="noreferrer"
                >
                  service worker
                </a>
                . A service worker is a script that your browser runs in the background,
                separate from a web page, opening the door to features that don't need a
                web page or user interaction. They manage the client side of synchronizing
                web apps; topics like precaching, runtime caching, request routing, and
                background code and static asset synronization. I'm using
                <BlankSpace />
                <a
                  href="https://developers.google.com/web/tools/workbox"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Workbox
                </a>
                , a library that bakes in a set of best practices and removes all of the
                heavy lifting involved in working with service workers.
              </p>

              <p>
                In my case converting my standard React app into a PWA involved
                modifying/creating the following:
              </p>
              <ul>
                <li>
                  <a
                    href="https://github.com/lpm0073/lawrencemcdaniel.com/blob/master/site/src/index.js"
                    target="_blank"
                    rel="noreferrer"
                  >
                    index.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/lpm0073/lawrencemcdaniel.com/blob/master/site/src/App.js"
                    target="_blank"
                    rel="noreferrer"
                  >
                    App.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/lpm0073/lawrencemcdaniel.com/blob/master/site/src/service-worker.js"
                    target="_blank"
                    rel="noreferrer"
                  >
                    service-worker.js - scaffolded with create-react-app.
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/lpm0073/lawrencemcdaniel.com/blob/master/site/src/serviceWorkerRegistration.js"
                    target="_blank"
                    rel="noreferrer"
                  >
                    serviceWorkerRegistration.js - Google Workbox wrapper
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/lpm0073/lawrencemcdaniel.com/tree/master/site/src/components/appUpdate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    custom appUpdate component: for automatic update alerts.
                  </a>
                </li>
              </ul>

              <p>
                <span className="react-page-leader">Infrastructure</span>: This site runs
                on AWS primarily because I had existing multi-tenant infrastructure there
                that I could leverage for this site (see diagram below). But that aside,
                there are a couple of things about AWS that are hard to beat for small
                projects. First, S3/Cloudfront are effectively zero cost, and they are
                super resilient and performant. And second, AWS offers Lambda as an
                alternative to a standalone Linux server, which will save you tons of
                money if you're on a limited budget.
              </p>
              <p>
                CDN:
                <BlankSpace />
                <a
                  href="https://cdn.lawrencemcdaniel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://cdn.lawrencemcdaniel.com/
                </a>
              </p>
            </div>
          </section>
        </div>
        <div
          className="aws-diagram hide-medium row mt-lg-5 pl-2 ml-0 mr-0"
          aria-label="AWS React Hosting Architecture"
        >
          <img
            src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/19131001/aws-react-hosting.png"
            alt="AWS React Hosting Architecture"
          />
        </div>
        <div className="row mt-lg-5 pl-2" aria-label="Code Samples & Publications">
          <div className="col-lg-12">
            <h3 className="ml-auto text-center pl-2 mx-5">Code Samples & Publications</h3>
            <Content skill={APP_CONFIG.skills.react} />
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default ReactPage
