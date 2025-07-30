import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import CoursesGrid from './coursesGrid'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

const Education = (props) => {
  /* Google Structured Data */
  const person = {
    ...gsdPersonLawrenceMcDaniel,
    ...{ hasOccupation: hasOccupation },
  }
  const slug = 'education'
  const webpageName = 'Education'
  const webpageDescription =
    'Lawrence McDaniel educational background and courses completed.'
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [person]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={URL_SITE + '/education'} />
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
      <div key="education-page" className="portfolio-page">
        <div className="site-page ">
          <RenderPageTitle
            theme="dark"
            icon="fa-graduation-cap"
            title="ADVANCED"
            boxed_title="TRAINING"
          />
          <CoursesGrid education={props.education} />
        </div>
      </div>
    </React.Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Education
