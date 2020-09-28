import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import { Media } from 'reactstrap';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import { LinkedinBadge } from '../../components/linkedinBadge/Component';
import AboutTile from './tileComponent';
import { Fade } from 'react-animation-components';

import './styles.css';

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});


class About extends Component {

        componentWillUnmount() {

            this.props.actions.setAboutPage();
        }

        render() {
    
            return(
    
                <React.Fragment>
                    
                    <div key="about-page" className="site-page about-page">
                        <RenderPageTitle theme="light" icon="fa-user" title="ABOUT" boxed_title="ME" />
                        <div className="row mt-5 ml-0 mr-0">
                            <div className="col-lg-3 col-md-6 col-sm-12 hide-medium">
                                <LinkedinBadge />
                            </div>
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <div>
                                    <h4 className="mb-3">Great things are done by a series of small things brought together</h4>
                                    <div className="text-justify">
                                        <p>I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including <a href="https://www.djangoproject.com/">Django</a>, <a href="https://reactjs.org/">React</a>, <a href="https://angular.io/">Angular</a>, and <a href="https://wordpress.com/">WordPress</a>. I also work extensively with the <a href="https://open.edx.org/">Open edX®</a> learning management system. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for <a href="https://en.wikipedia.org/wiki/Open_source">open source</a>, try to keep things <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a> and well-documented and when possible I adhere to the principals of <a href="https://12factor.net/">12-factor</a> development. I’m a passionate learner and <a href="https://blog.lawrencemcdaniel.com">frequent blogger</a>, currently interested in <a href="/machine-learning/">machine learning</a>, AI and quantum computing.</p>
                                    </div>
                                    <div className="hide-medium">
                                        <Media left middle >
                                            <Media object src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/lawrence-signature.png" alt="lawrence-signature" className="about-signature" />
                                        </Media>
                                    </div>
                                </div>
                            </div>
                                <div className="column-3 col-lg-4 col-md-6 col-sm-12 p-3">
                                    {this.props.aboutPage.isSet && <RightColumn /> }
                                    {!this.props.aboutPage.isSet && <Fade in delay={0} duration={400}> <RightColumn /> </Fade>}
                                </div>
                        </div>
                    </div>
                </React.Fragment>        
            );
    
        }

}
const RightColumn = () => {
    var d = new Date();
    const years_experience = d.getFullYear() - 1992 - 11 - 1 - 2;
    const years_opensource = d.getFullYear() - 2010;
    const years_biking = d.getFullYear() - 1999;

    return(
        <div>
            <div className="row hide-small hide-medium about-tiles m-0">
                <AboutTile icon="fa-globe" value="13" text="Countries worked in" />
                <AboutTile icon="fa-cloud" value={years_experience} text="Years Experience" />
                <AboutTile icon="fa-linux" value={years_opensource} text="Years Open Source" />
                <AboutTile icon="fa-taxi" value={years_biking} text="Years bicycle commuting" />
            </div>
            <div className="column-3-text text-justify mt-1 pt-1">
                <p>I lived abroad for 25 of the last 30 years, in Mexico, Western Europe and SE Asia. Prior to that I earned a B.S. from University of North Texas with majors in Computer Science and Mathematics and minors in Physics and English.</p>
                <p><strong>Read my <a href="/bio/"><span>full bio here</span></a>.</strong></p>
            </div>
        </div>

    );
}
export default connect(mapStateToProps, mapDispatchToProps)(About);    