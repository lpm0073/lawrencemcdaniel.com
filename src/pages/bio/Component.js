import React from 'react'

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import BlankSpace from '../../components/blankSpace/Component'
import { Helmet } from 'react-helmet'

import { APP_CONFIG } from '../../shared/constants'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'

import './styles.css'

/* eslint-disable no-unused-vars */
const Bio = (props) => {
  /* Google Structured Data */
  const slug = 'bio'
  const webpageName = 'Bio'
  const webpageDescription = `Lawrence McDaniel is a data scientist, full-stack developer, and digital
  content creator who has lived in Mexico City since 2000. Born in Houston, Texas, and raised in
  northeast Texas, he graduated from Wills Point High School in 1985 and earned a BS in computer
  science and mathematics, with minors in physics and English, from the University of
  North Texas in 1991. Over his career, Lawrence was an early employee at three startups later
  acquired by Goldman Sachs, IBM, and Deutsche Bank, and he participated in a successful
  NASDAQ IPO. In 2004, he developed a profitable black-box trading system for one of the
  world’s largest long-short hedge funds, retiring from the industry in 2005. Today, Lawrence
  advises organizations on cloud computing, machine learning, and artificial intelligence,
  and teaches remotely at the University of British Columbia.`
  const primaryImageUrl = APP_CONFIG.static.images.default
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [{ ...gsdPersonLawrenceMcDaniel }]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={APP_CONFIG.urls.site + '/bio'} />
        <meta name="description" content="Lawrence McDaniel - Bio" />
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
      <div key="bio-page" className="site-page bio-page">
        <RenderPageTitle
          theme="light"
          icon="fa-align-left"
          title="FULL"
          boxed_title="BIO"
        />
        <div className="row mt-5">
          <div className="col-lg-3 hide-medium">
            <div className="ml-auto text-center pl-2">
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
          </div>
          <div className="col-lg-8 col-md-12 ml-5">
            <div className="text-justify">
              <p>{webpageDescription}</p>
              <p>
                He specializes in data science, financial modeling, analytics, machine
                learning, artificial intelligence, database technologies, and
                containerized workload orchestration on Amazon Web Services (AWS) and
                Microsoft Azure. His work includes architecting resilient, low-latency
                database systems for mission-critical workloads and engineering cloud
                platforms that scale to meet global demand.
              </p>
              <p>
                Lawrence is an angel investor, entrepreneur and company mentor with nearly
                25 years of international experience with an emphasis on technology and
                US-Mexico trade. He has extensive startup, fund raising, business
                development and M&amp;A experience with alternative investment and
                disruptive FinTech, edTech and IoT ventures. He has mentored at
                <BlankSpace />
                <a href="https://www.startupmexico.com/">Startup Mexico</a> and
                <BlankSpace />
                <a href="https://angelventures.vc/">Angel Ventures</a> in Mexico City, and
                sat on the boards of <a href="https://edmex.org/">edMex</a> and
                <BlankSpace />
                <a href="https://m-arca.org/">M-Arca</a> Foundation.
              </p>
              <p>
                <strong>But he’s no stranger to real work either!</strong> his family
                built the house where he grew up in rural northeast Texas, raised their
                own livestock, and farmed their own crops. He paid his way through college
                by working for six years during and after high school in various jobs as a
                printer, cattle hand, carpenter, roofer, sheet rocker, painter, glazier,
                welder, lumber yard worker, forklift mechanic, truck loader, landscaper
                and gardener, hot tub installer, janitor, grocery shelf stocker, carpet
                &amp; commercial floor cleaner, dishwasher, waiter, and cook. During
                college he worked as a cafeteria food server, a tutor in the university
                math lab, a calculus paper grader and substitute lecturer for the math
                department and as a lab assistant for the physics department. Immediately
                after graduating college he helped launch one the first indoor rock
                climbing gyms,
                <BlankSpace />
                <a
                  href="https://www.summitgyms.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Exposure Indoor Rock Climbing
                </a>
                <BlankSpace />
                gym in Carrollton, Texas, while simultaneously covering progress of NAFTA
                negotiations for a Dallas-based family office.
              </p>
              <p>
                Lawrence is fully English/Spanish bilingual and available to travel
                throughout all of North America.
              </p>
              <hr />
            </div>
            <div className="text-center">
              <p className="mt-4">
                If you would like to discuss a project or collaboration, please reach out.
              </p>
              <a
                className="mt-4 btn btn-danger"
                role="button"
                target="_self"
                href="/contact"
              >
                <i className="fa fa-phone"></i> Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Bio
