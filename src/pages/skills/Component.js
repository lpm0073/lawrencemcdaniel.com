import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import SkillColumn from './skillColumn'
import SkillBar from './skillBar'
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
        <link rel="canonical" href={URL_SITE + '/skills/'} />
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
        <RenderPageTitle theme="light" icon="fa-book" title="FULL" boxed_title="STACK" />

        <div className="row mt-5 mb-5 ml-0 mr-0">
          <SkillColumn
            key="1"
            id="1"
            pct="100"
            title="Web"
            icon="fa-code"
            description="Complete professional web sites and web apps using Django, ReactJS, Redux, Angular, and WordPress"
          />
          <SkillColumn
            key="2"
            id="2"
            pct="100"
            title="Mobile & IoT"
            icon="fa-mobile"
            description="Turnkey hybrid mobile apps with Ionic-Cordova. Complete IoT designs with Android-DragonBoard"
          />
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
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-lg-6 col-md-12">
            <SkillBar
              key="1"
              id="1"
              pct="100"
              description="Django, React, Redux, Angular, Ionic, WordPress"
            />
            <SkillBar
              key="2"
              id="2"
              pct="100"
              description="Bootstrap, D3, Underscore.js"
            />
            <SkillBar
              key="3"
              id="3"
              pct="100"
              description="MySQL, MongoDB, Hadoop, MS-SQL, Transact-SQL "
            />
            <SkillBar
              key="4"
              id="4"
              pct="90"
              description="AWS, Boto3, Linux, Bash, Ansible, Jenkins, Chef, Puppet"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <SkillBar key="5" id="5" pct="100" description="Open edX® Platform" />
            <SkillBar
              key="6"
              id="6"
              pct="100"
              description="Javascript, Python, PHP, VBA, VB .Net, ANSI C, C++"
            />
            <SkillBar
              key="7"
              id="7"
              pct="100"
              description="Octave, MatLab, MS Excel, MS Excel VBA"
            />
            <SkillBar
              key="8"
              id="8"
              pct="100"
              description="English (Native) / Spanish (professional proficiency)"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Skills
