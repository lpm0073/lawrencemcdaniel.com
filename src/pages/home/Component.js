import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../redux/ActionCreators'

import LogoCube from '../../components/logocube/Component'
import Consultant from './Consultant'
import Photographer from './Photographer'
import OnlineInstructor from './Instructor'
import JobTitle from './JobTitle'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { basePageTitle } from '../../shared/seo/gsdCommon'
import { Helmet } from 'react-helmet'
import { URL_SITE } from '../../shared/constants'

import './styles.css'

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
})

class Home extends Component {
  componentWillUnmount() {
    this.props.actions.setHomePage()
  }

  render() {
    /* Google Structured Data */
    const person = {
      ...gsdPersonLawrenceMcDaniel,
      ...{ hasOccupation: hasOccupation },
    }
    const slug = ''
    const webpageName = basePageTitle
    const webpageDescription =
      'Data Scientist, Full Stack Developer, online instructor, and Open edX® Consultant specializing in Python, ReactJS, Kubernetes, Terraform, AWS, and Azure.'
    const primaryImageUrl = ''
    const pageType = ''
    const relatedLink = ''
    const graphExtraData = [person]

    return (
      <React.Fragment>
        <Helmet>
          <link rel="canonical" href={URL_SITE} />
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
        <div key="home-page" className="jumbotron dark-background">
          <div className="h-100">
            <div className="row pt-1 m-0 mr-0 px-0 jumbotron-spacer">
              <div className="col-lg-6 pt-5 col-md-12 text-center noselect ">
                {/* <div className="title-spacer"></div> */}
                <img src="https://cdn.lawrencemcdaniel.com/lawrencemcdaniel-headshot-square.jpeg" alt="Lawrence McDaniel headshot" className="head-shot hide-medium img-fluid w-50 rounded mx-auto d-block " />
                <h1 className="pt-2 mb-0 lawrence-mcdaniel">
                  <span className="pre-wrap">Lawrence McDaniel</span>
                </h1>
                <p className="digital-creator">digital creator</p>
              </div>
              <div className="col-lg-6 pt-5 col-md-12">
                <LogoCube />
              </div>
            </div>
            <div className="row mt-0 mb-0 pt-0 pb-0 text-center justify-content-center hide-medium">
              <JobTitle idx="1" target="_self" href="/full-stack-developer" title="Full Stack Developer" />
              <Consultant />
              <JobTitle
                idx="3"
                target="_self"
                href="/data-science"
                title="Data Scientist"
              />
            </div>
            <div className="row mt-0 mb-0 pt-0 pb-0 text-center justify-content-center hide-medium">
              <JobTitle
                idx="4"
                target="_blank"
                href="https://blog.lawrencemcdaniel.com/"
                title="Blogger"
              />
              <OnlineInstructor />
              <Photographer />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    setHomePage: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
