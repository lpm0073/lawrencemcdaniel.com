import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import Loading from '../../components/Loading'
import ProjectCarousel from './projectCarousel'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { APP_CONFIG } from '../../shared/constants'
import { useParams } from 'react-router-dom'
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

    // remove curly quotes
    str = str.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')

    // replace <br> with actual carriage return
    str = str.replace(/<br\s*[/]?>/gi, '\n')
    return JSON.parse(str) as PortfolioDetailJson
  } catch (e) {
    console.log('toJSON() - error:', e)
    return null
  }
}
function innerHTML(selector: Element | null) {
  if (selector) {
    return selector.innerHTML
  }
  return null
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
  const slug = 'portfolio'
  const webpageName = 'Portfolio'
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
    const parser = new DOMParser()
    const doc = parser.parseFromString(post.content.rendered, 'text/html')
    const raw = innerHTML(doc.querySelector('p'))

    const my_json = toJSON(raw)
    let description: string | null = null
    let urls: string[] = []
    if (my_json != null) {
      description = my_json.description
      urls = my_json.images
    }

    return (
      <React.Fragment>
        <Helmet>
          <link rel="canonical" href={APP_CONFIG.urls.site + '/portfolio/'} />
          <meta name="description" content="Lawrence McDaniel - Portfolio" />
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
        <div key="portfolio-detail" className="site-page project-page">
          <RenderPageTitle
            theme="light"
            icon="fa-briefcase"
            title="PROJECT"
            boxed_title="Detail"
          />
          <div className="row">
            <div className="col">
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
