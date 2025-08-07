import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

/* eslint-disable no-unused-vars */
const Consultant = (props) => {
  return (
    <React.Fragment>
      <div key="2" className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4">
        <a href="/consulting">
          <h2>
            <span className="consultant-bookends" role="img" aria-label="Close">
              ⇥📙📚
              <BlankSpace />
            </span>
            <span>Consultant</span>
            <span className="consultant-bookends" role="img" aria-label="Close">
              <BlankSpace />
              📚📘⇤
            </span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default Consultant
