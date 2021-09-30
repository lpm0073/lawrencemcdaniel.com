import React, { Component} from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import {resumeUrl} from '../../shared/urls';
import {Helmet} from "react-helmet";
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import {baseTitle} from '../../shared/seo/gsdCommon';
import './styles.css';


class QR extends Component {

    render() {
        /* Google Structured Data */
        const slug = "qr";
        const webpageName = "QR Code";
        const webpageDescription = "QR Code for lawrencemcdaniel.com";
        const primaryImageUrl = "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2016/09/22195707/favicon.jpg";
        const pageType = "";
        const relatedLink = "";
        const graphExtraData = [gsdPersonLawrenceMcDaniel];

        return(
            <React.Fragment>
                <Helmet>
                    <link rel="canonical" href="https://lawrencemcdaniel.com/qr/" />
                    <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
                </Helmet>
                <div key="qr-page" className="site-page qr-page">
                    <RenderPageTitle theme="light" icon="fa-phone" title="QR" boxed_title="CODE" />

                    <div className="row text-center mt-md-5">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 m-4">
                            <div className="row qr-code-container mb-sm-5 pb-sm-5">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div>
                                        <h4>
                                            <span className="col-md-2 mr-2 lawrencemcdaniel-logo image-container"></span>
                                            <span className="col-md-10 p-0">lawrencemcdaniel.com</span>
                                        </h4>
                                    </div>
                                    <div className="col-md-12 lawrencemcdaniel-qr-code square image-container"></div>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default QR;