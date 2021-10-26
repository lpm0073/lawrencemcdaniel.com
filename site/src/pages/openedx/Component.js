import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';
import ClientGrid from '../../components/clientGrid/Component';
import {Helmet} from "react-helmet";
import { gsdServiceOpenedX } from '../../shared/seo/gsdServiceOpenedx';
import { gsdFAQ } from '../../shared/seo/gsdFAQ';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import { nameLawrenceMcDaniel} from '../../shared/seo/gsdCommon';
import { gsdArticle } from '../../shared/seo/gsdArticle';
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence';
import { URL_SITE } from '../../shared/urls';
import './styles.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


const Openedx = (props) => {
        /* Google Structured Data */
        const slug = "openedx";
        const headline = "Open edX® Consulting";
        const webpageDescription = "I am a 20-year veteran web developer specializing in the <a href='https://open.edx.org/' target='_blank' rel='noopener noreferrer'>Open edX® platform</a>. Thousands of organizations around the world have used my <a href='https://blog.lawrencemcdaniel.com/category/open-edx/' target='_blank' rel='noopener noreferrer'>Open edX® blog articles</a> to turn their online education vision into reality. In fact, my how-to guides and tutorials on <a href='https://blog.lawrencemcdaniel.com/open-edx-installation/' target='_blank' rel='noopener noreferrer'>production installation</a>, <a href='https://blog.lawrencemcdaniel.com/scaling-open-edx/' target='_blank' rel='noopener noreferrer'>platform scaling</a>, <a href='https://blog.lawrencemcdaniel.com/open-edx-custom-theming-tutorial/' target='_blank' rel='noopener noreferrer'>custom theming</a>, and <a href='https://blog.lawrencemcdaniel.com/open-edx-configuration-tutorial/' target='_blank' rel='noopener noreferrer'>configuration</a> have been viewed more than fifty thousand times.";
        const primaryImageUrl = "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2021/02/19234328/open-edx-conference-2018.jpeg";
        const pageType = "BlogPosting";
        const relatedLink = "";
        const graphExtraData = [gsdPersonLawrenceMcDaniel, gsdArticle(slug, headline), gsdServiceOpenedX, gsdFAQ];

        return(
            <div>
                <Helmet>
                    <title>Open edX Consultant</title>
                    <link rel="canonical" href={URL_SITE + "/openedx/"} />

                    <meta name="description" content="Free initial consultation. Turnkey installation, configuration, theming, customization, systems integration, LTI integration, custom oAuth, and support of the Open edX® Learning Management System." />
                    <meta name="keywords"  content="Lawrence McDaniel, open edx, open edx consulting, open edx service providers, open edx installation, open edx configuration, open edx customization, open edx training, open edx support, open edx documentation, consultations, free quotations, free consultations, lti integration. oauth, SAML" />

                    <meta property="og:description" content="Free initial consultation. Turnkey installation, configuration, theming, customization, systems integration, LTI integration, custom oAuth, and support of the Open edX® Learning Management System." />
                    <meta property="og:title" content={nameLawrenceMcDaniel} />
                    <meta property="og:site_name" content={nameLawrenceMcDaniel} />
                    <meta property="og:url" content={URL_SITE + "/openedx"} />

                    <meta name="twitter:title" content={nameLawrenceMcDaniel} />
                    <meta name="twitter:description" content={nameLawrenceMcDaniel} />

                    <script type="application/ld+json">{JSON.stringify(gsdGraph(slug, headline, webpageDescription, primaryImageUrl, pageType, relatedLink, graphExtraData))}</script>
                </Helmet>
                <div key="openedx-page" className="site-page openedx-page">
                    <RenderPageTitle theme="light" icon="fa-align-left" title="Open edX®" boxed_title="Consulting" />
                    <div className="row mt-5">
                        <div className="col-lg-3 hide-medium">
                            <div className="pl-3 text-center">
                                <LinkedinBadge />
                                <a className="mt-4 btn btn-danger" role="button" target="_self" href="/contact">
                                        <i className="fa fa-phone"></i> Contact Me
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="text-justify ml-lg-0 mr-lg-5 mx-2">
                                <p>I am a 20-year veteran web developer specializing in the <a href="https://open.edx.org/" target="_blank" rel="noopener noreferrer">Open edX® platform</a>. Thousands of organizations around the world have used my <a href="https://blog.lawrencemcdaniel.com/category/open-edx/" target="_blank" rel="noopener noreferrer">Open edX® blog articles</a> to turn their online education vision into reality. In fact, my how-to guides and tutorials on <a href="https://blog.lawrencemcdaniel.com/open-edx-installation/" target="_blank" rel="noopener noreferrer">production installation</a>, <a href="https://blog.lawrencemcdaniel.com/scaling-open-edx/" target="_blank" rel="noopener noreferrer">platform scaling</a>, <a href="https://blog.lawrencemcdaniel.com/open-edx-custom-theming-tutorial/" target="_blank" rel="noopener noreferrer">custom theming</a>, and <a href="https://blog.lawrencemcdaniel.com/open-edx-configuration-tutorial/" target="_blank" rel="noopener noreferrer">configuration</a> have been viewed more than fifty thousand times.</p>
                                <p>Based in North America, I split my time between Cambridge, Massachusetts and Mexico City. As a freelancer with a low-overhead lifestyle I tend to be the most economical option in many cases. I provide personalized service and fast response to clients located around the world. All of my customers have my personal mobile phone number and can reach me any time by <a href="/contact">voice, whatsapp or email</a>. My <a href="/portfolio">Portfolio</a>, <a href="/clients">Client List and Recommendations</a> are all available on this site.</p>
                                <ul className="mx-0 mr-lg-5">
                                    <li>Free initial consultations in English and Spanish.</li>
                                    <li>Are you in planning stages of an Open edX® project?</li>
                                    <li>Are you looking for a low-risk deployment solution and an Open edX® service provider with a proven track record?</li>
                                    <li>Do you need affordable full-service administration and technical support?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="text-justify mx-lg-5 mx-2">
                                <h3 className="mt-lg-5 mt-1">Services That I Provide to the Open edX® Community</h3>
                                <hr />
                                <h4>Production Installation & Configuration of Open edX®</h4>
                                <p>You should consider hiring a professional to install your Open edX® plaform for you, if your budget permits. I have performed dozens of production installations for clients since 2016 on cloud platforms including AWS and Digital Ocean as well as specialized regional cloud providers across Asia and Afrika. I publish technical articles that fully describe all of my methods for preparing your Open edX® platform for production use, including <a href="https://blog.lawrencemcdaniel.com/open-edx-complete-backup-solution/" target="_blank" rel="noopener noreferrer">off-site data backup</a>, setting up <a href="https://blog.lawrencemcdaniel.com/open-edx-setup-smtp-email/" target="_blank" rel="noopener noreferrer">SMTP email</a>, adding <a href="https://blog.lawrencemcdaniel.com/open-edx-ssl-encryption/" target="_blank" rel="noopener noreferrer">SSL certificates</a>, and taking care of SEO.</p>
                                <p>I am an expert in configuring the Open edX platform for a variety of common use cases including multi-language and e-commerce enabled platforms of widely varying scale. Open edX® is a mature and stable platform that is also highly configurable. Many customization requests can be implemented via the platform's many configuration parameters. However, configuring the Open edX® platform is a knowledge and experience-intensive endeavor. Properly managing your configuration is also something of a trade craft which you can read more about, here, <a href="https://blog.lawrencemcdaniel.com/open-edx-configuration-management-tutorial/" target="_blank" rel="noopener noreferrer">Open edX Configuration Management Tutorial</a></p>
                                <h4>Custom Theming</h4>
                                <p>You can customize the appearance of your Open edX® platform by creating and implementing a custom theme. In addition to creating a turn-key custom theming solution for your organization, I have also worked with many organizations around the world to train their inhouse graphic and web designers on how to re-style the look & feel of the platform as well as how to add custom content. You can read more, here, <a href="https://blog.lawrencemcdaniel.com/open-edx-custom-theming-tutorial/" target="_blank" rel="noopener noreferrer">Open edX Custom Theming Tutorial</a> and here, <a href="https://blog.lawrencemcdaniel.com/styling-open-edx-tips-and-tricks/" target="_blank" rel="noopener noreferrer">Styling Open EdX Tips and Tricks</a></p>
                                <h4>Scaling and Capacity Planning</h4>
                                <p>I work with clients around the globe to ensure that their users' experiences are performant and reliable. Open edX® is massively scalable, as you can see from the site <a href="https://www.edx.org/">edx.org</a> which is one of the largest MOOCs in the world and which runs on exactly the same software and is supported by the same team. The Open edX® platform leverages considerable open source community know-how and best practices in order to maximize its configurability and scalability. Mind you however, scaling is a highly technical topic, and even more so in the case of a complex platform like Open edX®. You can read more, here, <a href="https://blog.lawrencemcdaniel.com/scaling-open-edx/" target="_blank" rel="noopener noreferrer">Scaling Open edX</a></p>
                                <h4>Administration & Devops</h4>
                                <p>I provide front-line support for all versions of the Open edX® platform to clients around the world. I also provide technical training to organizations' inhouse IT teams in order to help them prepare for common production live support situations.</p>
                                <h4>Custom Programming</h4>
                                <p>Most clients never require any custom programming. The Open edX® platform is highly configurable, and, it is extensible via its pluggable XBlock architecture. In the vast majority of cases, my clients find the custom features they require from existing XBlocks which I can typically install for them in only a few hours. If you're one of the exceptions to his rule however then let's talk. I have an extensive portfolio of low-level programming projects using Python-Django and ReactJS.</p>
                                <h4>Advisory & Training</h4>
                                <p>I advise project teams around the world, providing expert advise on technical best practices, project and risk management, and relevant context about technical strategies within the Open edX® platform.</p>
                                <hr />
                            </div>
                        </div>
                        <div className="hide-medium">
                            <h3 className="ml-auto text-center pl-2 mx-5">Open edX® Client List</h3>
                            <ClientGrid clients={props.clients} filter="edx" />
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="text-justify mx-lg-5 mx-2">
                                <h3 className="mt-lg-5 mt-1">FAQ</h3>
                                <hr />
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>How much does Open edX cost?</Accordion.Header>
                                        <Accordion.Body>
                                        <p>The Open edX software, inclusive of all system software and third party libraries, is free to download and free to use. edX releases a major update to the software around once per year. The software is controlled by edX but maintained by a consortium of community users consting mostly the engineering team at edX itself along with contributions from member universities around the world. This group does not charge fees for access to their regular software updates. Your only costs will be external consulting costs, if any, for the installation and configuration, and recurring cloud computing costs. My blog article, "<a href="https://blog.lawrencemcdaniel.com/how-much-does-open-edx-cost/" target="_blank" rel="noopener noreferrer">How Much Does Open edX Cost?</a>" includes summaries of itemized projects costs that have been voluntarily submitted by user in the Open edX community over the last few years.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Are there any consulting firms who specialize in Open edX?</Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                <p>Yes, there are several. The best place to start looking is the official <a href="https://open.edx.org/marketplace-category/service-partners/" target="_blank" rel="noopener noreferrer">Open edX Service Providers Marketplace</a> managed by edX, Inc. In addition, I have worked with or collaborated with several for whom I can vouch, including (in no particular order)</p>
                                                <ul>
                                                    <li><a href="https://www.edunext.co/" target="_blank" rel="noopener noreferrer">eduNEXT</a></li>
                                                    <li><a href="https://www.appsembler.com/" target="_blank" rel="noopener noreferrer">appsembler</a></li>
                                                    <li><a href="https://opencraft.com/" target="_blank" rel="noopener noreferrer">OpenCraft</a></li>
                                                    <li><a href="https://raccoongang.com/" target="_blank" rel="noopener noreferrer">Raccoon Gang</a></li>
                                                    <li><a href="https://abc-ld.org/" target="_blank" rel="noopener noreferrer">ABC MOOCs</a></li>
                                                </ul>
                                                <p>I am also included in the marketplace, however, edX charges me a fee if you contact from their site, so it'll be cheaper for you and me if you contact me via email at <a href="mailto:lpm0073@gmail.com">lpm0073@gmail.com</a></p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Should we run our own installation or use one of the recomended Application Service Providers?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>The answer depends a host of factors, but there are some generalizations on which you can safely rely.</p>
                                            <ul>
                                                <li>Use a platform provider if you're just getting started and you lack technical support and your budget permits. All Open edX providers will leave you in complete control of your data, so you'll always have the option of migrating the platform to your own private installation at a later date.</li>
                                                <li>Start with Tutor if you're just evaluating the platform and you're on a tight budget, as this is the easiest to get up and running quickly.</li>
                                                <li>Consider creating your own native build if 
                                                    <ul>
                                                        <li>you're a startup and you are actively deciding on the feature set you want to offer customers.</li>
                                                        <li>you have a team in place who is competent in supporting enterprise Django platforms.</li>
                                                        <li>you intend to customize the software.</li>
                                                        <li>you do not need customizations, and, your user base will be small.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>What size server do we need?</Accordion.Header>
                                        <Accordion.Body>
                                            <p><strong>(Using AWS EC2 server types as a reference)</strong></p>
                                            <p>t2.large (2-processor with 8gb of RAM) is the smallest server size on which Open edX will run reliably. I generally use this server size during development and for very small implementations intended for no more than a few dozen users. For any other size rollout I generally use t2.xlarge servers (4-processor with 16gb of RAM) in conjunction with the platform scaling principals that I outline in my blog article, <a href="https://blog.lawrencemcdaniel.com/scaling-open-edx/" target="_blank" rel="noopener noreferrer">"Scaling Open edX".</a> The Open edX platform is infinitely scalable, as you can plainly see from the flagship site edx.org. However, scaling is a complex topic -- you've been warned.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Does Open edX integrate with the single sign-on system at my school?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Open edX is designed to "easily" integrate with a variety of third party authentication protocols including SAML, oAuth and LTI. In simplest cases such as "Login with Facebook" and "Login with Google" for example, you can get things working in less than an hour using nothin more than the yml configuration files for the LMS and CMS. However, educational institutions frequently required far deeper levels of integration such as Grade Synching and User Profile Synching to name two common examples which, while entirely technically feasible, usually require thorough exploration with a trained professional from the Open edX community.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>How do we backup and restore our data?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Open edX stores its data in multiple formats including MySQL, mongoDB and the Ubuntu file system. You can read my blog article, <a href="https://blog.lawrencemcdaniel.com/open-edx-complete-backup-solution/" target="_blank" rel="noopener noreferrer">"Open edX Complete Backup Solution"</a> to get a better sense of what's involved in backing up the data.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Can Open edX operate in cloud platforms other than AWS?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Yes. However, I would strongly encourage you to consider using AWS to host your production platform. I've successfully installed Open edX on all major cloud platforms: AWS, Azure, Google Compute Cloud; as well as at other smaller providers including Digital Ocean and at some regional cloud providers. I can confidently share with you that a.) the exact distribution/version of Ubuntu that you choose does matter (as the authors of the official Open edX documentation claim), and b) I've always gotten the platform to work eventually, even in cases where I did not use the suggested distribution. Net-net, I've found the alternative providers to be good, lower-cost alternatives to AWS during development activities, and AWS to be preferable for production.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Is it possible to migrate to/from Tutor?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Yes, barring a few rare outlying circumstances. I have more experience migrating from Tutor to a native build, since this is a natural trajectory for platform scaling purposes. However, I have successfully migrated in both directions.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="9">
                                        <Accordion.Header>Which version of Open edX should we install?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>You should almost always use the most recent named release; the rare exception being that your organization is desperately awaiting the release of a new feature. edX publishes their "named releases" here, at <a href="https://edx.readthedocs.io/projects/edx-developer-docs/en/latest/named_releases.html" target="_blank" rel="noopener noreferrer">"Open edX Named Releases"</a>.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="10">
                                        <Accordion.Header>What skills are required to support Open edX after we go live?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Open edX is a highly stable, well-behaved platform once you've got it up and running. edX has a world-class engineering team, and they take testing really seriously. With that in mind, and assuming minimal or no customizations to the platform, you can reasonably assume that your platform will essentially be maintenance free other than activities related to scaling (only if your user base grows) and occasional software updates of at least once per year.</p>
                                            <p>If on the other hand, you plan to actively develop new features on the platform then the following might be of interest to you. Open edX is architected as a traditional enterprise-grade Python-Django web application. It is very large and very complex, and it makes use of the entire family of enterprise scaling technologies that one could possibly encounter in a Django project. As of the Koa release the front end is nearly entirely built with ReactJS. There is a substantial learning curve, even if your team are experienced Django/ReactJS folks. The most common technologies that I find myself using are as follows:</p>
                                            <ul>
                                                <li>Ubuntu command line and bash scripting</li>
                                                <li>Git / GitHub</li>
                                                <li>basic TCP/IP networking stuff</li>
                                                <li>Lots of AWS cloud services stuff</li>
                                                <li>Python / Django -- albeit with a lot more emphasis on Django</li>
                                                <li>JSON and YML file formats</li>
                                                <li>ReactJS</li>
                                                <li>Bootstrap</li>
                                                <li>MySQL -- mostly from the query tool provided in MySQL Workbench</li>
                                            </ul>
                                            <p>Additionally, Open edX makes uses of a broad range of libraries from Pip and NPM and Ubuntu's apt-get; many of which you'll need to become more familiar.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                        </div>

                    </div>
                </div>  
            </div>

        );
}

export default Openedx;