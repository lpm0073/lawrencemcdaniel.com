import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

/* eslint-disable no-unused-vars */
const FullStackWithLawrence = (props) => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="Full Stack with Lawrence"
      >
        <a
          href="https://github.com/fullStackWithLawrence/"
          target="_blank"
          rel="noopener noreferrer"
          title="Open source code samples for the courses that I teach at University of British Columbia"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              🐍
              <BlankSpace />
            </span>
            <span>Code Samples</span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default FullStackWithLawrence
