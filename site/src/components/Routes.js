import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { fetchSpecialties, fetchPortfolio, fetchEducation, 
          fetchRecommendations, fetchProjectImages,
          fetchClients } from '../redux/ActionCreators';

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
import Clients from '../pages/clients/Component';
import MachineLearning from '../pages/machineLearning/Component';
import ReactPage from '../pages/react/Component';


const mapStateToProps = state => {
  return {
    specialties: state.specialties,
    portfolio: state.portfolio,
    education: state.education,
    recommendations: state.recommendations,
    project: state.project,
    clients: state.clients
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchSpecialties: () => {dispatch(fetchSpecialties())},
  fetchPortfolio: () => {dispatch(fetchPortfolio())},
  fetchEducation: () => {dispatch(fetchEducation())},
  fetchRecommendations: () => {dispatch(fetchRecommendations())},
  fetchProjectImages: () => {dispatch(fetchProjectImages())},
  fetchClients: () => {dispatch(fetchClients())}
});


class Routes extends Component {
  
  componentDidMount() {
    this.props.fetchSpecialties();
    this.props.fetchPortfolio();
    this.props.fetchEducation();
    this.props.fetchRecommendations();
    this.props.fetchProjectImages();
    this.props.fetchClients();
  }

  render() {

    const PortfolioWithSlug = ({match}) => {

      return(
        <PortfolioDetail post={this.props.portfolio.projects.filter((item) => item.slug === match.params.portfolioId)[0]} 
            postLoading={this.props.portfolio.isLoading}
            postErrMess={this.props.portfolio.errMess}
            images={this.props.project}
            imagesLoading={this.props.project.isLoading}
            imagesError={this.props.project.errMess}
        />
      );
    }

    return(
        <React.Fragment>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/machine-learning" component={MachineLearning} />
            <Route exact path="/bio" component={Bio} />
            <Route exact path="/specialties" component={() => <Specialties specialties={this.props.specialties} />} />
            <Route exact path="/portfolio" component={() => <Portfolio portfolio={this.props.portfolio} />} />
            <Route path="/portfolio/:portfolioId" component={PortfolioWithSlug} />
            <Route exact path="/education" component={() => <Education education={this.props.education} />} />
            <Route exact path="/skills" component={Skills} />
            <Route exact path="/reactjs" component={ReactPage} />
            <Route exact path="/clients" component={() => <Clients 
                                                              recommendations={this.props.recommendations}
                                                              clients={this.props.clients}
                                                             />} />
            <Redirect to="/home" />
          </Switch>
        </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
