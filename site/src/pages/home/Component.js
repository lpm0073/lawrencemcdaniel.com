import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import { Fade } from 'react-animation-components';
import { Offline } from "react-detect-offline";
import LogoCube from '../../components/logoCube/Component';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import {basePageTitle, baseTitle} from '../../shared/seo/gsdCommon';
import {Helmet} from "react-helmet";
import { URL_SITE } from '../../shared/urls';

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
        /* Google Structured Data */
        const slug = "home";
        const webpageName = basePageTitle;
        const webpageDescription = "Full Stack Web Developer and Open edX® Consultant specializing in Python, Django, ReactJS, Redux, AngularJS, and AWS.";
        const primaryImageUrl = "";
        const pageType = "";
        const relatedLink = "";
        const graphExtraData = [gsdPersonLawrenceMcDaniel];

        return(
                <React.Fragment>
                    <Helmet>
                        <link rel="canonical" href={URL_SITE + "/home/"} />
                        <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
                    </Helmet>
                    <div key="home-page" className="jumbotron dark-background">
                        <div className="h-100">
                            <div className="row pt-5 m-0 mr-0 px-0 jumbotron-spacer">
                                <div className="col-lg-6 pt-5 col-md-12 text-center noselect ">
                                    <h1 className="display-4">
                                        <span className="px-3 super-bold pre-wrap">Lawrence McDaniel</span>
                                    </h1>
                                    {this.props.homePage.isSet ? 
                                        <p className="jumbotron-subtitle pre-wrap">{baseTitle}</p>
                                        :
                                        <Fade in> 
                                            <div className="">
                                                <p className="jumbotron-subtitle mb-0">{baseTitle}</p>
                                                <p className="lead mt-0 mb-0 hide-medium">
                                                    <span className="open-edx-consultant-bookends" role="img" aria-label="Close">⇥📙📚 </span>
                                                    <a href="/openedx"><span className="open-edx-consultant">Open edX® Consultant</span></a>
                                                    <span className="open-edx-consultant-bookends" role="img" aria-label="Close"> 📚📘⇤</span>
                                                </p>
                                            </div>
                                        </Fade>
                                    }
                                </div>
                                <div className="col-lg-6 pt-5 col-md-12">
                                    <LogoCube />
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div className="row mx-0 react-banner">
                        <div className="col-12">
                            <div className="text-right mr-3 mb-1">
                                <Offline><div className="offline"><span className="fa fa-stop-circle"></span> Check your internet connection.</div></Offline>
                            </div>
                            <div className="text-right mr-3 mb-2">
                                <img className="react-logo" src="/assets/images/react-logo-300x261.png" alt="ReactJS logo" />
                                Progressive Web App Built with ReactJS, Redux and Workbox. <a className="mx-1 learn-more-link" href="/reactjs" target="_self">Learn more</a>
                            </div>
                        </div>
                    </div>
                </React.Fragment>

            );
        
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
