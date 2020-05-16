import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { postFeedback, fetchSpecialties, fetchPortfolio, fetchEducation, fetchRecommendations } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

// Shared
import Header from './header/Component';
import Footer from './footer/Component';

// Pages
import Home from '../pages/home/Component';
import Contact from '../pages/contact/Component';
import About from '../pages/about/Component';
import Bio from '../pages/bio/Component';
import Specialties from '../pages/specialities/Component';
import Portfolio from '../pages/portfolio/Component';
import Education from '../pages/education/Component';
import Skills from '../pages/skills/Component';
import Recommendations from '../pages/recommendations/Component';

const mapStateToProps = state => {
  return {
    specialties: state.specialties,
    portfolio: state.portfolio,
    education: state.education,
    recommendations: state.recommendations
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  postFeedback: (firstname, lastname, telnum, email, agree, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, message)),
  fetchSpecialties: () => {dispatch(fetchSpecialties())},
  fetchPortfolio: () => {dispatch(fetchPortfolio())},
  fetchEducation: () => {dispatch(fetchEducation())},
  fetchRecommendations: () => {dispatch(fetchRecommendations())}
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchSpecialties();
    this.props.fetchPortfolio();
    this.props.fetchEducation();
    this.props.fetchRecommendations();
  }

  render() {

    return ( 
      <div>
        <Header />
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/contact" component={() => <Contact 
                                                              resetFeedbackForm={this.props.resetFeedbackForm} 
                                                              postFeedback={this.props.postFeedback}
                                                              />
                                                      } />
            <Route exact path="/about" component={About} />
            <Route exact path="/bio" component={Bio} />
            <Route exact path="/specialties" component={() => <Specialties specialties={this.props.specialties} />} />
            <Route exact path="/portfolio" component={() => <Portfolio portfolio={this.props.portfolio} />} />
            <Route exact path="/education" component={() => <Education education={this.props.education} />} />
            <Route exact path="/skills" component={Skills} />
            <Route exact path="/recommendations" component={() => <Recommendations recommendations={this.props.recommendations} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
