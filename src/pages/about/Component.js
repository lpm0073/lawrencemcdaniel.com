import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../redux/ActionCreators'

import BlankSpace from '../../components/blankSpace/Component'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
import AboutTile from './tileComponent'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import {
  gsdPersonLawrenceMcDaniel,
  personExtraData,
} from '../../shared/seo/gsdPersonLawrence'
import { URL_SITE } from '../../shared/constants'

import './styles.css'

//import { Fade } from "react-animation-components";

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
})

class About extends Component {
  componentWillUnmount() {
    this.props.actions.setAboutPage()
  }

  render() {
    var d = new Date()
    const years_traveling = d.getFullYear() - 1992
    const years_living_abroad = d.getFullYear() - 1992 - 2 - 2 - 3 - 1

    /* Google Structured Data */
    const slug = 'about'
    const webpageName = 'About'
    const webpageDescription =
      'I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including Django, React, Angular, and WordPress. I also work extensively with the Open edX® learning management system. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for open source, try to keep things DRY and well-documented and when possible I adhere to the principals of 12-factor development. I’m a passionate learner and frequent blogger, currently interested in machine learning, AI and quantum computing.'
    const primaryImageUrl = ''
    const pageType = 'AboutPage'
    const relatedLink = ''
    const graphExtraData = [{ ...gsdPersonLawrenceMcDaniel, ...personExtraData }]

    return (
      <React.Fragment>
        <Helmet>
          <link rel="canonical" href={URL_SITE + '/about/'} />
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
        <div key="about-page" className="site-page about-page">
          <RenderPageTitle theme="light" icon="fa-user" title="ABOUT" boxed_title="ME" />
          <div className="row mt-5 ml-0 mr-0">
            <div className="col-lg-3 col-md-6 col-sm-12 hide-medium">
              <LinkedinBadge />
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <div>
                <h4 className="mb-3">
                  Great things are done by a series of small things brought together
                </h4>
                <div className="text-justify">
                  <p>
                    I am the Chief Technology Officer of<BlankSpace />
                    <a
                      href="https://www.querium.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Querium Corporation
                    </a>
                    , an edtech company specializing in Artificial Intelligence and Cloud
                    Computing for educational institutions. I am principal author and lead
                    product engineer of<BlankSpace />
                    <a
                      href="https://smarter.sh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Smarter by Querium™
                    </a><BlankSpace />
                    , an instructional web platform for teaching generative AI to
                    non-programmers. I’m an enthusiastic lifelong<BlankSpace />
                    <a href="/education">learner</a>, a<BlankSpace />
                    <a href="data-science">data scientist</a>, a full stack developer and
                    a<BlankSpace />
                    <a
                      href="https://photography.lawrencemcdaniel.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      photography enthusiast
                    </a><BlankSpace />
                    .
                  </p>
                  <p>
                    I also teach<BlankSpace />
                    <a
                      href="https://extendedlearning.ubc.ca/courses/cloud-technology-infrastructure-strategy/mg102"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      cloud computing
                    </a><BlankSpace />
                    and<BlankSpace />
                    <a
                      href="https://extendedlearning.ubc.ca/courses/artificial-intelligence-cloud-technology-implementation/mg202"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AI
                    </a><BlankSpace />
                    at<BlankSpace />
                    <a href="https://extendedlearning.ubc.ca/about-us/our-instructors/lawrence-mcdaniel">
                      University of British Columbia
                    </a><BlankSpace />
                    and I publish<BlankSpace />
                    <a href="https://blog.lawrencemcdaniel.com/">articles</a> and<BlankSpace />
                    <a href="https://www.youtube.com/@FullStackWithLawrence">videos</a> on
                    a variety of technology topics. In 2023 I authored and am the
                    principal maintainer of<BlankSpace />
                    <a
                      href="https://blog.lawrencemcdaniel.com/introducing-cookiecutter-open-edx/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      openedx-actions
                    </a>
                    , an open source set of CI-CD tools for managing<BlankSpace />
                    <a
                      href="https://openedx.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open edX
                    </a><BlankSpace />
                    platforms at scale on<BlankSpace />
                    <a
                      href="https://kubernetes.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kubernetes
                    </a>
                    .
                  </p>
                  <p>
                    I am a veteran of the hedge fund industry and multiple startups and
                    early-stage ventures with dozens of successful product launches and
                    one NASDAQ IPO under my belt. I advocate for<BlankSpace />
                    <a href="https://en.wikipedia.org/wiki/Open_source">open source</a>,
                    try to keep things<BlankSpace />
                    <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">
                      DRY
                    </a><BlankSpace />
                    and well-documented and when possible I adhere to the principals of<BlankSpace />
                    <a href="https://12factor.net/">12-factor</a> development.
                  </p>
                  <p>
                    I&apos;ve lived abroad for {years_living_abroad} of the last<BlankSpace />
                    {years_traveling} years in Mexico, Western Europe and SE Asia. Prior
                    to that I earned a B.S. from University of North Texas with majors in
                    Computer Science and Mathematics and minors in Physics and English.
                  </p>
                </div>
              </div>
            </div>
            <div className="column-3 col-lg-4 col-md-6 col-sm-12 p-3">
              {this.props.aboutPage.isSet && <RightColumn />}
              {!this.props.aboutPage.isSet && (
                //<Fade in delay={0} duration={400}>
                <React.Fragment>
                  <BlankSpace />
                  <RightColumn /><BlankSpace />
                </React.Fragment>
                //</Fade>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const RightColumn = () => {
  var d = new Date()
  const years_experience = d.getFullYear() - 1992 - 11 - 1 - 2
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
      <div className="column-3-text text-justify mt-1 pt-1">
        <p>
          <strong>
            Read my<BlankSpace />
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
  actions: PropTypes.shape({
    setAboutPage: PropTypes.func.isRequired,
  }).isRequired,
  aboutPage: PropTypes.shape({
    isSet: PropTypes.bool.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
