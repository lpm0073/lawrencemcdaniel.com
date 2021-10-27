import React from 'react';

import { resumeUrl } from '../../shared/urls';
import './styles.css';

export default function Footer(props) {

    var d = new Date();
    const curr_year = d.getFullYear();

    return(
        <React.Fragment>
            <footer key="app-footer">
                <div className="footer">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="text-center">                        
                                <a className="mx-1" href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a><span> | </span>
                                <a className="mx-1" href="https://www.linkedin.com/in/lawrencemcdaniel/" target="_blank" rel="noopener noreferrer">LinkedIn</a><span> | </span>
                                <a className="mx-1 hide-small" href="https://github.com/lpm0073" target="_blank" rel="noopener noreferrer">Github</a><span className="hide-small"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-0 react-banner">
                        <div className="col-12">
                            <div className="text-center mr-3 mb-2">
                                <img key="1" className="react-logo" src="/assets/images/react-logo-300x261.png" alt="ReactJS logo" />
                                Progressive Web App Built with ReactJS, Redux and Workbox. <a className="mx-1 learn-more-link" href="/reactjs" target="_self">Learn more</a>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">             
                        <div className="col-auto">
                            <p>© Copyright 2015 - {curr_year}.<span className="hide-medium"> edX and <a className="mx-1 " href="https://open.edx.org/" target="_blank" rel="noopener noreferrer"><span className="edx-links">Open edX</span></a> are registered trademarks of <a className="mx-1" href="https://www.edx.org/" target="_blank" rel="noopener noreferrer"><span className="edx-links">edX Inc.</span></a> All Rights Reserved.</span></p>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}
