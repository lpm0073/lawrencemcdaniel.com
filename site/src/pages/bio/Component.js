import React from 'react';

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';
import {Helmet} from "react-helmet";

import { resumeUrl } from '../../shared/urls';
import { gsdGraph } from '../../shared/seo/gsdGraph';
import './styles.css';


const Bio = (props) => {

        return(
            <React.Fragment>
                <Helmet>
                    <link rel="canonical" href="https://lawrencemcdaniel.com/bio" />
                    <script type="application/ld+json">{JSON.stringify(gsdGraph(
                        "bio", 
                        "Bio",
                        "Lawrence McDaniel is a freelance full-stack web developer and business analyst. He has a BS in computer science and mathematics with minors in physics and English from University of North Texas. He was an early employee at three startups that were later acquired by Goldman Sachs, IBM and Deutsche Bank respectively, and has participated in a successful NASDAQ IPO. He has worked as a freelance technology consultant since 1999 and has advised dozens of startups as well as banks, hedge funds and real estate investment funds from around the world including Morgan Stanley, Fortress Investment Group, IBM Seterus, and others.", 
                        "",
                        "ProfilePage"
                    ))}</script>
                </Helmet>
                <div key="bio-page" className="site-page bio-page">
                    <RenderPageTitle theme="light" icon="fa-align-left" title="FULL" boxed_title="BIO" />
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
                                <p>Lawrence McDaniel is a freelance full-stack web developer and business analyst. He has a BS in computer science and mathematics with minors in physics and English from University of North Texas. He was an early employee at three startups that were later acquired by Goldman Sachs, IBM and Deutsche Bank respectively, and has participated in a successful NASDAQ IPO. He has worked as a freelance technology consultant since 1999 and has advised dozens of startups as well as banks, hedge funds and real estate investment funds from around the world including Morgan Stanley, Fortress Investment Group, IBM Seterus, and others.</p>
                                <p>He has expertise in financial modeling and forecasting systems, analytics, machine learning, big data, web, mobile, database technology, and Amazon Web Services (AWS) cloud infrastructure. He has 20+ years experience designing high performance, always-up transactional database systems using MySQL, MSSQL Server, Aurora and MongoDB. He also has years of expertise designing high availability, horizontally scalable cloud-based infrastructure environments. In fact, Lawrence is an ambassador for the AWS Activate Program in Mexico, helping startups and early-stage ventures get digital products and services to market using AWS. He advises companies on migration plans to AWS as well as works with early-stage ventures creating new highly scalable back-end environments and implementing continuous integration strategies.</p>
                                <p>Lawrence is an angel investor, entrepreneur and company mentor with nearly 25 years of international experience with an emphasis on technology and US-Mexico trade. He has extensive startup, fund raising, business development and M&amp;A experience with alternative investment and disruptive FinTech, edTech and IoT ventures. He is a mentor at <a href="http://www.startupmexico.com/">Startup Mexico</a> and <a href="http://angelventures.vc/">Angel Ventures</a> in Mexico City, and sits on the boards of <a href="http://edmex.org/">edMex</a> and <a href="http://m-arca.org/">M-Arca</a> Foundation.</p>
                                <p><strong>But he’s no stranger to real work either!</strong> his family built the house where he grew up in rural northeast Texas, raised their own livestock, and farmed their own crops. He paid his way through college by working for six years during and after high school in various jobs as a printer, cattle hand, carpenter, roofer, sheet rocker, painter, glazier, welder, lumber yard worker, forklift mechanic, truck loader, landscaper and gardener, hot tub installer, janitor, grocery shelf stocker, carpet &amp; commercial floor cleaner, dishwasher, waiter, and cook. During college he worked as a cafeteria food server, a tutor in the university math lab, a calculus paper grader and substitute lecturer for the math department and as a lab assistant for the physics department. Immediately after graduating college he helped launch one the first indoor rock climbing gyms, <a href="http://www.summitgyms.com/" target="_blank" rel="noopener noreferrer">Exposure Indoor Rock Climbing</a> gym in Carrollton, Texas, while simultaneously covering progress of NAFTA negotiations for a Dallas-based family office.</p>
                                <p>Lawrence is fully English/Spanish bilingual and available to travel throughout all of North America.</p>
                                <hr />
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

}

export default Bio;