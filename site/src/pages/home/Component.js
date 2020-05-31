import React from 'react';
import { Jumbotron} from 'reactstrap';
import { Fade } from 'react-animation-components';
import LogoCube from '../../components/logoCube/Component';
import './styles.css';
import './cool-backgrounds.css'

function Home(props) {
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
                            <LogoCube logos={props.logos} />
                        </div>
                    </div>
                </div>                    
            </Jumbotron>
        </div>


    );
}

export default Home;
