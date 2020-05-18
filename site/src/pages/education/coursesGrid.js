import React, { Component } from "react";
import Loading from '../../components/Loading';
import { Stagger, Fade } from 'react-animation-components';

class CoursesGrid extends Component {

  render() {
    return (
        <div className="">
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div id="education-grid">
              <div className="row my-5 mx-0 py-5 px-0 text-center">
              {this.props.education.courses.map((education_item, indx) => {
                  const item_url = education_item._embedded['wp:featuredmedia'][0].source_url;
                  const background_url = "url('" + item_url + "')";
                  const item_style = {
                    "background-image": background_url
                  }
                  return (
                    <div className="col-lg-3 col-md-4 col-sm-6 m-0 px-0 py-1" key={indx}>
                      <Fade in delay={0} duration={400}>
                        <div className="education-item mx-1 infinite" 
                          style={item_style}>
                        </div>
                      </Fade>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
    );
  }
}

export default CoursesGrid;