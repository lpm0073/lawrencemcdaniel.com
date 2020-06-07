import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/ActionCreators';

import Loading from '../../components/Loading';
import { Fade } from 'react-animation-components';
import {wpGetFeaturedImage} from '../../shared/wpGetFeaturedImage';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = (dispatch) => ({
actions: bindActionCreators(Actions, dispatch)
});

class CoursesGrid extends Component {
  constructor(props) {
    super(props);

    if (this.props.coursesGrid.isSet) {
      console.log("Courses Grid is set", this.props.coursesGrid.state);
    }

    this.state = {
      coursesGrid: false
    }

  }

  componentWillUnmount() {
    const state = this.state;
    this.props.actions.setCoursesGrid({state});
  }

  render() {
    return (
        <div className="">
          {this.props.isLoading ? (
            <Loading />
          ) : (
            <div key="education-grid" id="education-grid">
              <div className="row my-5 mx-0 py-5 px-0 text-center">
              {this.props.education.courses.map((education_item, indx) => {
                  const item_url = wpGetFeaturedImage(education_item, null); 
                  const background_url = "url('" + item_url + "')";
                  const item_style = {
                    "background-image": background_url
                  }
                  return (
                    <div className="col-lg-3 col-md-4 col-sm-6 m-0 px-0 py-1" key={indx}>
                      {!this.props.coursesGrid.isSet && 
                        <Fade in delay={0} duration={400}>
                          <div className="education-item mx-1 infinite" 
                            style={item_style}>
                          </div>
                        </Fade>
                      }
                      {this.props.coursesGrid.isSet && 
                        <div className="education-item mx-1 infinite" 
                          style={item_style}>
                        </div>
                      }
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursesGrid);