import React from 'react';
import { Jumbotron} from 'reactstrap';
import { Fade } from 'react-animation-components';
import LogoCube from '../../components/logocube/Component';
import './styles.css';
import './cool-backgrounds.css'

function Home(props) {
    return(
    <Jumbotron className="dark-background">
        <div className="h-100">
            <div className="row ml-0 mr-0 mt-5 px-0">
                    <div className="col-lg-6 col-md-12 mt-4 text-center noselect ">
                        <h1 className="display-4">
                            <span className="px-3 jumbotron-title-font super-bold">Lawrence McDaniel</span>
                        </h1>
                        <p className="jumbotron-subtitle jumbotron-title-font">Full Stack Developer</p>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <LogoCube logos={props.logos} />
                    </div>
            </div>
        </div>                    
    </Jumbotron>

    );
}

export default Home;
