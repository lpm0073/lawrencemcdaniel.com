import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import { Fade } from 'react-animation-components';
import LogoCube from '../../components/logoCube/Component';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import {Helmet} from "react-helmet";

import './styles.css';

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

class Home extends Component {

    componentWillUnmount() {
        this.props.actions.setHomePage();
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    {/* 
                        Google structured data: https://developers.google.com/search/docs/guides/intro-structured-data
                        note that using a script tag with src does not work.
                        
                        https://stackoverflow.com/questions/30864619/does-json-ld-have-to-be-embedded 
                        https://stackoverflow.com/questions/29064209/does-schema-org-markup-work-if-markup-is-dynamically-built-with-javascript/29066759#29066759
                    */}
                    <script type="application/ld+json">{JSON.stringify(gsdGraph(
                        "home", 
                        "Full Stack Developer",
                        "I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including Django, React, Angular, and WordPress. I also work extensively with the Open edX® learning management system. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for open source, try to keep things DRY and well-documented and when possible I adhere to the principals of 12-factor development. I’m a passionate learner and frequent blogger, currently interested in machine learning, AI and quantum computing.", 
                        "",
                        ""
                    ))}</script>
                </Helmet>
                <div key="home-page" className="jumbotron dark-background">
                    <div className="h-100">
                        <div className="row ml-0 mr-0 px-0 jumbotron-spacer">
                            <div className="col-lg-6 col-md-12 text-center noselect ">
                                <h1 className="display-4">
                                    <span className="px-3 super-bold pre-wrap">Lawrence McDaniel</span>
                                </h1>
                                {this.props.homePage.isSet ? 
                                    <p className="jumbotron-subtitle pre-wrap">Full Stack Developer</p>
                                    :
                                    <Fade in> 
                                        <div className="">
                                            <p className="jumbotron-subtitle mb-0">Full Stack Developer</p>
                                            <p className="lead mt-0 mb-0 hide-medium">
                                                <span className="open-edx-consultant-bookends" role="img" aria-label="Close">⇥📙📚 </span>
                                                <a href="/openedx"><span className="open-edx-consultant">Open edX® Consultant</span></a>
                                                <span className="open-edx-consultant-bookends" role="img" aria-label="Close"> 📚📘⇤</span>
                                            </p>
                                        </div>
                                    </Fade>
                                }
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <LogoCube />
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="row mx-0 react-banner">
                    <div className="col-12">
                        <div className="text-right mr-3 mb-2">
                            <img className="react-logo" src="/assets/images/react-logo-300x261.png" alt="ReactJS logo" />
                            Built with ReactJS & Redux. <a className="mx-1 learn-more-link" href="/reactjs" target="_self">Learn more</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
