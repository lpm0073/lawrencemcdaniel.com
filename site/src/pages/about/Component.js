import React from 'react';

import { Media } from 'reactstrap';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';
import AboutTile from './tileComponent';
import './styles.css';


const About = (props) => {

        var d = new Date();
        const years_experience = d.getFullYear() - 1992;
        const years_opensource = d.getFullYear() - 2010;
        const years_biking = d.getFullYear() - 1999;

        return(

            <React.Fragment>
                
                <div className="container site-page">
                    <RenderPageTitle theme="light" icon="fa-user" title="ABOUT" boxed_title="ME" />
                    <div className="row mt-5">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <LinkedinBadge />
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <div>
                                <h4 className="mb-3">Great things are done by a series of small things brought together</h4>
                                <div className="text-justify">
                                    <p>I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including <a href="https://aws.amazon.com/"><span>AWS</span></a>, <a href="https://www.djangoproject.com/"><span>Django</span></a>, <a href="https://angular.io/"><span>Angular</span></a>, <a href="https://reactjs.org/"><span>React</span></a>, and <a href="https://wordpress.com/"><span>WordPress</span></a>. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for <a href="https://en.wikipedia.org/wiki/Open_source"><span>open source</span></a>, try to keep things <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself"><span>DRY</span></a> and well-documented and when possible I adhere to the principals of <a href="https://12factor.net/"><span>12-factor</span></a> development. I’m a passionate learner and <a href="https://blog.lawrencemcdaniel.com"><span>frequent blogger</span></a>, currently interested in <a href="/machine-learning/"><span>machine learning</span></a>, AI and quantum computing.</p>                    
                                </div>
                                <Media left middle >
                                    <Media object src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/lawrence-signature.png" alt="lawrence-signature" className="about-signature" />
                                </Media>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 ">
                            <div className="row">
                                <AboutTile icon="fa-globe" value="13" text="Countries worked in" />
                                <AboutTile icon="fa-cloud" value={years_experience} text="Years Experience" />
                                <AboutTile icon="fa-linux" value={years_opensource} text="Years Open Source" />
                                <AboutTile icon="fa-taxi" value={years_biking} text="Years bicycle commuting" />
                            </div>
                            <div className="row mt-1 pt-1">
                                <p className="text-justify">I lived abroad for 25 of the last 30 years, in Mexico, Western Europe and SE Asia. Prior to that I earned a B.S. from University of North Texas with majors in Computer Science and Mathematics and minors in Physics and English.</p>
                                <p><strong>Read my <a href="/bio/"><span>full bio here</span></a>.</strong></p>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
    
        );

}

export default About;    