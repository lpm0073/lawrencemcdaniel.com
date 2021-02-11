import React from 'react';

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';

import { resumeUrl } from '../../shared/urls';
import './styles.css';


const Openedx = (props) => {

        return(

            <div key="openedx-page" className="site-page openedx-page">
                <RenderPageTitle theme="light" icon="fa-align-left" title="Open edX®" boxed_title="Consultant" />
                <div className="row mt-5">
                    <div className="col-lg-3 hide-medium">
                        <div className="ml-auto text-center pl-2">
                            <LinkedinBadge />
                            <a className="mt-4 btn btn-danger" role="button" target="_blank" href={resumeUrl} rel="noopener noreferrer">
                                    <i className="fa fa-download"></i> Download Resume
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 ml-5">
                        <div className="text-justify">
                            <p>I am a <a href="https://blog.lawrencemcdaniel.com/" target="_blank" rel="noopener noreferrer">blogger, author</a> and 20-year veteran web developer specializing in the <a href="https://open.edx.org/" target="_blank" rel="noopener noreferrer">Open edX® platform</a>. I provide free initial consultations in English and Spanish. Based in North America, I split my time between Cambridge, Massachusetts and Mexico City. As a freelancer with a low-overhead lifestyle I tend to be the most economical option in many cases. I provide personalized service and fast response to clients located around the world. All of my customers have my personal mobile phone number and can reach me any time by <a href="/contact">voice, whatsapp or email</a>. My <a href="/portfolio">Portfolio</a>, <a href="/clients">Client List and Recommendations</a> are all available on this site.</p>
                            <ul>
                                <li>Are you in planning stages of an Open edX® project?</li>
                                <li>Are you looking for a low-risk deployment solution and an Open edX® service provider with a proven track record?</li>
                                <li>Do you need affordable full-service administration and technical support?</li>
                            </ul>
                            <h3>Services That I Provide to the Open edX® Community</h3>
                            <hr />
                            <h4>Author & Blogger</h4>
                            <p>Thousands of organizations around the world have used my <a href="https://blog.lawrencemcdaniel.com/category/open-edx/" target="_blank" rel="noopener noreferrer">Open edX® blog articles</a> to turn their online education vision into reality. In the spirit of community and as a fellow open source code enthusiast I make a diligent effort to publish my Open edX® know-how in an effort to help maximize the reach of this remarkable platform. As of early 2021 my articles, <a href="https://blog.lawrencemcdaniel.com/open-edx-installation/" target="_blank" rel="noopener noreferrer">Open edX Step-By-Step Production Installation Guide</a>, <a href="https://blog.lawrencemcdaniel.com/scaling-open-edx/" target="_blank" rel="noopener noreferrer">Scaling Open edX</a>, <a href="https://blog.lawrencemcdaniel.com/open-edx-custom-theming-tutorial/" target="_blank" rel="noopener noreferrer">Open edX Custom Theming Tutorial</a>, and <a href="https://blog.lawrencemcdaniel.com/open-edx-configuration-tutorial/" target="_blank" rel="noopener noreferrer">Open edX Configuration Tutorial</a> have been viewed more than fifty thousand times.</p>
                            <h4>Installation</h4>
                            <p>You should consider hiring a professional to install your Open edX® plaform for you, if your budget permits. I have performed dozens of production installations for clients since 2016 on cloud platforms including AWS and Digital Ocean as well as specialized regional cloud providers across Asia and Afrika. I publish technical articles that fully describe all of my methods for preparing your Open edX® platform for production use, including <a href="https://blog.lawrencemcdaniel.com/open-edx-complete-backup-solution/" target="_blank" rel="noopener noreferrer">off-site data backup</a>, setting up <a href="https://blog.lawrencemcdaniel.com/open-edx-setup-smtp-email/" target="_blank" rel="noopener noreferrer">SMTP email</a>, adding <a href="https://blog.lawrencemcdaniel.com/open-edx-ssl-encryption/" target="_blank" rel="noopener noreferrer">SSL certificates</a>, and taking care of SEO.</p>
                            <h4>Configuration</h4>
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
                </div>
            </div>
        );
}

export default Openedx;