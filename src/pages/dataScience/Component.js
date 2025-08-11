import React from 'react'
import PropTypes from 'prop-types'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import SpecialtiesBanner from './datascienceBanner'
import WhartonCertificate from './WhartonCertificate'
import TechnologyCarousel from '../../components/technologyCarousel/Component'
import { Content } from '../../components/content/Component'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdArticle } from '../../shared/seo/gsdArticle'
import { gsdSoftwareRepoList } from '../../shared/seo/gsdSoftwareSourceCode'
import { gsdVideoObjectList_FSWL } from '../../shared/seo/gsdVideoObject'
import { baseTitle } from '../../shared/seo/gsdCommon'
import { APP_CONFIG } from '../../shared/constants'
import BlankSpace from '../../components/blankSpace/Component'

import './styles.css'

/* eslint-disable no-unused-vars */
const Datascience = (props) => {
  /* Google Structured Data */
  const slug = 'data-science'
  const webpageName = 'Data Science'
  const webpageDescription =
    'Data science, machine learning, and AI algorithms expert with experience using regression, neural networks, support vector machines, anomaly detection, recommender systems, and unsupervised learning'
  const primaryImageUrl =
    'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220349/data-science-certificate.jpg'
  const pageType = ''
  const relatedLink = ''
  const person = {
    ...gsdPersonLawrenceMcDaniel,
    ...{ hasOccupation: hasOccupation },
  }
  const graphExtraData = [
    person,
    gsdArticle(slug, webpageName),
    gsdSoftwareRepoList('data-science'),
    gsdVideoObjectList_FSWL,
  ]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={APP_CONFIG.urls.site + '/data-science'} />
        <meta
          name="description"
          content="Data Scientist - Machine learning and algorithms expert with experience using regression, neural networks, support vector machines, anomaly detection, recommender systems, and unsupervised learning"
        />
        <meta
          property="og:description"
          content="Data Scientist - Machine learning and algorithms expert with experience using regression, neural networks, support vector machines, anomaly detection, recommender systems, and unsupervised learning"
        />
        <meta
          name="keywords"
          content="Lawrence McDaniel, machine learning, algorithms, regression, neural networks, support vector machines, anomaly detection, recommender systems, unsupervised learning"
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
      <div key="data-science-page" className="site-page data-science-page">
        <RenderPageTitle
          theme="light"
          icon="fa-magic"
          title="DATA"
          boxed_title="SCIENCE"
        />
        <div className="row mt-5 pl-2">
          <div className="column-left col-lg-4 col-md-6 col-sm-12 hide-medium">
            <a href="https://www.linkedin.com/in/lawrencemcdaniel/">
              <img
                src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220017/lawrence-mcdaniel-portrait.jpg"
                alt="Lawrence McDaniel"
              />
            </a>
            <div className="name-block mt-1 text-center">
              <h4 className="my-0">Lawrence McDaniel</h4>
              <h5 className="my-0">{baseTitle}</h5>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 m-0 p-0">
            <div className="row ml-0 mr-0 pr-2">
              <div className="col-lg-6 col-md-12">
                <div>
                  <h4 className="mb-3">
                    You’ll be amazed by what’s become possible in the last three years.
                  </h4>
                  <div className="text-justify">
                    <p>
                      I advise organizations on how to better leverage their existing data
                      using commercial tools from AWS and Azure.
                      <BlankSpace />
                      Plus, I am the principal engineer of
                      <BlankSpace />
                      <a
                        href="https://smarter.sh"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Smarter
                      </a>
                      <BlankSpace />, an orchestration platform for AI resources.
                    </p>
                    <p>
                      I teach
                      <BlankSpace />
                      <a
                        href="https://extendedlearning.ubc.ca/courses/ai-cloud-strategy-technology-implementation/0161"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        AI
                      </a>
                      <BlankSpace />
                      and
                      <BlankSpace />
                      <a
                        href="https://extendedlearning.ubc.ca/programs-credentials/cloud-technology-transformation-certificate"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        cloud computing
                      </a>
                      <BlankSpace />
                      at
                      <BlankSpace />
                      <a
                        href="https://www.ubc.ca/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        University of British Columbia
                      </a>
                      .
                    </p>
                    <p>
                      I regularly publish
                      <BlankSpace />
                      <a
                        href="https://github.com/fullstackwithlawrence"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        code samples
                      </a>
                      ,<BlankSpace />
                      <a
                        href="https://blog.lawrencemcdaniel.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        articles
                      </a>
                      , and
                      <BlankSpace />
                      <a
                        href="https://www.youtube.com/@FullStackWithLawrence"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        video content
                      </a>
                      <BlankSpace />
                      on the latest AI and machine learning concepts, all of which are
                      listed below for your convenience.
                    </p>
                    <a href="https://verify.mygreatlearning.com/OHMJTCTD">
                      <img
                        src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2022/11/18001140/mit-idss-combined-logo.png"
                        alt="MIT Institute For Data, Systems, and Society"
                        width="100%"
                      />
                    </a>
                    <a href="https://verify.mygreatlearning.com/OHMJTCTD">
                      <img
                        src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2022/11/18003538/mit-idss-course.png"
                        alt="MIT Institute For Data, Systems, and Society"
                        width="100%"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="column-right col-lg-6 col-md-12 pe-5">
                <a href="https://www.coursera.org/account/accomplishments/verify/2MVW9YRMFYC9?utm_source=link&utm_campaign=copybutton_certificate&utm_product=course">
                  <img
                    src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220349/machine-learning-certificate.jpg"
                    alt="Machine Learning Certification"
                  />
                  <img
                    className="mt-4"
                    src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2016/12/22195700/machine-learning-grade.png"
                    alt="Machine Learning Grade Received"
                  />
                </a>
              </div>
            </div>
            <div className="row ml-0 mr-0 pr-2">
              <div className="col mt-4">
                <p className="text-justify pe-3">
                  To complement my professional experience, I have completed advanced
                  training in data science, machine learning, and business analytics from
                  world-class institutions. This includes four certificates from the
                  <BlankSpace />
                  <a
                    href="https://online-execed.wharton.upenn.edu/business-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wharton Business Data Analytics
                  </a>
                  <BlankSpace />
                  program, focused on applying data insights to strategic decision-making;
                  Stanford’s renowned
                  <BlankSpace />
                  <a
                    href="https://www.coursera.org/learn/introduction-to-machine-learning-in-production"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Machine Learning
                  </a>
                  <BlankSpace />
                  course taught by
                  <BlankSpace />
                  <a
                    href="https://www.andrewng.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dr. Andrew Ng
                  </a>
                  , covering core algorithms and modeling techniques; and
                  <BlankSpace />
                  <a
                    href="https://idss-gl.mit.edu/mit-idss-data-science-machine-learning-online-program"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MIT IDSS’s program in Data Science & Machine Learning
                  </a>
                  <BlankSpace />, emphasizing statistical methods and practical
                  applications. These programs strengthen my ability to bridge technical
                  expertise with real-world business impact.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 mx-3 my-0 p-0">
          <WhartonCertificate
            idx="1"
            href="https://www.coursera.org/account/accomplishments/certificate/KZN42KMZ4HHJ"
            src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2022/11/18143957/wharton-people-analytics-certificate.png"
          />
          <WhartonCertificate
            idx="2"
            href="https://www.coursera.org/account/accomplishments/certificate/7NSB8MFBWCT8"
            src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2022/11/18143951/wharton-operations-analytics-certificate.png"
          />
          <WhartonCertificate
            idx="3"
            href="https://www.coursera.org/account/accomplishments/certificate/4YXEDYZJXQUD"
            src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2022/11/18143946/wharton-customer-analytics-certificate.png"
          />
          <WhartonCertificate
            idx="4"
            href="https://www.coursera.org/account/accomplishments/certificate/EB4FBYKJ2956"
            src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2022/11/18143939/wharton-accounting-analytics-certificate.png"
          />
        </div>
        <SpecialtiesBanner />
        <div className="row mx-5">
          <div className="col">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-right">
                    <span className="fa fa-codepen fa-2x"></span>
                  </td>
                  <th scope="row">Regression</th>
                  <td>
                    Multi-variable Linear, Polynomial and Logistic regression models
                    leveraging a plethora of cost optimization strategies
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-code-fork fa-2x"></span>
                  </td>
                  <th scope="row">Neural Networks</th>
                  <td>
                    For image processing, compression, robotics, OCR and other non-linear
                    problem spaces.
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-sitemap fa-2x"></span>
                  </td>
                  <th scope="row">Support Vector Machines</th>
                  <td>
                    For classification problems in non-linear environments like text
                    categorization, image sorting and hand-written character recognition
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-search fa-2x"></span>
                  </td>
                  <th scope="row">Anomaly Detection</th>
                  <td>
                    Supervised learning algorithms to identify potential service failures,
                    factory defects and other types of outliers in highly dynamic and
                    non-linear environments.
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-object-group fa-2x"></span>
                  </td>
                  <th scope="row">Recommender Systems</th>
                  <td>
                    Content-based recommendation engines e-commerce optimizations and
                    other predictive customer recommendations
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-magic fa-2x"></span>
                  </td>
                  <th scope="row">Unsupervised Learning</th>
                  <td>
                    Clustering and K-means algorithms for applications like market
                    segmentation, social network analysis and IT infrastructure management
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <TechnologyCarousel
          specialties={props.specialties}
          skill={APP_CONFIG.skills.dataScience}
        />
        <div className="row mx-5">
          <div className="col">
            <h3 className="ml-auto text-center pl-2 mx-5 mt-5">
              Code Samples & Publications
            </h3>
            <Content skill={APP_CONFIG.skills.dataScience} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Datascience.propTypes = {
  specialties: PropTypes.array.isRequired,
}

export default Datascience
