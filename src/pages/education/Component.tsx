import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import CoursesGrid from './coursesGrid'
import { Helmet } from 'react-helmet'
import PageMeta from '../../components/PageMeta'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdQualifications } from '../../shared/seo/gsdQualifications'
import { useEducation } from '../../redux/hooks'

import { gsdGraph, type JsonLd } from '../../shared/seo/gsdGraph'
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
      <PageMeta path="/education" description="Lawrence McDaniel - Education" />
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
