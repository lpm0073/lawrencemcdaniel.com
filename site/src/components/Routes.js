import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { fetchSpecialties, fetchPortfolio, fetchEducation, fetchRecommendations, fetchProjectImages } from '../redux/ActionCreators';

// Pages
import Home from '../pages/home/Component';
import Contact from '../pages/contact/Component';
import About from '../pages/about/Component';
import Bio from '../pages/bio/Component';
import Specialties from '../pages/specialties/Component';
import Portfolio from '../pages/portfolio/Component';
import PortfolioDetail from '../pages/portfolioDetail/Component';
import Education from '../pages/education/Component';
import Skills from '../pages/skills/Component';
import Recommendations from '../pages/recommendations/Component';


const mapStateToProps = state => {
  return {
    specialties: state.specialties,
    portfolio: state.portfolio,
    education: state.education,
    recommendations: state.recommendations,
    project: state.project
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchSpecialties: () => {dispatch(fetchSpecialties())},
  fetchPortfolio: () => {dispatch(fetchPortfolio())},
  fetchEducation: () => {dispatch(fetchEducation())},
  fetchRecommendations: () => {dispatch(fetchRecommendations())},
  fetchProjectImages: () => {dispatch(fetchProjectImages())}
});


class Routes extends Component {
  
  componentDidMount() {
    this.props.fetchSpecialties();
    this.props.fetchPortfolio();
    this.props.fetchEducation();
    this.props.fetchRecommendations();
  }

  render() {

    const PortfolioWithSlug = ({match}) => {

      this.props.fetchProjectImages();

      return(
        <PortfolioDetail project={this.props.portfolio.projects.filter((item) => item.slug === match.params.portfolioId)[0]} 
            isLoading={this.props.portfolio.isLoading}
            errMess={this.props.portfolio.errMess}
        />
      );
    }

    return(
        <React.Fragment>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/bio" component={Bio} />
            <Route exact path="/specialties" component={() => <Specialties specialties={this.props.specialties} />} />
            <Route exact path="/portfolio" component={() => <Portfolio portfolio={this.props.portfolio} />} />
            <Route path="/portfolio/:portfolioId" component={PortfolioWithSlug} />
            <Route exact path="/education" component={() => <Education education={this.props.education} />} />
            <Route exact path="/skills" component={Skills} />
            <Route exact path="/recommendations" component={() => <Recommendations recommendations={this.props.recommendations} />} />
            <Redirect to="/home" />
          </Switch>
        </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
