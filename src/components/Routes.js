import React, { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import {
  fetchSpecialties,
  fetchPortfolio,
  fetchEducation,
  fetchRecommendations,
  fetchProjectImages,
  fetchClients,
} from '../redux/ActionCreators'

// Pages
import Home from '../pages/home/Component'
import Consulting from '../pages/consulting/Component'
import Contact from '../pages/contact/Component'
import QR from '../pages/qr/Component'
import About from '../pages/about/Component'
import Bio from '../pages/bio/Component'
import Specialties from '../pages/specialties/Component'
import Portfolio from '../pages/portfolio/Component'
import PortfolioDetail from '../pages/portfolioDetail/Component'
import Education from '../pages/education/Component'
import Fullstack from '../pages/fullstack/Component'
import Clients from '../pages/clients/Component'
import Datascience from '../pages/dataScience/Component'
import ImageTaggerPage from '../pages/imageTagging/Component'
import ReactPage from '../pages/react/Component'
import Openedx from '../pages/openedx/Component'
import PageNotFound from '../pages/notFound/Component'
import MRLPage from '../pages/mdr/Component'

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSpecialties: () => {
    dispatch(fetchSpecialties())
  },
  fetchPortfolio: () => {
    dispatch(fetchPortfolio())
  },
  fetchEducation: () => {
    dispatch(fetchEducation())
  },
  fetchRecommendations: () => {
    dispatch(fetchRecommendations())
  },
  fetchProjectImages: () => {
    dispatch(fetchProjectImages())
  },
  fetchClients: () => {
    dispatch(fetchClients())
  },
})

class SiteRoutes extends Component {
  componentDidMount() {
    this.props.fetchSpecialties()
    this.props.fetchPortfolio()
    this.props.fetchEducation()
    this.props.fetchRecommendations()
    this.props.fetchProjectImages()
    this.props.fetchClients()
  }

  /* eslint-disable no-unused-vars */
  shouldComponentUpdate(nextProps, nextState) {
    /* pare down updates on pages with entry animations */
    const path = window.location.pathname
    if (path === '/home' || path === '/') {
      // i'm pretty sure this never gets called.
      if (!this.props.homePage.isSet) {
        return true
      }
      return false
    }
    if (path === '/clients') {
      if (!this.props.clientGrid.isSet) {
        return true
      }
      return false
    }
    if (path === '/education') {
      if (!this.props.coursesGrid.isSet) {
        return true
      }
      return false
    }
    if (path === '/full-stack-developer') {
      if (!this.props.coursesGrid.isSet) {
        return true
      }
      return false
    }
    return true
  }

  render() {
    const PortfolioWithSlug = ({ match }) => {
      return (
        <PortfolioDetail
          post={
            this.props.portfolio.projects.filter(
              (item) => item.slug === match.params.portfolioId
            )[0]
          }
          postLoading={this.props.portfolio.isLoading}
          postErrMess={this.props.portfolio.errMess}
          images={this.props.project}
          imagesLoading={this.props.project.isLoading}
          imagesError={this.props.project.errMess}
        />
      )
    }

    return (
      <React.Fragment>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/consulting" element={<Consulting />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/qr" element={<QR />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/openedx" element={<Openedx />} />
          <Route exact path="/data-science" element={<Datascience />} />
          <Route exact path="/image-tagging" element={<ImageTaggerPage />} />
          <Route exact path="/bio" element={<Bio />} />
          <Route exact path="/full-bio" element={<Navigate to="/bio" />} />
          <Route
            exact
            path="/specialties"
            element={<Specialties specialties={this.props.specialties} />}
          />
          <Route
            exact
            path="/portfolio"
            element={<Portfolio portfolio={this.props.portfolio} />}
          />
          <Route path="/portfolio/:portfolioId" element={<PortfolioWithSlug />} />
          <Route
            exact
            path="/education"
            element={<Education education={this.props.education} />}
          />
          <Route exact path="/full-stack-developer" element={<Fullstack specialties={this.props.specialties} />} />
          <Route exact path="/reactjs" element={<ReactPage />} />
          <Route exact path="/react-mdr" element={<MRLPage />} />
          <Route
            exact
            path="/clients"
            element={
              <Clients
                recommendations={this.props.recommendations}
                clients={this.props.clients}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.Fragment>
    )
  }
}

SiteRoutes.propTypes = {
  fetchSpecialties: PropTypes.func,
  fetchPortfolio: PropTypes.func,
  fetchEducation: PropTypes.func,
  fetchRecommendations: PropTypes.func,
  fetchProjectImages: PropTypes.func,
  fetchClients: PropTypes.func,
  homePage: PropTypes.shape({
    isSet: PropTypes.bool,
  }),
  clientGrid: PropTypes.shape({
    isSet: PropTypes.bool,
  }),
  coursesGrid: PropTypes.shape({
    isSet: PropTypes.bool,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      portfolioId: PropTypes.string,
    }),
  }),
  portfolio: PropTypes.shape({
    projects: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    errMess: PropTypes.string,
  }),
  project: PropTypes.shape({
    isLoading: PropTypes.bool,
    errMess: PropTypes.string,
  }),
  specialties: PropTypes.array,
  consulting: PropTypes.array,
  education: PropTypes.array,
  recommendations: PropTypes.array,
  clients: PropTypes.array,
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteRoutes));
export default connect(mapStateToProps, mapDispatchToProps)(SiteRoutes)
