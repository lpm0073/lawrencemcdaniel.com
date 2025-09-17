import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import CoursesGrid from './coursesGrid'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdQualifications } from '../../shared/seo/gsdQualifications.js'

import { gsdGraph } from '../../shared/seo/gsdGraph'
import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

const Education = (props) => {
  /* Google Structured Data */
  const person = !props.education.isLoading
    ? {
        ...gsdPersonLawrenceMcDaniel,
        hasOccupation: {
          ...hasOccupation,
          qualifications: gsdQualifications(props.education.courses),
        },
      }
    : null
  const slug = 'education'
  const webpageName = 'Education'
  const webpageDescription = null
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = !props.education.isLoading ? [person] : []

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={APP_CONFIG.urls.site + '/education'} />
        <meta name="description" content="Lawrence McDaniel - Education" />
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
      <main key="education-page" className="portfolio-page" aria-label="Education">
        <div className="site-page ">
          <RenderPageTitle
            theme="dark"
            icon="fa-graduation-cap"
            title="ADVANCED"
            boxed_title="TRAINING"
          />
          <CoursesGrid education={props.education} />
        </div>
      </main>
    </React.Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Education
