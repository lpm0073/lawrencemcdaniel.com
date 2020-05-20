import React from 'react';
import Loading from '../../components/Loading';


const SpecialtyColumn = (props) => {

    const iconClass = "fa fa-3x " + props.icon;

    return(
        <React.Fragment>

            <div className="col-lg-4 col-md-6 px-0">
                <div className="p-2">
                    <h4>{props.title}</h4>
                    <div className="row m-0">
                        <div className="col-2 m-1 p-0 specialties-banner-icon">
                            <i className={iconClass}></i>
                        </div>
                        <div className="col text-justify specialties-banner-text">
                            <p>{props.description}</p>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    );
}

const SpecialtiesBanner = (props) => {

    
    return(
        <React.Fragment>
          {props.isLoading ? (
            <Loading />
          ) : (
            <div className="row specialties-banner mx-3 my-5 p-3">
            <SpecialtyColumn 
            title="FULL STACK DEVELOPMENT" 
            icon="fa-html5" 
            description="Responsive web apps developed with Django, ReactJS, Redux, Angular, and WordPress, and Hybrid mobile apps with Ionic + Cordova; all following agile methodologies and backed by AWS' infinitely-scalable suite of web services."
                />

            <SpecialtyColumn 
            title="BUSINESS ANALYSIS" 
            icon="fa-database" 
            description="Well-rounded business analyst specializing in predictive analytics, forensics and algorithm analysis using Excel/VBA, Octave and R. Extensive database and data science background."
                />

            <SpecialtyColumn 
            title="OPEN EDX" 
            icon="fa-mortar-board" 
            description="Installation, configuration, customization and training of the Open edX learning management system and course development studio. Author of one of the industry's most important technical how-to blog sites."
                />

          </div>

        )}
        </React.Fragment>


    );
}

export default SpecialtiesBanner;

