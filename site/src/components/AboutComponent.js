import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function RenderLeader({leader}) {

    return(
    <div key={leader.id} className="col-12 mt-5">
        <Media tag="li">
            <div className="col-2">
                <Media left middle>
                    <Media object src={baseUrl + leader.image} alt={leader.name} />
                </Media>
            </div>
            <div className="col-10">
                <Media heading>{leader.name}</Media>
                <Media body>
                    <p>{leader.designation}</p>
                </Media>
                <Media body >
                    <p>{leader.description}</p>
                </Media>
            </div>
        </Media>
    </div>
    );
}

function RenderPageTitle({icon, title, boxed_title}) {
    const thisClassName = "fa " + icon + " fa-2x page-tile-icon";

    return(

        <div className="row">
            <div className="col-12 text-center page-title">
                <span className={thisClassName}></span>
                <h1 className="display-4">{title} <span className="page-title-boxed">{boxed_title}</span></h1>
            </div>                
        </div>

    );

};


function About(props) {

    return(
        <div className="container site-page">
            <RenderPageTitle icon="fa-user" title="ABOUT" boxed_title="ME" />
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>                                            
                        <Stagger in>
                            {props.leaders.leaders.map((leader) => {
                            return (
                                <Fade in>
                                    <RenderLeader leader={leader} />
                                </Fade>                                
                            );
                            })}
                        </Stagger>
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    