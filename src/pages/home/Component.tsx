import React from 'react'

import LogoCube from '../../components/logocube/Component'
import Programmer from './Programmer'
import DataScientist from './DataScientist'
import Consultant from './Consultant'
import Photographer from './Photographer'
import OnlineInstructor from './Instructor'
import Smarter from './Smarter'
import FullStackWithLawrence from './FullStackWithLawrence'
import JobTitle from './JobTitle'
import RoleTyper from './RoleTyper'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { basePageTitle } from '../../shared/seo/gsdCommon'
import { Helmet } from 'react-helmet'
import PageMeta from '../../components/PageMeta'
import { APP_CONFIG } from '../../shared/constants'

import './styles.css'

export default function Home() {
  /* Google Structured Data */
  const person = {
    ...gsdPersonLawrenceMcDaniel,
    ...{ hasOccupation: hasOccupation },
  }
  const slug = ''
  const webpageName = basePageTitle
  const webpageDescription = '' // gsdGraph() uses its default description
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [person]

  return (
    <React.Fragment>
      <PageMeta path="/" />
      <Helmet>
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
      <main key="home-page" className="home-page" role="main">
        <div className="home-hero">
          <section className="home-intro noselect" aria-label="Profile">
            <img
              src={APP_CONFIG.static.images.default}
              alt="Lawrence McDaniel headshot"
              className="home-headshot"
              width={96}
              height={96}
            />
            <h1 className="home-name">Lawrence McDaniel</h1>
            <RoleTyper />
            <p className="home-lead">
              I build open source AI software, and I teach cloud computing and AI at the
              University of British Columbia.
            </p>
            <div className="home-actions">
              <a className="btn btn-primary home-cta" href="/contact">
                Work with me
              </a>
              <a className="btn btn-secondary home-cta-quiet" href="/smarter">
                The Smarter Project
              </a>
            </div>
          </section>
          <section className="home-cube" aria-label="Logo Cube">
            <LogoCube />
          </section>
        </div>
        <section id="job-titles" className="home-links" aria-label="Titles">
          <Smarter />
          <OnlineInstructor />
          <FullStackWithLawrence />
          <Programmer />
          <Consultant />
          <DataScientist />
          <Photographer />
          <JobTitle
            idx="4"
            target="_blank"
            href={APP_CONFIG.urls.blog}
            title="✍️ Blogger"
          />
        </section>
      </main>
    </React.Fragment>
  )
}
