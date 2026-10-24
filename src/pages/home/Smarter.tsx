import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

const Smarter = () => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="The Smarter Project"
      >
        <a
          target="_self"
          href="/smarter"
          title="The open source AI platform that I author and maintain"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              🤖
              <BlankSpace />
            </span>
            <span>The Smarter Project</span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default Smarter
