import React from 'react'

import { Helmet } from 'react-helmet'
import PageMeta from '../../components/PageMeta'

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdArticle } from '../../shared/seo/gsdArticle'
import './styles.css'

const ImageTaggerPage = () => {
  /* Google Structured Data */
  const slug = 'image-tagging'
  const webpageName = 'ImageTagging'
  const webpageDescription =
    'Lawrence McDaniel - Image tagging, an experiment in listing the objects and attributes in a photo.'
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [gsdPersonLawrenceMcDaniel, gsdArticle(slug, webpageDescription)]

  return (
    <React.Fragment>
      <PageMeta path="/image-tagging" description={webpageDescription} />
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
      <div key="image-tagging-page" className="site-page image-tagging-page">
        <RenderPageTitle
          theme="light"
          icon="fa-tags"
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
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
