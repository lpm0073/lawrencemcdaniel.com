import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'
import { APP_CONFIG } from '../../shared/constants'

/* eslint-disable no-unused-vars */
const DataScientist = (props) => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="Data Scientist"
      >
        <a
          href={'/' + APP_CONFIG.skills.dataScience}
          target="_self"
          rel="noopener noreferrer"
          title="Data Science skills including data analysis, visualization, and machine learning"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              📈
              <BlankSpace />
            </span>
            <span>Data Scientist</span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default DataScientist
