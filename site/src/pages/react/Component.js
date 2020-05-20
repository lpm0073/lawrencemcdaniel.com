import React from 'react';

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';

import { resumeUrl } from '../../shared/urls';
import './styles.css';


const ReactPage = (props) => {

        return(

            <React.Fragment>
                <div className="site-page">
                    <RenderPageTitle theme="light" icon="fa-react" title="BUILT WITH" boxed_title="REACTJS" />
                    <div className="row mt-lg-5">
                        <div className="col-lg-3 hide-medium">
                            <div className="text-center">
                                <LinkedinBadge />
                                <a className="mt-4 btn btn-danger" role="button" target="_blank" href={resumeUrl} rel="noopener noreferrer">
                                    <i className="fa fa-download"></i> Download Resume
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="text-justify">
                                <p className="">This site uses a <a href="https://github.com/lpm0073/lawrencemcdaniel.com" target="_blank" rel="noopener noreferrer">ReactJS front end</a> 
                                and a backend powered by a <a href="api.lawrencemcdaniel.com" target="_blank">Wordpress REST api</a>. I originally built this site in 2016 with Wordpress when 
                                I was first getting started with web development. I liked the appearance of the original site, so the new React version is nearly identical. I developed 
                                the current ReactJS version in mid-2020 immediately after taking an online 
                                <a href="https://www.coursera.org/learn/front-end-react/home/welcome" target="_blank" rel="noopener noreferrer">ReactJS course</a>. This site was my first 
                                foray into creating a fully-blown ReactJS web application.</p>
                                <div className="">
                                    <hr />
                                    <p >I like ReactJS. I've been working with Angular since 2018 and by comparision I find React more intuitive and more performant. Additionally, 
                                        the ReactJS community is large and growing, which results in more searchable online help content and more and better tooling.</p>
                                    <hr />
                                </div>
                                <p><span className="react-page-leader">Front End</span>: The front end stack is <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a>, 
                                <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a> and minimal custom JS and CSS. The graphics all come from the free version of 
                                <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>. This was intentional. The original Wordpress version used a 
                                professionally-designed third-party theme, and I wanted to see if I could duplicate it using open source tools.</p>
                                
                                <p>Source code: <a href="https://github.com/lpm0073/lawrencemcdaniel.com" target="_blank">https://github.com/lpm0073/lawrencemcdaniel.com</a></p>

                                <p><span className="react-page-leader">Back End</span>: The back end is a Wordpress REST api and the AWS Cloudfront content delivery network. Wordpress is a great back end solution, 
                                though oddly, I never read nor hear much about this. I manage a medium-sized Wordpress hosting platform for my clients so this obviously impacts my decision. 
                                This site mostly needs back-end support to provide image assets. Currently, there are around 500 images on this site which are all ultimately 
                                served by AWS Cloudfront CDN. I like Wordpress because there's a lot of important minutia like backups, security, permissions, 
                                data backups etcetera that Wordpress takes care of out of the box. I use some premium Wordpress plugins to help with image optimization 
                                and CDN synchronization which make adding new images pretty painless. The wordpress site is behind a Varnish cache which means that in practice, 
                                everything is served instantaneously by a proxy server, so its really fast. Lastly, the Wordpress REST api is robust (and free).</p>
                                <p>Backend API URL: <a href="https://api.lawrencemcdaniel.com" target="_blank">https://api.lawrencemcdaniel.com/</a></p>

                                <p><span className="react-page-leader">Infrastructure</span>: This site runs on AWS primarily because I had existing multi-tenant 
                                infrastructure there that I could leverage for this site (see diagram below). But that aside, there are a couple of things about 
                                AWS that are hard to beat for small projects. First, S3/Cloudfront are effectively zero cost, and they are super resilient and 
                                performant. And second, AWS offers Lambda as an alternative to a standalone Linux server, which will save you tons of money 
                                if you're on a limited budget.</p>
                                <p>CDN: <a href="https://cdn.lawrencemcdaniel.com" target="_blank">https://cdn.lawrencemcdaniel.com/</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="aws-diagram hide-medium row mt-lg-5">
                        <img src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/19131001/aws-react-hosting.png" alt="AWS React Hosting Architecture" />
                    </div>
                </div>
            </React.Fragment>
    
        );

}

export default ReactPage;