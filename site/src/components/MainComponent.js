import React, { Component } from 'react';
import Header from './header/Component';
import Footer from './footer/Component';
import Home from '../pages/home/Component';
import Contact from '../pages/contact/Component';
import About from '../pages/about/Component';
import Bio from '../pages/bio/Component';
import Specialties from '../pages/specialities/Component';
import Portfolio from '../pages/portfolio/Component';
import Education from '../pages/education/Component';
import Recommendations from '../pages/recommendations/Component';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postFeedback, fetchSpecialties, fetchPortfolio, fetchEducation } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    specialties: state.specialties,
    portfolio: state.portfolio,
    education: state.education
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  postFeedback: (firstname, lastname, telnum, email, agree, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, message)),
  fetchSpecialties: () => {dispatch(fetchSpecialties())},
  fetchPortfolio: () => {dispatch(fetchPortfolio())},
  fetchEducation: () => {dispatch(fetchEducation())}
});

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchSpecialties();
    this.props.fetchPortfolio();
    this.props.fetchEducation();
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
            <Route exact path="/recommendations" component={Recommendations} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
