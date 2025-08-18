import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { useSelector } from 'react-redux'

import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import { Helmet } from 'react-helmet'
import { APP_CONFIG } from '../../shared/constants'
import { Content } from '../../components/content/Component'
import BlankSpace from '../../components/blankSpace/Component'
import { gsdServiceConsulting } from '../../shared/seo/gsdServiceConsulting'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdSoftwareRepoList } from '../../shared/seo/gsdSoftwareSourceCode'
import { gsdVideoObjectList } from '../../shared/seo/gsdVideoObject'
import { gsdSkillSchemaList } from '../../shared/seo/gsdSkills'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'

import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const urlFullStack = '/' + APP_CONFIG.skills.fullStack
const ConsultingServices = () => (
  <div className="consulting-services">
    <p>
      I advise organizations on how to better leverage their existing data, and on
      migrating technology infrastructure to the cloud. And I&rsquo;ll even do the work.
      <BlankSpace />
      <a href="/contact" target="_self">
        Contact me
      </a>{' '}
      to discuss how I can help you.
    </p>
    <ul className="consulting-services-list">
      <li>
        <span className="consulting-list-item-title">Data Science</span> I help companies
        prepare data sets, and setup training, testing, evaluation, deployment and
        monitoring of AI, machine learning and forecasting models; both on premise as well
        as on popular platforms like AWS, Azure and Google Cloud.{' '}
        <a href="/data-science">Learn more</a>
      </li>
      <li>
        <span className="consulting-list-item-title">Training</span> I provide live and
        studio prerecorded training about hard skills in cloud computing, data science,
        and advanced programming techniques.
      </li>
      <li>
        <span className="consulting-list-item-title">Full Stack development</span> I build
        complete solutions, from front-end web applications to back-end services,
        command-line interfaces and automated workflows.{' '}
        <a href={urlFullStack}>Learn more</a>
      </li>
      <li>
        <span className="consulting-list-item-title">Cloud Computing</span> I specialize
        in cloud native technologies like Docker, Kubernetes, Terraform and GitHub for
        designing, implementing and managing scalable and secure cloud infrastructure.{' '}
        <a href={urlFullStack}>Learn more</a>
      </li>
      <li>
        <span className="consulting-list-item-title">Dev Ops</span> I help teams leverage
        12-factor app principles to work more efficiently and more effectively by
        implementing best practices for software development, deployment, and maintenance,
        including CI/CD pipelines, automated testing, and infrastructure as code. I
        practice what I preach. I am the principal maintainer of more than 4 dozen open
        source projects (see below). <a href={urlFullStack}>Learn more</a>
      </li>
      <li>
        <span className="consulting-list-item-title">
          Open edX<span className="copyright">®</span>
        </span>
        <BlankSpace />I provide <a href="/openedx">advisory services</a> on installing,
        configuring and customizing the Open edX<span className="copyright">®</span>{' '}
        platform.
      </li>
    </ul>
  </div>
)

const headline = 'Advisory and Consulting Services'
const slug = 'consulting'
const webpageDescription = 'Lawrence McDaniel - Advisory and Consulting Services'
const primaryImageUrl = ''
const pageType = ''
const relatedLink = APP_CONFIG.urls.site + '/consulting'
const person = {
  ...gsdPersonLawrenceMcDaniel,
  ...{ hasOccupation: hasOccupation },
}

const Consulting = () => {
  const reduxRecommendations = useSelector((state) => state.recommendations)
  const recommendations = reduxRecommendations.items ? reduxRecommendations.items : []

  const graphExtraData = [
    person,
    gsdServiceConsulting(recommendations),
    gsdSoftwareRepoList(),
    gsdVideoObjectList,
    gsdSkillSchemaList(),
  ]

  console.log('Consulting Graph Extra Data:', graphExtraData)

  return (
    <React.Fragment>
      <Helmet>
        <title>Advisory And Consulting</title>
        <meta
          name="description"
          content="Lawrence McDaniel - Advisory and Consulting Services"
        />
        <link rel="canonical" href={APP_CONFIG.urls.site + '/consulting'} />
        <meta
          name="description"
          content="Consulting services and technical training in data science, AI/ML, Devops, and modern tech stack expertise."
        />
        <meta
          name="keywords"
          content="data science, AI, machine learning, consulting, devops, python, react, aws, azure, terraform, django, lawrence mcdaniel"
        />
        <script type="application/ld+json">
          {JSON.stringify(
            gsdGraph(
              slug,
              headline,
              webpageDescription,
              primaryImageUrl,
              pageType,
              relatedLink,
              graphExtraData
            )
          )}
        </script>
      </Helmet>
      <main className="site-page data-science-page" aria-label="Consulting Services">
        <RenderPageTitle
          theme="light"
          icon="fa-gears"
          title="Consulting"
          boxed_title="Services"
        />
        <div className="row mt-5">
          <div className="col-lg-3 hide-medium">
            <aside className="pl-3 text-center">
              <LinkedinBadge />
              <a
                className="mt-4 btn btn-danger"
                role="button"
                target="_self"
                href="/contact"
              >
                <i className="fa fa-phone"></i> Contact Me
              </a>
            </aside>
          </div>
          <section className="col-lg-9 col-md-12" aria-label="Consulting Services">
            <div className="text-justify ml-lg-0 mr-lg-5 mx-2">
              <ConsultingServices />
            </div>
          </section>
        </div>
        <section className="row" aria-label="Code Samples & Publications">
          <div className="col m-3">
            <Content />
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}

export default Consulting
