import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

/* eslint-disable no-unused-vars */
const OpenedxConsultant = (props) => {
  return (
    <React.Fragment>
      <div key="2" className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4">
        <a href="/openedx">
          <h2>
            <span className="open-edx-consultant-bookends" role="img" aria-label="Close">
              ⇥📙📚
              <BlankSpace />
            </span>
            <span>
              Open edX<span className="copyright">®</span> Consultant
            </span>
            <span className="open-edx-consultant-bookends" role="img" aria-label="Close">
              <BlankSpace />
              📚📘⇤
            </span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default OpenedxConsultant
