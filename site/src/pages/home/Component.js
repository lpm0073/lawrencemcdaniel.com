import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import { Jumbotron} from 'reactstrap';
import { Fade } from 'react-animation-components';
import LogoCube from '../../components/logoCube/Component';

import './styles.css';
import './cool-backgrounds.css'

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

class Home extends Component {

    constructor(props) {
        super(props);

        if (this.props.homePage.isSet) {
            console.log("Home page is set", this.props.homePage.state);

        }

        this.state = {
            homePage: false
        }
    }

    componentWillUnmount() {
        const state = this.state;
        this.props.actions.setHomePage({state});
    }

    render() {
        return(
            <div key="home-page">
                <Jumbotron className="dark-background">
                    <div className="h-100">
                        <div className="row ml-0 mr-0 px-0 jumbotron-spacer">
                            <div className="col-lg-6 col-md-12 text-center noselect ">
                                <h1 className="display-4">
                                    <span className="px-3 super-bold pre-wrap">Lawrence McDaniel</span>
                                </h1>
                                <Fade in> 
                                    <p className="jumbotron-subtitle pre-wrap">Full Stack Developer</p>
                                </Fade>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <LogoCube />
                            </div>
                        </div>
                    </div>                    
                </Jumbotron>
            </div>
    
    
        );
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
