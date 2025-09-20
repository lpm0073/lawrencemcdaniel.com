import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAboutPage } from '../../redux/actions/aboutActions'

import BlankSpace from '../../components/blankSpace/Component'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import AboutTile from './tileComponent'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { gsdQualifications } from '../../shared/seo/gsdQualifications.js'

import { APP_CONFIG } from '../../shared/constants'

import './styles.css'

//import { Fade } from "react-animation-components";

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setAboutPage }, dispatch),
})

class About extends Component {
  componentWillUnmount() {
    this.props.actions.setAboutPage()
  }

  render() {
    /* Google Structured Data */
    const slug = 'about'
    const webpageName = 'About'
    const webpageDescription = null
    const primaryImageUrl = ''
    const pageType = 'AboutPage'
    const relatedLink = ''
    const person = !this.props.education.isLoading
      ? {
          ...gsdPersonLawrenceMcDaniel,
          hasOccupation: {
            ...hasOccupation,
            qualifications: gsdQualifications(this.props.education.courses),
          },
        }
      : null

    const graphExtraData = !this.props.education.isLoading ? [person] : []

    return (
      <React.Fragment>
        <Helmet>
          <link rel="canonical" href={APP_CONFIG.urls.site + '/about'} />

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
        <main key="about-page" className="site-page about-page">
          <RenderPageTitle theme="light" icon="fa-user" title="ABOUT" boxed_title="ME" />
          <div className="row mt-5 ml-0 mr-0">
            <aside className="col-lg-3 col-md-6 col-sm-12 hide-medium">
              <LinkedinBadge />
            </aside>
            <section className="m-lg-0 col-lg-5 col-md p-2 m-3">
              <div>
                <h4 className="mb-3">
                  Great things are done by a series of small things brought together
                </h4>
                <div className="text-justify">
                  <p>
                    I’m the Chief Technology Officer of
                    <BlankSpace />
                    <a
                      href="https://www.querium.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Querium Corporation
                    </a>
                    , a VC-funded artificial intelligence company. My work often involves{' '}
                    <a href="consulting">consulting</a> to a variety of{' '}
                    <a href="/clients">clients</a>.
                  </p>
                  <p>
                    I’m the maintainer of several open source projects including
                    <BlankSpace />
                    <a
                      href="https://github.com/smarter-sh/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Smarter
                    </a>, a declarative AI resource management & orchestration platform, and
                    <BlankSpace />
                    <a
                      href="https://github.com/fullStackWithLawrence/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Full Stack with Lawrence
                    </a>, a collection of Python tutorials for data science and web. I’m an enthusiastic lifelong
                    <BlankSpace />
                    <a href="education">learner</a>, a<BlankSpace />
                    <a href="data-science">data scientist</a>, a{' '}
                    <a href="cloud">cloud architect</a>, a{' '}
                    <a href="full-stack">full stack developer</a> and a<BlankSpace />
                    <a
                      href="https://photography.lawrencemcdaniel.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      photography enthusiast
                    </a>
                    .
                  </p>
                  <p>
                    I teach
                    <BlankSpace />
                    <a
                      href="https://extendedlearning.ubc.ca/programs-credentials/cloud-technology-transformation-certificate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      cloud computing
                    </a>
                    <BlankSpace />
                    and
                    <BlankSpace />
                    <a
                      href="https://extendedlearning.ubc.ca/courses/ai-cloud-strategy-technology-implementation/0161"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AI
                    </a>
                    <BlankSpace />
                    at
                    <BlankSpace />
                    <a href="https://extendedlearning.ubc.ca/about/our-instructors?field_course_program_areas_target_id_verf=All&field_instr_first_name=Lawrence&field_instr_last_name=McDaniel">
                      University of British Columbia
                    </a>
                    <BlankSpace />
                    and I publish
                    <BlankSpace />
                    <a href="https://blog.lawrencemcdaniel.com/">articles</a> and
                    <BlankSpace />
                    <a href="https://www.youtube.com/@FullStackWithLawrence">videos</a> on
                    a variety of technology topics. In 2023 I authored and am the
                    principal maintainer of
                    <BlankSpace />
                    <a
                      href="https://blog.lawrencemcdaniel.com/introducing-cookiecutter-open-edx/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      openedx-actions
                    </a>
                    , an open source set of CI-CD tools for managing
                    <BlankSpace />
                    <a
                      href="https://openedx.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open edX
                    </a>
                    <BlankSpace />
                    platforms at scale on
                    <BlankSpace />
                    <a
                      href="https://kubernetes.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kubernetes
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
            <aside className="col-lg-4 hide-medium pb-0">
              {this.props.aboutPage.isSet && <RightColumn />}
              {!this.props.aboutPage.isSet && (
                //<Fade in delay={0} duration={400}>
                <React.Fragment>
                  <BlankSpace />
                  <RightColumn />
                  <BlankSpace />
                </React.Fragment>
                //</Fade>
              )}
            </aside>
          </div>
          <div className="row">
            <section className="col-lg m-3 mt-1">
              <p>
                I advocate for
                <BlankSpace />
                <a href="https://en.wikipedia.org/wiki/Open_source">open source</a>, try
                to keep things
                <BlankSpace />
                <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a>
                <BlankSpace />
                and well-documented and when possible I adhere to the principals of
                <BlankSpace />
                <a href="https://12factor.net/">12-factor</a> development. I earned a B.S.
                from University of North Texas with majors in Computer Science and
                Mathematics and minors in Physics and English. But that was a long time
                ago. See my <a href="/education">Education</a> page for more recent
                coursework.
              </p>
            </section>
          </div>
        </main>
      </React.Fragment>
    )
  }
}
const RightColumn = () => {
  var d = new Date()
  const years_experience = d.getFullYear() - 1992
  const years_opensource = d.getFullYear() - 2010
  const years_biking = d.getFullYear() - 1990 - 5

  return (
    <div>
      <div className="row hide-small hide-medium about-tiles m-0">
        <AboutTile icon="fa-globe" value="13" text="Countries worked in" />
        <AboutTile icon="fa-cloud" value={years_experience} text="Years Experience" />
        <AboutTile icon="fa-linux" value={years_opensource} text="Years Open Source" />
        <AboutTile icon="fa-taxi" value={years_biking} text="Years bicycle commuting" />
      </div>
      <div className="column-3-text text-center mt-1 pt-1">
        <p>
          <strong>
            Read my
            <BlankSpace />
            <a href="/bio/">
              <span>full bio here</span>
            </a>
            .
          </strong>
        </p>
      </div>
    </div>
  )
}

About.propTypes = {
  education: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    setAboutPage: PropTypes.func.isRequired,
  }).isRequired,
  aboutPage: PropTypes.shape({
    isSet: PropTypes.bool.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
