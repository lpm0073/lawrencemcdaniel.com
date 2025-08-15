import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setHomePage } from '../../redux/actions/homeActions'

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
import { APP_CONFIG } from '../../shared/constants'

import './styles.css'

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setHomePage }, dispatch),
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
          <link rel="canonical" href={APP_CONFIG.urls.site} />
          <meta
            name="description"
            content="Data scientist, full stack developer, online instructor, Open edX® consultant, amateur photographer"
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
        <main key="home-page" className="jumbotron dark-background">
          <div className="h-100">
            <div className="row pt-1 m-0 mr-0 px-0 jumbotron-spacer">
              <section className="col-lg-6 pt-5 col-md-12 text-center noselect ">
                <img
                  src={APP_CONFIG.static.images.default}
                  alt="Lawrence McDaniel headshot"
                  className="head-shot hide-medium img-fluid w-50 rounded mx-auto d-block "
                />
                <h1 className="pt-2 mb-0 lawrence-mcdaniel">
                  <span className="pre-wrap">Lawrence McDaniel</span>
                </h1>
                <p className="digital-creator">digital creator</p>
              </section>
              <section className="col-lg-6 pt-5 col-md-12">
                <LogoCube />
              </section>
            </div>
            <section id="job-titles">
              <div className="row mt-0 mb-0 pt-0 pb-0 text-center justify-content-center hide-medium">
                <JobTitle
                  idx="1"
                  target="_self"
                  href={'/' + APP_CONFIG.skills.fullStack}
                  title="Full Stack Developer"
                />
                <Consultant />
                <JobTitle
                  idx="3"
                  target="_self"
                  href={'/' + APP_CONFIG.skills.dataScience}
                  title="Data Scientist"
                />
              </div>
              <div className="row mt-0 mb-0 pt-0 pb-0 text-center justify-content-center hide-medium">
                <JobTitle
                  idx="4"
                  target="_blank"
                  href={APP_CONFIG.urls.blog}
                  title="Blogger"
                />
                <OnlineInstructor />
                <Photographer />
              </div>
            </section>
          </div>
        </main>
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
