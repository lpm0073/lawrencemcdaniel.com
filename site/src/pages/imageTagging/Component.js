import React from 'react'

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import { Helmet } from 'react-helmet'
import { resumeUrl } from '../../shared/constants'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdArticle } from '../../shared/seo/gsdArticle'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

const ImageTaggerPage = (props) => {
  /* Google Structured Data */
  const slug = 'image-tagging'
  const webpageName = 'ImageTagging'
  const webpageDescription = ''
  const primaryImageUrl =
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/19131001/aws-react-hosting.png'
  const pageType = 'BlogPosting'
  const relatedLink = ''
  const graphExtraData = [gsdPersonLawrenceMcDaniel, gsdArticle(slug, webpageDescription)]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={URL_SITE + '/reactjs/'} />
        <meta
          name="description"
          content="Full Stack Web Developer with extensive experience using ReactJS and Redux. Follow links to the GitHub repository for this site."
        />
        <meta
          property="og:description"
          content="Full Stack Web Developer with extensive experience using ReactJS and Redux. Follow links to the GitHub repository for this site."
        />
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
      <div key="image-tagging-page" className="site-page image-tagging-page">
        <RenderPageTitle
          theme="light"
          icon="fa-react"
          title="IMAGE"
          boxed_title="TAGGING"
        />
        <div className="row mt-lg-5 pl-2">
          <div className="col-lg-3 hide-medium">
            <div className="text-center">
              <LinkedinBadge />
              <a
                className="mt-4 btn btn-danger"
                role="button"
                target="_blank"
                href={resumeUrl}
                rel="noopener noreferrer"
              >
                <i className="fa fa-download"></i> Download Resume
              </a>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="text-justify">
              <p className="">Hi mom!</p>
            </div>
          </div>
        </div>
        <div className="aws-diagram hide-medium row mt-lg-5 pl-2 ml-0 mr-0">
          <p>Hello world</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ImageTaggerPage
