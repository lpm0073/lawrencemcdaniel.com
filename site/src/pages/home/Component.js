import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import LogoCube from '../../components/logoCube/Component';
import FullStackDeveloper from '../../components/FullStackDeveloper';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { basePageTitle } from '../../shared/seo/gsdCommon';
import { Helmet } from "react-helmet";
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
                                    <FullStackDeveloper idx="1" cls="" />
                                </div>
                                <div className="col-lg-6 pt-5 col-md-12">
                                    <LogoCube />
                                </div>
                            </div>
                        </div>                    
                    </div>
                </React.Fragment>

            );
        
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
