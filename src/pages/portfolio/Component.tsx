import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import ProjectsGrid from './projectsGrid'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { Helmet } from 'react-helmet'
import PageMeta from '../../components/PageMeta'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { usePortfolio } from '../../redux/hooks'
import './styles.css'

const Portfolio = () => {
  const portfolio = usePortfolio()

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
      <PageMeta path="/portfolio" description="Lawrence McDaniel - Portfolio" />
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
      <div key="portfolio-page" className="portfolio-page">
        <div className="site-page ">
          <RenderPageTitle
            theme="dark"
            icon="fa-briefcase"
            title="PROJECT"
            boxed_title="PORTFOLIO"
          />
          <div className="p-2">
            <ProjectsGrid projects={portfolio.data} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Portfolio
