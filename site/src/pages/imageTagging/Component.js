import React from 'react'

import { Helmet } from 'react-helmet'

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
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
        <link rel="canonical" href={URL_SITE + '/image-tagging/'} />
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
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="text-justify">
              <div className="mt-1 ms-5 me-0 p-5 text-center drag-drop-zone">
                <div className="mt-5"></div>
                <i className="fa fa-image fa-4x"></i>
                <p className="m-1">Drag & Drop file here</p>
                <p className="m-1 mb-3">or</p>
                <a
                  className="btn btn-secondary btn-lg"
                  role="button"
                  target="_blank"
                  href=""
                  rel="noopener noreferrer"
                >
                  Browse files
                </a>
                <div className="mb-5"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ms-0 me-0 hide-medium">
          <div className="mt-lg-3 meta-tags ms-0 me-0">
            <div className="row">
              <div className="col-lg-4 p-0 meta-tags-column meta-tags-column-objects">
                <div className="text-center meta-tags-objects">
                  <p className="meta-header m-1">Image Meta Objects</p>
                </div>
              </div>
              <div className="col-lg-8 col-md-12 p-0 meta-tags-column meta-tags-column-attributes">
                <div className="text-center meta-tags-attributes">
                  <p className="meta-header m-1">Attributes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ImageTaggerPage
