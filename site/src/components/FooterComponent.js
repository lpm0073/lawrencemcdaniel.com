import React from 'react';
import { a } from 'react-router-dom';

function Footer(props) {

    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="text-center">                        
                            <a className="mx-1" href="http://cdn.lawrencemcdaniel.com/doc/lawrence-mcdaniel-resume-201911.pdf" target="_blank">Resume</a><span> | </span>
                            <a className="mx-1" href="https://www.linkedin.com/in/lawrencemcdaniel/" target="_blank">LinkedIn</a><span> | </span>
                            <a className="mx-1" href="https://www.facebook.com/lawrence.p.mcdaniel" target="_blank">Facebook</a><span> | </span>
                            <a className="mx-1" href="https://github.com/lpm0073" target="_blank">Github</a><span> | </span>
                            <a className="mx-1" href="https://angel.co/lpm0073-gmail-com" target="_blank">Angel Network</a><span> | </span>
                            <a className="mx-1" href="https://www.codementor.io/lawrencemcdaniel" target="_blank">Codementor.io</a><span> | </span>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2015 - 2020. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Footer;