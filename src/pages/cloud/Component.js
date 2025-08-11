import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { Content } from '../../components/content/Component'
import TechnologyCarousel from '../../components/technologyCarousel/Component'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdSoftwareRepoList } from '../../shared/seo/gsdSoftwareSourceCode'
import { gsdVideoObjectList_FSWL } from '../../shared/seo/gsdVideoObject'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { APP_CONFIG } from '../../shared/constants'
import './styles.css'

/* eslint-disable no-unused-vars */
const CloudComputing = (props) => {
  /* Google Structured Data */
  const slug = 'cloud'
  const webpageName = 'Cloud | Lawrence McDaniel'
  const webpageDescription = 'Cloud Computing'
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [
    gsdPersonLawrenceMcDaniel,
    gsdSoftwareRepoList(APP_CONFIG.skills.fullStack),
    gsdVideoObjectList_FSWL,
  ]

  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="canonical"
          href={APP_CONFIG.urls.site + '/' + APP_CONFIG.skills.cloud}
        />
        <meta name="description" content="Lawrence McDaniel - Cloud Expert" />
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
      <div key="skills-page" className="site-page skills-page">
        <RenderPageTitle
          theme="light"
          icon="fa-book"
          title="CLOUD"
          boxed_title="COMPUTING"
        />

        <div className="row mx-5">
          <div className="col">
            <p className="text-justified">
              I help IT teams maximize the value of cloud-native technologies by designing
              and delivering vendor-agnostic infrastructure that is secure, scalable, and
              resilient. As an expert Terraform developer, I build complete solutions from
              the network layer up, leveraging Kubernetes and a broad range of
              cloud-native tools. My database expertise spans relational, NoSQL, and
              in-memory systems, ensuring the right fit for any workload. I also design
              and manage machine learning and AI pipelines on leading cloud platforms,
              using frameworks like TensorFlow, PyTorch, and Kubeflow, as well as
              integrated solutions such as SageMaker and Azure ML Studio, to create
              scalable, efficient, and production-ready ML workflows.
            </p>
          </div>
        </div>
        <TechnologyCarousel
          specialties={props.specialties}
          skill={APP_CONFIG.skills.cloud}
        />

        <div className="row mx-5">
          <div className="col">
            <h3 className="ml-auto text-center pl-2 mx-5 mt-5">
              Code Samples & Publications
            </h3>
            <p className="text-center">
              Hire me! I can help you with your next project, more details{' '}
              <a href="/consulting">here</a>.
            </p>
            <Content skill={APP_CONFIG.skills.cloud} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

CloudComputing.propTypes = {
  specialties: PropTypes.array.isRequired,
}
export default CloudComputing
