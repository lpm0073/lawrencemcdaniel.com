import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import Loading from '../../components/Loading'
import ProjectCarousel from './projectCarousel'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

const PortfolioDetail = (props) => {
  /* Google Structured Data */
  const slug = 'portfolio'
  const webpageName = 'Portfolio'
  const webpageDescription = "Lawrence McDaniel's portfolio."
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [gsdPersonLawrenceMcDaniel]

  if (props.postLoading) {
    return (
      <div className="">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  } else if (props.postErrMess) {
    return (
      <div className="">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  } else if (props.post != null) {
    function innerHTML(selector) {
      if (selector) {
        return selector.innerHTML
      }
      return null
    }

    function toJSON(str) {
      try {
        // remove curly quotes
        str = str.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')

        // replace <br> with actual carriage return
        str = str.replace(/<br\s*[\/]?>/gi, '\n')
        return JSON.parse(str)
      } catch (e) {
        console.log('toJSON() - error:', e)
        return null
      }
    }

    var parser = new DOMParser()
    var doc = parser.parseFromString(props.post.content.rendered, 'text/html')
    var raw = innerHTML(doc.querySelector('p'))

    var my_json = toJSON(raw)
    var description = null
    var urls = []
    if (my_json != null) {
      description = my_json.description
      urls = my_json.images
    }

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
}

export default PortfolioDetail
