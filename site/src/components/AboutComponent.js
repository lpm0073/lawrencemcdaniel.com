import React from 'react';
import RenderPageTitle from '../widgets/pageTitleComponent';
import RenderAboutTile from '../widgets/aboutTileComponent';



function About(props) {

    return(
        
        <div className="container site-page">
            <RenderPageTitle icon="fa-user" title="ABOUT" boxed_title="ME" />
            <div className="row row-content">
                <div className="col-xs-6 col-sm">
                    <h2>LinkedIn</h2>
                </div>
                <div className="col-xs-6 col-sm">
                    <h4>Great things are done by a series of small things brought together.</h4>
                    <p>I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including AWS, Django, Angular, React, and WordPress. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for open source, try to keep things DRY and well-documented and when possible I adhere to the principals of 12-factor development. I’m a passionate learner and frequent blogger, currently interested in machine learning, AI and quantum computing.</p>
                    <p>I lived abroad for 25 of the last 30 years, in Mexico, Western Europe and SE Asia. Prior to that I earned a B.S. from University of North Texas with majors in Computer Science and Mathematics and minors in Physics and English. You can read my full bio here.</p>
                    <p>https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/lawrence-signature.png</p>
                </div>
                <div className="col-xs-6 col-sm">
                    <h2>boxes</h2>
                    <div className="row row-content">
                        <RenderAboutTile icon="fa-globe" value="13" text="Countries worked in" />
                        <RenderAboutTile icon="fa-cloud" value="27" text="Years Experience" />
                        <RenderAboutTile icon="fa-linux" value="10" text="Years Open Source" />
                        <RenderAboutTile icon="fa-taxi" value="22" text="Years bicycle commuting" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;    