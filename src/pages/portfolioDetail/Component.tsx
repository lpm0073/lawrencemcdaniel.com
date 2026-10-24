import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import Loading from '../../components/Loading'
import ProjectCarousel from './projectCarousel'
import { Helmet } from 'react-helmet'
import PageMeta from '../../components/PageMeta'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { useParams } from 'react-router-dom'
import { decodeEntities, paragraphHtml } from '../../shared/htmlFragments'
import { nameLawrenceMcDaniel } from '../../shared/seo/gsdCommon'
import { usePortfolio } from '../../redux/hooks'
import './styles.css'

/** The JSON object in the first <p> of a portfolio post's content. */
interface PortfolioDetailJson {
  description: string
  images: string[]
}

function toJSON(str: string | null): PortfolioDetailJson | null {
  try {
    // the post has no <p>: reported and returned as null below, as is invalid JSON
    if (str === null) throw new TypeError('no <p> in the post content')

    // remove curly quotes, and the primes that WordPress makes of a quote after a
    // digit, e.g. "Python 3″
    str = str.replace(/[\u2018\u2019\u2032]/g, "'").replace(/[\u201C\u201D\u2033]/g, '"')

    // replace <br> with actual carriage return
    str = str.replace(/<br\s*[/]?>/gi, '\n')
    return JSON.parse(str) as PortfolioDetailJson
  } catch (e) {
    console.log('toJSON() - error:', e)
    return null
  }
}
/**
 * The portfolio project whose slug is in the url (/portfolio/:portfolioId). Its
 * description and image urls are in the post's content.
 */
const PortfolioDetail = () => {
  const { portfolioId } = useParams()
  const portfolio = usePortfolio()
  const post = portfolio.data.find((item) => item.slug === portfolioId)

  /* Google Structured Data */
  const webpageDescription = "Lawrence McDaniel's portfolio."
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [gsdPersonLawrenceMcDaniel]

  if (portfolio.isLoading) {
    return (
      <div className="">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  } else if (portfolio.errMess) {
    return (
      <div className="">
        <div className="row">
          <h4>{portfolio.errMess}</h4>
        </div>
      </div>
    )
  } else if (post != null) {
    const paragraph = paragraphHtml(post.content.rendered)
    const my_json = toJSON(paragraph === null ? null : decodeEntities(paragraph))
    let description: string | null = null
    let urls: string[] = []
    if (my_json != null) {
      description = my_json.description
      urls = my_json.images
    }

    const projectTitle = decodeEntities(post.title.rendered)
    const titleText = nameLawrenceMcDaniel + ' - ' + projectTitle
    const pageDescription = description ?? webpageDescription

    return (
      <React.Fragment>
        <PageMeta path={'/portfolio/' + post.slug} description={pageDescription} />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(
              gsdGraph(
                'portfolio/' + post.slug,
                projectTitle,
                pageDescription,
                primaryImageUrl,
                pageType,
                relatedLink,
                graphExtraData
              )
            )}
          </script>
        </Helmet>
        <div key="portfolio-detail" className="site-page project-page">
          <RenderPageTitle
            theme="light"
            icon="fa-briefcase"
            title="PROJECT"
            boxed_title="Detail"
          />
          {/* after RenderPageTitle, whose title is the same for every project, so that this one wins */}
          <Helmet>
            <title>{titleText}</title>
            <meta property="og:title" content={titleText} />
            <meta name="twitter:title" content={titleText} />
          </Helmet>
          <div className="row">
            <div className="col">
              <h2 className="project-title">{projectTitle}</h2>
              {description}
              <hr />
              <ProjectCarousel images={urls} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  // there is no project with this slug.
  return null
}

export default PortfolioDetail
