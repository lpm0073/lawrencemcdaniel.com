import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { Content } from '../../components/content/Component'
import TechnologyCarousel from '../../components/technologyCarousel/Component'
import SkillColumn from '../../components/skillColumn/Component'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdSoftwareRepoList } from '../../shared/seo/gsdSoftwareSourceCode'
import { gsdVideoObjectList_FSWL } from '../../shared/seo/gsdVideoObject'
import { gsdSkillSchemaList } from '../../shared/seo/gsdSkills'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

/* eslint-disable no-unused-vars */
const Fullstack = (props) => {
  /* Google Structured Data */
  const slug = APP_CONFIG.skills.fullStack
  const webpageName = 'Full Stack Developer | Lawrence McDaniel'
  const webpageDescription = null
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [
    gsdPersonLawrenceMcDaniel,
    gsdSoftwareRepoList(APP_CONFIG.skills.fullStack),
    gsdVideoObjectList_FSWL,
    gsdSkillSchemaList(APP_CONFIG.skills.fullStack),
  ]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={APP_CONFIG.urls.site + '/' + slug} />
        <meta name="description" content="Lawrence McDaniel - Full Stack Developer" />
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
      <main
        key="skills-page"
        className="site-page skills-page"
        aria-label="Full Stack Developer"
      >
        <RenderPageTitle
          theme="light"
          icon="fa-book"
          title="FULL STACK"
          boxed_title="DEVELOPER"
        />

        <section
          className="row mt-5 mb-5 ml-0 mr-0 justify-content-center"
          aria-label="Skills"
        >
          <SkillColumn
            key="3"
            id="3"
            pct="100"
            title="Frontend"
            icon="fa-html5"
            description="Proficient in HTML, CSS, and JavaScript frameworks including React and Angular."
          />
          <SkillColumn
            key="4"
            id="4"
            pct="100"
            title="Backend"
            icon="fa-server"
            description="Experienced in AWS, Azure, Terraform, Python, Django, Pandas, NumPy, Scikit-learn, and more."
          />
          <SkillColumn
            key="5"
            id="5"
            pct="100"
            title="Database"
            icon="fa-database"
            description="MySQL, MongoDB, Redis, Elasticsearch, and wrangling dirty data with Python."
          />
          <SkillColumn
            key="6"
            id="6"
            pct="100"
            title="DevOps"
            icon="fa-gears"
            description="Experience with Docker, Kubernetes, CI/CD pipelines, and cloud services."
          />
          <SkillColumn
            key="1"
            id="1"
            pct="100"
            title="APIs"
            icon="fa-plug"
            description="Django REST Framework, AWS Api Gateway, GraphQL, and integrating third-party services."
          />
        </section>

        <TechnologyCarousel
          specialties={props.specialties}
          skill={APP_CONFIG.skills.fullStack}
        />

        <section className="row mx-5" aria-label="Code Samples & Publications">
          <div className="col">
            <h3 className="ml-auto text-center pl-2 mx-5 mt-5">
              Code Samples & Publications
            </h3>
            <p className="text-center">
              Hire me! I can help you with your next project, more details{' '}
              <a href="/consulting">here</a>.
            </p>
            <Content skill={APP_CONFIG.skills.fullStack} />
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}

Fullstack.propTypes = {
  specialties: PropTypes.array.isRequired,
}
export default Fullstack
