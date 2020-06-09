import React from 'react';
import { a } from 'react-router-dom';
import { resumeUrl } from '../../shared/urls';
import './styles.css';

function Footer(props) {

    var d = new Date();
    const curr_year = d.getFullYear();

    return(
        <React.Fragment>
            <div key="app-footer">
                <div className="row mx-0 react-banner">
                    <div className="col-12">
                        <div className="text-right mr-3 mb-2">
                            <img className="react-logo" src="/assets/images/react-logo-300x261.png" />
                            Built with ReactJS & Redux. <a className="mx-1 footer-extra-links" href="/reactjs" target="_self">Learn more</a>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="text-center">                        
                                <a className="mx-1" href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a><span> | </span>
                                <a className="mx-1" href="https://www.linkedin.com/in/lawrencemcdaniel/" target="_blank" rel="noopener noreferrer">LinkedIn</a><span> | </span>
                                <a className="mx-1" href="https://www.facebook.com/lawrence.p.mcdaniel" target="_blank" rel="noopener noreferrer">Facebook</a><span className="footer-extra-links"> | </span>
                                <a className="mx-1 footer-extra-links" href="https://github.com/lpm0073" target="_blank" rel="noopener noreferrer">Github</a><span className="footer-extra-links"> | </span>
                                <a className="mx-1 footer-extra-links" href="https://angel.co/lpm0073-gmail-com" target="_blank" rel="noopener noreferrer">Angel Network</a><span className="footer-extra-links"> | </span>
                                <a className="mx-1 footer-extra-links" href="https://www.codementor.io/lawrencemcdaniel" target="_blank" rel="noopener noreferrer">Codementor.io</a><span className="footer-extra-links"> | </span>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">             
                        <div className="col-auto">
                            <p>© Copyright 2015 - {curr_year}. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Footer;