import React from 'react'
import BlankSpace from '../../components/blankSpace/Component'

const Photographer = () => {
  return (
    <React.Fragment>
      <div
        key="5"
        className="job-title lead mb-0 mt-4 col-4 ps-4 pe-4"
        aria-label="Photographer"
      >
        <a
          href="https://photography.lawrencemcdaniel.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Street, portrait, and beauty photography portfolio"
        >
          <h2>
            <span className="" role="img" aria-label="Close">
              📸
              <BlankSpace />
            </span>
            <span>Photographer</span>
          </h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default Photographer
