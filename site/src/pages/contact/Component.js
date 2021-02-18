import React, { Component} from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import {resumeUrl} from '../../shared/urls';
import {Helmet} from "react-helmet";
import { gsdGraph } from '../../shared/seo/gsdGraph';
import './styles.css';


class Contact extends Component {

    render() {

        return(
            <React.Fragment>
                <Helmet>
                    <link rel="canonical" href="https://lawrencemcdaniel.com/contact" />
                    <script type="application/ld+json">{JSON.stringify(gsdGraph(
                        "contact", 
                        "Contact Information",
                        "Lawrence McDaniel contact information.", 
                        "",
                        "ContactPage"
                    ))}</script>
                </Helmet>
                <div key="contact-page" className="site-page contact-page">
                    <RenderPageTitle theme="light" icon="fa-phone" title="LETS" boxed_title="TALK" />

                    <div className="row text-center mt-5">
                        <div className="col-md-1"></div>
                        <div className="col-md-6 contact-data">
                            <div>
                            <a target="_blank" href="https://goo.gl/maps/WJy25bNGit2L8Nzz8" rel="noopener noreferrer">
                                <i class="fa fa-map-marker fa-3x"></i>
                                <address className="m-b-4">
                                Lawrence McDaniel, Full Stack Developer<br />
                                210 Broadway, Suite 200<br />
                                Cambridge, MA 02139<br />
                                USA
                                </address>
                            </a>
                            </div>
                            <h6 className="mb-4">Email: <a href="mailto:lpm0073@gmail.com">lpm0073@gmail.com</a></h6>
                            <p className="mb-0">Phone: <a className="mt-4 contact-phone-link" href="tel:+16178346172">+1 (617) 834-6172</a></p>
                            <p>Skype: mcdaniel0073</p>

                            <div className="contact-social-buttons m-4">
                                <a className="m-1" target="_blank" href="https://linkedin.com/in/lawrencemcdaniel" rel="noopener noreferrer"><i class="fa fa-linkedin-square fa-3x"></i></a>
                                <a className="m-1" target="_blank" href="https://www.facebook.com/lawrence.p.mcdaniel" rel="noopener noreferrer"><i class="fa fa-facebook-square fa-3x"></i></a>
                                <a className="m-1" target="_blank" href="https://github.com/lpm0073" rel="noopener noreferrer"><i class="fa fa-github-square fa-3x"></i></a>
                            </div>
                            <a className="m-4 btn btn-danger" role="button" target="_blank" href={resumeUrl} rel="noopener noreferrer">
                                <i className="fa fa-download"></i> Download Resume
                            </a>
                        </div>
                        <div className="col-md-4 m-4">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                                <h4 className="mb-4">Whatsapp QR Code</h4>
                                <div className="col-md-12 whatsapp-qr-code square"></div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default Contact;