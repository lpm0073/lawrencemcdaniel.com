import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCoursesGrid } from '../../redux/actions/coursesActions'

import Loading from '../../components/Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
//import { Fade } from "react-animation-components";

function Course({ item_style, course_summary, institution, course_title }) {
  return (
    <React.Fragment>
      <div
        className="education-item mx-1 infinite"
        style={item_style}
        title={course_summary}
      ></div>
      <div style={{ marginTop: '-25px' }}>
        <h5 className="fw-normal fs-6 text-center w-100 mt-2 text-dark">{institution}</h5>
        <h4 className="fw-normal fs-6 text-center w-100 d-flex align-items-center justify-content-center px-3 text-dark">
          {course_title}
        </h4>
      </div>
    </React.Fragment>
  )
}
Course.propTypes = {
  item_style: PropTypes.object.isRequired,
  course_summary: PropTypes.string.isRequired,
  institution: PropTypes.string.isRequired,
  course_title: PropTypes.string.isRequired,
}

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
      <section className="" aria-label="Courses Grid">
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <div className="row my-5 mx-0 py-5 px-0 text-center align-items-stretch">
            {this.props.education.courses.map((course, indx) => {
              const institution = course?.acf?.institution || 'Unknown Institution'
              const course_title = course?.acf?.course_title || 'Unknown Course Title'
              const course_summary =
                course?.acf?.course_summary || 'Unknown Course Summary'
              /*
              const course_date = course?.date
              const course_year = course_date
                ? new Date(course_date).getFullYear()
                : 'Unknown Year'
              */
              const certificate_url = course?.acf?.certificate_url
              const aria_label = course?.title?.rendered

              const item_url = wpGetFeaturedImage(course, null)
              const background_url = "url('" + item_url + "')"
              const item_style = {
                backgroundImage: background_url,
              }
              return (
                <React.Fragment key={indx}>
                  <div className="col-lg-3 col-md-4 col-sm-6 px-0">
                    <article
                      className="m-1 py-1 bg-white border rounded d-flex flex-column h-300"
                      aria-label={`Education credential ${aria_label}`}
                    >
                      {certificate_url ? (
                        <a
                          href={certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-reset"
                        >
                          <Course
                            item_style={item_style}
                            course_summary={course_summary}
                            institution={institution}
                            course_title={course_title}
                          />
                        </a>
                      ) : (
                        <Course
                          item_style={item_style}
                          course_summary={course_summary}
                          institution={institution}
                          course_title={course_title}
                        />
                      )}
                    </article>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        )}
      </section>
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
