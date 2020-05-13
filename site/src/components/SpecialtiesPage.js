import React from 'react';

import RenderPageTitle from '../widgets/pageTitleComponent';

const Specialties = (props) => {

        return(

            <React.Fragment>
                <div className="specialties-page">
                    <div className="container site-page ">
                        <RenderPageTitle icon="fa-pencil-square-o" title="MY" boxed_title="SPECIALTIES" />
                        <div className="row specialties-banner pt-5">
                            <div className="col-4 pr-0">
                                <h4>FULL STACK DEVELOPMENT</h4>
                                <div className="row m-0">
                                    <div className="col-3 m-1 p-0 specialties-banner-icon">
                                        <i className="fa fa-html5 fa-3x "></i>
                                    </div>
                                    <div className="col-7 m-1 p-0 text-justify specialties-banner-text">
                                        <p>Hybrid mobile apps with Ionic + Cordova, and responsive web apps developed with Angular, WordPress, Ruby on Rails, and pure HTML5; all following agile methodologies and backed by AWS' infinitely-scalable suite of web services.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 pl-0 pr-0">
                                <h4>BUSINESS ANALYSIS</h4>
                                <div className="row">
                                    <div className="col-3 specialties-banner-icon">
                                        <i className="fa fa-database fa-3x"></i>
                                    </div>
                                    <div className="col-7 text-justify specialties-banner-text pr-0">
                                        <p>Well-rounded business analyst specializing in predictive analytics, forensics and algorithm analysis using Excel/VBA, Octave and R. Extensive database and data science background.</p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-4 pl-0">
                                <h4>OPEN EDX</h4>
                                <div className="row">
                                    <div className="col-3 specialties-banner-icon">
                                        <i className="fa fa-mortar-board fa-3x"></i>
                                    </div>
                                    <div className="col-7 text-justify specialties-banner-text">
                                        <p>Installation, configuration, customization and training of the Open edX learning management system and course development studio. Author of one of the industry's most important technical technical how-to blog sites.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
    
        );

}

export default Specialties;