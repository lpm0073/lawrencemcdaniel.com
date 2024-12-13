import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import './styles.css'

/* eslint-disable no-unused-vars */
const Footer = (props) => {
  const curr_year = new Date().getFullYear()
  const REACT_VERSION = React.version

  return (
    <React.Fragment>
      <footer key="app-footer">
        <div className="footer">
          <div className="row mx-0 react-banner hide-small">
            <div className="col-12">
              <div className="text-center mr-3 mb-0">
                <img
                  key="1"
                  className="react-logo"
                  src="/assets/images/react-logo-300x261.png"
                  alt="ReactJS logo"
                />
                Progressive Web App Built with ReactJS {REACT_VERSION}, Redux and Workbox.{' '}
                <a className="mx-1 learn-more-link" href="/reactjs" target="_self">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-0">
            <div className="col-auto mb-0">
              <p className="mb-1">
                © Copyright 2015 - {curr_year}.
                <span className="hide-medium">
                  {' '}
                  edX and{' '}
                  <a
                    className="mx-1 "
                    href="https://open.edx.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="edx-links">Open edX</span>
                  </a>{' '}
                  are registered trademarks of{' '}
                  <a
                    className="mx-1"
                    href="https://www.edx.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="edx-links">edX Inc.</span>
                  </a>{' '}
                  All Rights Reserved.
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

Footer.propTypes = {
  // Define prop types if needed
}

export default Footer
