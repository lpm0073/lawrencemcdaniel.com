import React, { Component} from 'react';

import {Helmet} from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';

import { URL_SITE } from '../../shared/constants';
import { resumeUrl } from '../../shared/constants';

// SEO
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { baseTitle } from '../../shared/seo/gsdCommon';

import './styles.css';


class Contact extends Component {

    render() {
        /* Google Structured Data */
        const slug = "contact";
        const webpageName = "Contact";
        const webpageDescription = "Lawrence McDaniel contact information.";
        const primaryImageUrl = "";
        const pageType = "ContactPage";
        const relatedLink = "";
        const graphExtraData = [gsdPersonLawrenceMcDaniel];

        return(
            <React.Fragment>
                <Helmet>
                    <link rel="canonical" href={URL_SITE + "/contact/"} />
                    <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
                </Helmet>
                <div key="contact-page" className="site-page contact-page">
                    <RenderPageTitle theme="light" icon="fa-phone" title="LETS" boxed_title="TALK" />

                    <div className="row text-center ">
                        <div className="col-md-1"></div>
                        <div className="col-md-5 contact-data">
                            <div className="row mt-3"></div>
                            <div className="">
                                <a target="_blank" href="https://goo.gl/maps/WJy25bNGit2L8Nzz8" rel="noopener noreferrer">
                                    <i className="fa fa-map-marker fa-3x"></i>
                                    <address className="m-b-4">
                                    Lawrence McDaniel, {baseTitle}<br />
                                    210 Broadway, Suite 200<br />
                                    Cambridge, MA 02139<br />
                                    USA
                                    </address>
                                </a>
                                <h6 className="mb-4">Email: <a href="mailto:lpm0073@gmail.com">lpm0073@gmail.com</a></h6>
                                <p className="mb-0">Phone: <a className="mt-4 contact-phone-link" href="tel:+16178346172">+1 (617) 834-6172</a></p>
                                <p>Skype: mcdaniel0073</p>

                                <div className="contact-social-buttons m-4">
                                    <a className="m-1" target="_blank" href="https://linkedin.com/in/lawrencemcdaniel" rel="noopener noreferrer"><i className="fa fa-linkedin-square fa-3x"></i></a>
                                    <a className="m-1" target="_blank" href="https://www.facebook.com/lawrence.p.mcdaniel" rel="noopener noreferrer"><i className="fa fa-facebook-square fa-3x"></i></a>
                                    <a className="m-1" target="_blank" href="https://github.com/lpm0073" rel="noopener noreferrer"><i className="fa fa-github-square fa-3x"></i></a>
                                </div>
                                <a className="m-4 btn btn-danger" role="button" target="_blank" href={resumeUrl} rel="noopener noreferrer">
                                    <i className="fa fa-download"></i> Download Resume
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 m-4">
                            <div className="row qr-code-container m-2 p-2">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <Tabs>
                                        <TabList>
                                        <Tab>Whatsapp</Tab>
                                        <Tab>LinkedIn</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <div>
                                                <h4>
                                                    <span className="col-md-2 mr-2 whatsapp-logo image-container"></span>
                                                    <span className="col-md-10 p-0">Whatsapp QR Code</span>
                                                </h4>
                                            </div>
                                            <div className="col-md-12 whatsapp-qr-code square image-container"></div>

                                        </TabPanel>
                                        <TabPanel>
                                            <div>
                                                <h4>
                                                    <span className="col-md-2 mr-2 linkedin-logo image-container"></span>
                                                    <span className="col-md-10 p-0">LinkedIn QR Code</span>
                                                </h4>
                                            </div>
                                            <div className="col-md-12 linkedin-qr-code square image-container"></div>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default Contact;