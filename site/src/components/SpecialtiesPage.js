import React from 'react';
import RenderPageTitle from '../widgets/pageTitleComponent';
import SpecialtiesBanner from '../widgets/specialtiesBanner';
import SpecialtiesCarousel from '../widgets/specialtiesCarousel';

const Specialties = (props) => {


        return(
            <React.Fragment>
              <div className="specialties-page">
                  <div className="container site-page ">
                      <RenderPageTitle icon="fa-pencil-square-o" title="MY" boxed_title="SPECIALTIES" />
                      <SpecialtiesBanner />
                      <SpecialtiesCarousel />
                  </div>
              </div>              

            </React.Fragment>
        );

}

export default Specialties;