import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { Content } from '../../components/content/Component'
import TechnologyCarousel from '../../components/technologyCarousel/Component'
import SkillColumn from '../../components/skillColumn/Component'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import {
  gsdSoftwareRepoList,
  gsdSoftwareRepoList_Smarter,
} from '../../shared/seo/gsdSoftwareSourceCode'
import { gsdVideoObjectList_FSWL } from '../../shared/seo/gsdVideoObject'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

/* eslint-disable no-unused-vars */
const CloudComputing = (props) => {
  /* Google Structured Data */
  const slug = 'cloud'
  const webpageName = 'Cloud | Lawrence McDaniel'
  const webpageDescription = 'Cloud Computing'
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [
    gsdPersonLawrenceMcDaniel,
    gsdSoftwareRepoList('full-stack'),
    gsdSoftwareRepoList_Smarter,
    gsdVideoObjectList_FSWL,
  ]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={URL_SITE + '/cloud'} />
        <meta name="description" content="Lawrence McDaniel - Cloud Expert" />
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
      <div key="skills-page" className="site-page skills-page">
        <RenderPageTitle
          theme="light"
          icon="fa-book"
          title="CLOUD"
          boxed_title="COMPUTING"
        />

        <div className="row mt-5 mb-5 ml-0 mr-0 justify-content-center">
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
        </div>

        <TechnologyCarousel specialties={props.specialties} />

        <div className="row mx-5">
          <div className="col">
            <h3 className="ml-auto text-center pl-2 mx-5 mt-5">
              Code Samples & Publications
            </h3>
            <p className="text-center">
              Hire me! I can help you with your next project, more details{' '}
              <a href="/consulting">here</a>.
            </p>
            <Content category="full-stack" />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

CloudComputing.propTypes = {
  specialties: PropTypes.array.isRequired,
}
export default CloudComputing
