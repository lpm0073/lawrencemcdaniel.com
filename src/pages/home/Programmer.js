import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'
import { APP_CONFIG } from '../../shared/constants'

/* eslint-disable no-unused-vars */
const Programmer = (props) => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="Programmer"
      >
        <a
          href={'/' + APP_CONFIG.skills.fullStack}
          target="_self"
          rel="noopener noreferrer"
          title="Python, React, Golang, Visual Basic programming skills"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              🤓
              <BlankSpace />
            </span>
            <span>Programmer</span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default Programmer
