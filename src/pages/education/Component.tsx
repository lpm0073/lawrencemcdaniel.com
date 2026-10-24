import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import CoursesGrid from './coursesGrid'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdQualifications } from '../../shared/seo/gsdQualifications'
import { useEducation } from '../../redux/hooks'

import { gsdGraph, type JsonLd } from '../../shared/seo/gsdGraph'
import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

const Education = () => {
  const education = useEducation()

  /* Google Structured Data */
  const person = !education.isLoading
    ? {
        ...gsdPersonLawrenceMcDaniel,
        hasOccupation: {
          ...hasOccupation,
          qualifications: gsdQualifications(education.data),
        },
      }
    : null
  const slug = 'education'
  const webpageName = 'Education'
  const webpageDescription = '' // gsdGraph() uses its default description
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData: JsonLd[] = person ? [person] : []

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
          <CoursesGrid />
        </div>
      </main>
    </React.Fragment>
  )
}

export default Education
