import React, { Component } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { connect, type ConnectedProps } from 'react-redux'

import { APP_CONFIG } from '../shared/constants'
import type { AppDispatch, RootState } from '../redux/configureStore'
import { fetchArticles } from '../redux/actions/articlesActions'
import { fetchVideos } from '../redux/actions/videosActions'
import { fetchRepositories } from '../redux/actions/repositoriesActions'
import { fetchSpecialties } from '../redux/actions/specialtiesActions'
import { fetchPortfolio } from '../redux/actions/portfolioActions'
import { fetchEducation } from '../redux/actions/educationActions'
import { fetchRecommendations } from '../redux/actions/recommendationsActions'
import { fetchProjectImages } from '../redux/actions/projectActions'
import { fetchClients } from '../redux/actions/clientActions'

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
import CloudComputing from '../pages/cloud/Component'
import Clients from '../pages/clients/Component'
import Datascience from '../pages/dataScience/Component'
import ImageTaggerPage from '../pages/imageTagging/Component'
import ReactPage from '../pages/react/Component'
import Openedx from '../pages/openedx/Component'
import PageNotFound from '../pages/notFound/Component'
import MRLPage from '../pages/mdr/Component'

const mapStateToProps = (state: RootState) => ({
  ...state,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchArticles: () => {
    dispatch(fetchArticles())
  },
  fetchVideos: () => {
    dispatch(fetchVideos())
  },
  fetchRepositories: () => {
    dispatch(fetchRepositories())
  },
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

const connector = connect(mapStateToProps, mapDispatchToProps)
type SiteRoutesProps = ConnectedProps<typeof connector>

class SiteRoutes extends Component<SiteRoutesProps> {
  componentDidMount() {
    this.props.fetchArticles()
    this.props.fetchVideos()
    this.props.fetchRepositories()
    this.props.fetchSpecialties()
    this.props.fetchPortfolio()
    this.props.fetchEducation()
    this.props.fetchRecommendations()
    this.props.fetchProjectImages()
    this.props.fetchClients()
  }

  shouldComponentUpdate() {
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
    if (path === '/' + APP_CONFIG.skills.fullStack) {
      if (!this.props.coursesGrid.isSet) {
        return true
      }
      return false
    }
    return true
  }

  render() {
    const PortfolioWithSlug = () => {
      const { portfolioId } = useParams()
      return (
        <PortfolioDetail
          post={this.props.portfolio.projects.find((item) => item.slug === portfolioId)}
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
          <Route path="/" element={<Home />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/about" element={<About />} />
          <Route path="/image-tagging" element={<ImageTaggerPage />} />
          <Route path="/bio" element={<Bio education={this.props.education} />} />
          <Route path="/full-bio" element={<Navigate to="/bio" />} />
          <Route
            path="/specialties"
            element={<Specialties specialties={this.props.specialties} />}
          />
          <Route
            path="/portfolio"
            element={<Portfolio portfolio={this.props.portfolio} />}
          />
          <Route path="/portfolio/:portfolioId" element={<PortfolioWithSlug />} />
          <Route
            path="/education"
            element={<Education education={this.props.education} />}
          />
          <Route path={'/' + APP_CONFIG.skills.openEdx} element={<Openedx />} />
          <Route
            path={'/' + APP_CONFIG.skills.dataScience}
            element={<Datascience specialties={this.props.specialties} />}
          />
          <Route
            path={'/' + APP_CONFIG.skills.fullStack}
            element={<Fullstack specialties={this.props.specialties} />}
          />
          <Route
            path={'/' + APP_CONFIG.skills.cloud}
            element={<CloudComputing specialties={this.props.specialties} />}
          />
          <Route path={'/' + APP_CONFIG.skills.react} element={<ReactPage />} />
          <Route path="/react-mdr" element={<MRLPage />} />
          <Route
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

export default connector(SiteRoutes)
