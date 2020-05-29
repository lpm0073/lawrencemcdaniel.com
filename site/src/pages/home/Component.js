import React from 'react';
import { Jumbotron} from 'reactstrap';
import { Fade } from 'react-animation-components';
import LogoCube from '../../components/logocube/Component';
import './styles.css';
import './cool-backgrounds.css'

function Home(props) {
    return(
            <div>
                <div className="row justify-content-center align-self-center w-100">
                    <Fade in>
                        <div className="col-12 text-center noselect">
                            <p className="jumbotron-subtitle jumbotron-title-font">Full Stack Developer</p>
                            <h1 className="display-4">
                                <span className="border-3 px-3 jumbotron-title-font super-bold">Lawrence McDaniel</span>
                            </h1>
                            <p className="jumbotron-subtitle jumbotron-title-font">Open edX Enthusiast</p>
                        </div>
                    </Fade>
                </div>
                <div className="row justify-content-center align-self-center w-100">
                    <LogoCube />
                </div>
            </div>
    );
}

function _Home(props) {
    return(
    <Jumbotron className="floating-cogs">
        <div className="d-flex h-100">
            <div className="row justify-content-center align-self-center w-100">
                <Fade in>
                    <div className="col-12 text-center noselect">
                        <p className="jumbotron-subtitle jumbotron-title-font">Full Stack Developer</p>
                        <h1 className="display-4">
                            <span className="border-3 px-3 jumbotron-title-font super-bold">Lawrence McDaniel</span>
                        </h1>
                        <p className="jumbotron-subtitle jumbotron-title-font">Open edX Enthusiast</p>
                    </div>
                </Fade>
            </div>
        </div>                    
    </Jumbotron>

    );
}

export default Home;
