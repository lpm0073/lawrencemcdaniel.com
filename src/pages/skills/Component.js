import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import CodeSamplesTable from '../../components/codeSamples/Component'
import SkillColumn from './skillColumn'
import { Helmet } from 'react-helmet'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

/* eslint-disable no-unused-vars */
const Skills = (props) => {
  /* Google Structured Data */
  const slug = 'skills'
  const webpageName = 'Skills'
  const webpageDescription = "Lawrence McDaniel's technology skills."
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [gsdPersonLawrenceMcDaniel]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={URL_SITE + '/skills'} />
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
        <RenderPageTitle theme="light" icon="fa-book" title="FULL STACK" boxed_title="DEVELOPER" />

        <div className="row mt-5 mb-5 ml-0 mr-0 justify-content-center">
          <SkillColumn
            key="3"
            id="3"
            pct="100"
            title="Cloud"
            icon="fa-cloud"
            description="Server migrations, and consultation on cloud infrastructure planning to minimize costs while maximizing security and performance."
          />
          <SkillColumn
            key="4"
            id="4"
            pct="100"
            title="Data"
            icon="fa-database"
            description="OLTP and BI designs & programming for MySQL and MS-SQL Server. High-availability designs for MongoDB, and MapReduce problems on Hadoop"
          />
          <SkillColumn
            key="5"
            id="5"
            pct="100"
            title="DevOps"
            icon="fa-server"
            description="Create and maintain continuous integration strategies using GitHub, AWS Boto3, Jenkins, Chef, Puppet or Ansible."
          />
          <SkillColumn
            key="6"
            id="6"
            pct="100"
            title="Data Science"
            icon="fa-magic"
            description="Applied Linear Algebra, AI and Neural Networks designs and coding using Octave and Python scikit-learn and NumPy"
          />
          <SkillColumn
            key="1"
            id="1"
            pct="100"
            title="Web"
            icon="fa-code"
            description="Complete professional web sites and web apps using Django, ReactJS, Redux, Angular, and WordPress"
          />
        </div>


        <div className="row mx-5">
          <div className="col">
            <h3 className="ml-auto text-center pl-2 mx-5 mt-5">Code Samples</h3>
            <p className="text-center">
              Hire me! I can help you with your next project, more details <a href="/consulting">here</a>.
            </p>
            <CodeSamplesTable />
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Skills
