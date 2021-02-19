import React from 'react';

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';
import {Helmet} from "react-helmet";
import { resumeUrl } from '../../shared/urls';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { gsdArticle } from '../../shared/seo/gsdArticle';
import './styles.css';

const ReactPage = (props) => {
    /* Google Structured Data */
    const slug = "reactjs";
    const webpageName = "ReactJS";
    const webpageDescription = "Built with ReactJS.";
    const primaryImageUrl = "";
    const pageType = "";
    const relatedLink = "";
    const graphExtraData = [gsdPersonLawrenceMcDaniel(false, false, false, props), gsdArticle(slug, webpageDescription)];

    return(
        <React.Fragment>
            <Helmet>
                <link rel="canonical" href="https://lawrencemcdaniel.com/reactjs/" />
                <meta name="description" content="Full Stack Web Developer with extensive experience using ReactJS and Redux. Follow links to the GitHub repository for this site." />
                <meta property="og:description" content="Full Stack Web Developer with extensive experience using ReactJS and Redux. Follow links to the GitHub repository for this site." />
                <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
            </Helmet>
            <div key="react-page" className="site-page react-page">
                <RenderPageTitle theme="light" icon="fa-react" title="BUILT WITH" boxed_title="REACTJS" />
                <div className="row mt-lg-5 pl-2">
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
                            <p className="">This site uses a <a href="https://github.com/lpm0073/lawrencemcdaniel.com" target="_blank" rel="noopener noreferrer">ReactJS/Redux</a> front end and a backend powered by a <a href="https://api.lawrencemcdaniel.com/" target="_blank" rel="noopener noreferrer">Wordpress REST api</a>. I originally built this site in 2016 with Wordpress when I was first getting started with web development. I liked the appearance of the original site, so the new React version is nearly identical. I developed the current ReactJS version in mid-2020 immediately after taking an online <a href="https://www.coursera.org/learn/front-end-react/home/welcome" target="_blank" rel="noopener noreferrer">ReactJS course</a> on Coursera.com. This site was my first foray into creating a fully-blown ReactJS/Redux web application.</p>
                            <div className="">
                                <hr />
                                <p >I like ReactJS. I've been working with Angular since 2018 and by comparision I find React more intuitive and more performant. Additionally, 
                                    the ReactJS community is large and growing, which results in more searchable online help content and more and better tooling.</p>
                                <hr />
                            </div>
                            <p><span className="react-page-leader">Front End</span>: The front end stack is <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS/Redux</a>, <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a> and minimal custom JS and CSS. The graphics all come from the free version of <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>. This was intentional. The original Wordpress version used a professionally-designed third-party theme, and I wanted to see if I could duplicate it using open source tools. I encountered a variety of design and technical challenges with the home page, which you can read more about in this blog post, <a href="https://blog.lawrencemcdaniel.com/animations-in-reactjs/" target="_blank" rel="noopener noreferrer">Animations in ReactJS</a>.</p>
                            <p>Source code: <a href="https://github.com/lpm0073/lawrencemcdaniel.com" target="_blank" rel="noopener noreferrer">https://github.com/lpm0073/lawrencemcdaniel.com</a></p>
                            <p>I designed and coded the logo cube animation on the home page and then later wrote <a href="https://blog.lawrencemcdaniel.com/animations-in-reactjs/" target="_blank" rel="noopener noreferrer">this blog article</a> that discusses my design considerations and some of the unique challenges I encountered along the way, and their solutions.</p>
                            <p><span className="react-page-leader">Back End</span>: The back end is a Wordpress REST api and the AWS Cloudfront content delivery network. Wordpress is a great back end solution, though oddly, I never read nor hear much about this. I manage a medium-sized Wordpress hosting platform for my clients so this obviously impacts my decision. This site mostly needs back-end support to provide image assets. Currently, there are around 500 images on this site which are all ultimately served by AWS Cloudfront CDN. I like Wordpress because there's a lot of important minutia like backups, security, permissions, data backups etcetera that Wordpress takes care of out of the box. I use some premium Wordpress plugins to help with image optimization and CDN synchronization which make adding new images pretty painless. The wordpress site is behind a Varnish cache which means that in practice, everything is served instantaneously by a proxy server, so its really fast. Lastly, the Wordpress REST api is robust (and free).</p>
                            <p>Backend API URL: <a href="https://api.lawrencemcdaniel.com" target="_blank" rel="noopener noreferrer">https://api.lawrencemcdaniel.com/</a></p>
                            <p><span className="react-page-leader">Infrastructure</span>: This site runs on AWS primarily because I had existing multi-tenant infrastructure there that I could leverage for this site (see diagram below). But that aside, there are a couple of things about AWS that are hard to beat for small projects. First, S3/Cloudfront are effectively zero cost, and they are super resilient and performant. And second, AWS offers Lambda as an alternative to a standalone Linux server, which will save you tons of money if you're on a limited budget.</p>
                            <p>CDN: <a href="https://cdn.lawrencemcdaniel.com" target="_blank" rel="noopener noreferrer">https://cdn.lawrencemcdaniel.com/</a></p>
                        </div>
                    </div>
                </div>
                
                <div className="aws-diagram hide-medium row mt-lg-5 pl-2 ml-0 mr-0">
                <img src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/19131001/aws-react-hosting.png" alt="AWS React Hosting Architecture" />
                </div>
            </div>
        </React.Fragment>

    );

}

export default ReactPage;