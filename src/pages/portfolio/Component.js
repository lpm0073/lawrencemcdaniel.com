import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import ProjectsGrid from './projectsGrid'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

const Portfolio = (props) => {
  /* Google Structured Data */
  const slug = 'portfolio'
  const webpageName = 'Portfolio'
  const webpageDescription = "Lawrence McDaniel's portfolio."
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [gsdPersonLawrenceMcDaniel]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={URL_SITE + '/portfolio/'} />
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
      <div key="portfolio-page" className="portfolio-page">
        <div className="site-page ">
          <RenderPageTitle
            theme="dark"
            icon="fa-briefcase"
            title="PROJECT"
            boxed_title="PORTFOLIO"
          />
          <div className="p-2">
            <ProjectsGrid portfolio={props.portfolio} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Portfolio.propTypes = {
  portfolio: PropTypes.array.isRequired,
}

export default Portfolio
