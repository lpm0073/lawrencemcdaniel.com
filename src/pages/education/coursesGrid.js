import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCoursesGrid } from '../../redux/actions/coursesActions'

import Loading from '../../components/Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
//import { Fade } from "react-animation-components";

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setCoursesGrid }, dispatch),
})

class CoursesGrid extends Component {
  componentWillUnmount() {
    this.props.actions.setCoursesGrid()
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
                const item_url = wpGetFeaturedImage(education_item, null)
                const background_url = "url('" + item_url + "')"
                const item_style = {
                  backgroundImage: background_url,
                }
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6 m-0 px-0 py-1" key={indx}>
                    {!this.props.coursesGrid.isSet && (
                      //<Fade in delay={0} duration={400}>
                      <React.Fragment>
                        <div
                          className="education-item mx-1 infinite"
                          style={item_style}
                        ></div>
                      </React.Fragment>
                      //</Fade>
                    )}
                    {this.props.coursesGrid.isSet && (
                      <div
                        className="education-item mx-1 infinite"
                        style={item_style}
                      ></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

CoursesGrid.propTypes = {
  actions: PropTypes.shape({
    setCoursesGrid: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  education: PropTypes.shape({
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  coursesGrid: PropTypes.shape({
    isSet: PropTypes.bool.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesGrid)
