import React from 'react';
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent';
import SpecialtiesBanner from './specialtiesBanner';
import TechnologyCarousel from './technologyCarousel';
import './styles.css';


const Specialties = (props) => {

    return(
        <React.Fragment>
            <div className="specialties-page">
                <div className="container site-page ">
                    <RenderPageTitle icon="fa-pencil-square-o" title="MY" boxed_title="SPECIALTIES" />
                    <SpecialtiesBanner />
                    <TechnologyCarousel specialties={props.specialties} />

                    <div className="row specialties-code-samples mt-5 p-3">
                        <div className="col">
                            <div>
                                <h2>Want to see code samples?</h2>
                                <h6>I'm constantly experimenting with new GitHub libraries and coding techniques. Click here to see some of my all-time favorites.</h6>
                            </div>
                        </div>
                        <div className="col-2">
                        <a className="btn btn-danger" role="button" href="http://horrors.lawrencemcdaniel.com/" title="AngularJS Code Samples" target="_blank" rel="noopener noreferrer"><i className="fa fa-cogs"></i> Code samples</a>
                        </div>
                    </div>
                </div>
            </div>              

        </React.Fragment>
    );

}

export default Specialties;