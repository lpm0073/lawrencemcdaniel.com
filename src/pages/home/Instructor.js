import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

/* eslint-disable no-unused-vars */
const OnlineInstructor = (props) => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="Online Instructor"
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://extendedlearning.ubc.ca/about/our-instructors?field_course_program_areas_target_id_verf=All&field_instr_first_name=Lawrence&field_instr_last_name=McDaniel"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              🎓
              <BlankSpace />
            </span>
            <span>Online Instructor</span>
            <span className="" role="img" aria-label="Close">
              <BlankSpace />
              🎓
            </span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default OnlineInstructor
