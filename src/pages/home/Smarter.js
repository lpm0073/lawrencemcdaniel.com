import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

/* eslint-disable no-unused-vars */
const Smarter = (props) => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="Project: smarter"
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://smarter.sh/"
          title="An open source AI resource management platform"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              🤖
              <BlankSpace />
            </span>
            <span>Project: smarter</span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default Smarter
