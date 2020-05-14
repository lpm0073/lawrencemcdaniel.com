import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutPage';
import Bio from './BioPage';
import Specialties from './SpecialtiesPage';
import Portfolio from './PortfolioPage';
import Education from './EducationPage';
import Recommendations from './RecommendationsPage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postFeedback, fetchSpecialties, fetchPortfolio } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    specialties: state.specialties,
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  postFeedback: (firstname, lastname, telnum, email, agree, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, message)),
  fetchSpecialties: () => {dispatch(fetchSpecialties())},
  fetchPortfolio: () => {dispatch(fetchPortfolio())}
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchSpecialties();
    this.props.fetchPortfolio();
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
            <Route exact path="/specialties" component={() => <Specialties props={this.props.specialties} />} />
            <Route exact path="/portfolio" component={() => <Portfolio props={this.props.portfolio} />} />
            <Route exact path="/education" component={Education} />
            <Route exact path="/recommendations" component={Recommendations} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
