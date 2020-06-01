import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { fetchSpecialties, fetchPortfolio, fetchEducation, 
          fetchRecommendations, fetchProjectImages,
          fetchClients } from '../redux/ActionCreators';


// Pages
import { Suspense } from 'react';
import Loading from './Loading';
const Home = React.lazy(() => import('../pages/home/Component'));
const Contact = React.lazy(() => import('../pages/contact/Component'));
const About = React.lazy(() => import('../pages/about/Component'));
const Bio = React.lazy(() => import('../pages/bio/Component'));
const Specialties = React.lazy(() => import('../pages/specialties/Component'));
const Portfolio = React.lazy(() => import('../pages/portfolio/Component'));
const PortfolioDetail = React.lazy(() => import('../pages/portfolioDetail/Component'));
const Education = React.lazy(() => import('../pages/education/Component'));
const Skills = React.lazy(() => import('../pages/skills/Component'));
const Clients = React.lazy(() => import('../pages/clients/Component'));
const MachineLearning = React.lazy(() => import('../pages/machineLearning/Component'));
const ReactPage = React.lazy(() => import('../pages/react/Component'));


const mapStateToProps = state => {
  return {
    logos: state.specialties,
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

    const HomePage = () => {

      return(
        <Suspense fallback={Loading}>
          <Home logos={this.props.logos} />
        </Suspense>
      );
    }
    const ContactPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Contact />
        </Suspense>
      );
    }
    const AboutPage = () => {

      return(
        <Suspense fallback={Loading}>
          <About />
        </Suspense>
      );
    }

    const MachineLearningPage = () => {

      return(
        <Suspense fallback={Loading}>
          <MachineLearning  />
        </Suspense>
      );
    }
    const BioPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Bio />
        </Suspense>
      );
    }
    const SpecialtiesPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Specialties specialties={this.props.specialties} />
        </Suspense>
      );
    }
    const PortfolioPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Portfolio portfolio={this.props.portfolio} />}
        </Suspense>
      );
    }
    const PortfolioWithSlug = ({match}) => {

      return(
        <Suspense fallback={Loading}>
          <PortfolioDetail post={this.props.portfolio.projects.filter((item) => item.slug === match.params.portfolioId)[0]} 
              postLoading={this.props.portfolio.isLoading}
              postErrMess={this.props.portfolio.errMess}
              images={this.props.project}
              imagesLoading={this.props.project.isLoading}
              imagesError={this.props.project.errMess}
          />
        </Suspense>
      );
    }


    const EducationPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Education education={this.props.education} />
        </Suspense>
      );
    }
    const SkillsPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Skills />
        </Suspense>
      );
    }
    const ReactPagePage = () => {

      return(
        <Suspense fallback={Loading}>
          <ReactPage />
        </Suspense>
      );
    }
    const ClientsPage = () => {

      return(
        <Suspense fallback={Loading}>
          <Clients 
            recommendations={this.props.recommendations}
            clients={this.props.clients}
            />} /> 
        </Suspense>
      );
    }

    return(
        <React.Fragment>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/machine-learning" component={MachineLearningPage} />
            <Route exact path="/bio" component={BioPage} />
            <Route exact path="/specialties" component={SpecialtiesPage} />
            <Route exact path="/portfolio" component={PortfolioPage} />
            <Route path="/portfolio/:portfolioId" component={PortfolioWithSlug} />
            <Route exact path="/education" component={EducationPage} />
            <Route exact path="/skills" component={SkillsPage} />
            <Route exact path="/reactjs" component={ReactPagePage} />
            <Route exact path="/clients" component={ClientsPage} />
            <Redirect to="/home" />
          </Switch>
        </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
