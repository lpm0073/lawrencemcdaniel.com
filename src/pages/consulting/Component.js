import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import { Helmet } from 'react-helmet'
import { URL_SITE } from '../../shared/constants'
import BlankSpace from '../../components/blankSpace/Component'
import CodeSamplesTable from '../../components/codeSamples/Component'
import './styles.css'

const ConsultingServices = () => (
  <div className='consulting-services'>
    <p>
      I advise organizations on how to better leverage their existing data, and on migrating technology infrastructure to the cloud.
      And I&rsquo;ll even do the work.
      <BlankSpace /><a href="/contact" target="_self">Contact me</a> to discuss how I can help you.
    </p>
    <ul className="consulting-services-list">
      <li>
        <span className="consulting-list-item-title">Data Science</span> I help companies prepare data sets, and setup training, testing, evaluation,
        deployment and monitoring of AI, machine learning and forecasting models; both on premise as well as on popular platforms like AWS, Azure and Google Cloud.
      </li>
      <li>
        <span className="consulting-list-item-title">Training</span> I provide live and studio
        prerecorded training about hard skills in cloud computing, data science, and advanced programming
        techniques.
      </li>
      <li>
        <span className="consulting-list-item-title">Cloud Computing</span> I specialize in cloud native technologies
        like Docker, Kubernetes, Terraform and GitHub for designing, implementing and managing scalable
        and secure cloud infrastructure.
      </li>
      <li>
        <span className="consulting-list-item-title">Dev Ops</span> I help teams work more efficiently
        by implementing best practices for software development, deployment, and maintenance,
        including CI/CD pipelines, automated testing, and infrastructure as code. I
        practice what I preach. I am the principal maintainer of more than 4 dozen open
        source projects (see below).
      </li>
      <li>
        <span className="consulting-list-item-title">
          Open edX<span className="copyright">®</span>
        </span>
        <BlankSpace />I provide <a href="/openedx">advisory services</a> on installing, configuring and customizing the Open edX<span className="copyright">®</span> platform.
      </li>
    </ul>
  </div>
)

const Consulting = () => {
  return (
    <div>
      <Helmet>
        <title>Advisory And Consulting</title>
        <link rel="canonical" href={URL_SITE + '/consulting'} />
        <meta
          name="description"
          content="Consulting services and technical training in data science, AI/ML, Devops, and modern tech stack expertise."
        />
        <meta
          name="keywords"
          content="data science, AI, machine learning, consulting, devops, python, react, aws, azure, terraform, django, lawrence mcdaniel"
        />
      </Helmet>
      <div className="site-page data-science-page">
        <RenderPageTitle
          theme="light"
          icon="fa-gears"
          title="Consulting"
          boxed_title="Services"
        />
        <div className="row mt-5">
          <div className="col-lg-3 hide-medium">
            <div className="pl-3 text-center">
              <LinkedinBadge />
              <a
                className="mt-4 btn btn-danger"
                role="button"
                target="_self"
                href="/contact"
              >
                <i className="fa fa-phone"></i> Contact Me
              </a>
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="text-justify ml-lg-0 mr-lg-5 mx-2">
              <ConsultingServices />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 code-samples">
            <h3 className="">Code Samples</h3>
            <p>
              These are a combination of managed GitHub repositories that i use for
              instructional purposes, combined with repositories belonging to open source
              organizations to which I am the maintainer. Most of these also demonstrate
               best practices for software management including
              pre-commit, linting techniques, and devops methods for automating unit
              testing, documentation and CI-CD operations for build, deploy and code dependency package updates.
            </p>
            <CodeSamplesTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consulting
