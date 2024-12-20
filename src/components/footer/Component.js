import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import './styles.css'
import packageJson from '../../../package.json'

/* eslint-disable no-unused-vars */
const Footer = (props) => {
  const curr_year = new Date().getFullYear()
  const REACT_VERSION = React.version
  const APP_VERSION = packageJson.version
  const REDUX_VERSION = packageJson.dependencies.redux.replace(/[^0-9.]/g, '')
  const WORKBOX_CORE = packageJson.dependencies['workbox-core'].replace(/[^0-9.]/g, '')

  return (
    <React.Fragment>
      <footer key="app-footer">
        <div className="footer">
          <div className="row mx-0 react-banner hide-small">
            <div className="col-12">
              <div className="text-center mr-3 mb-0">
                © Copyright 2015 - {curr_year}.{' '}
                <img
                  key="1"
                  className="react-logo"
                  src="/assets/images/react-logo-300x261.png"
                  alt="ReactJS logo"
                />
                Version {APP_VERSION}. Progressive Web App built with ReactJS{' '}
                {REACT_VERSION}, Redux {REDUX_VERSION} and Workbox {WORKBOX_CORE}.{' '}
                <a className="mx-1 learn-more-link" href="/reactjs" target="_self">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-0">
            <div className="col-auto mb-0">
              <p className="mb-1">
                Source code:{' '}
                <a
                  className="edx-links"
                  href="https://github.com/lpm0073/lawrencemcdaniel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/lpm0073/lawrencemcdaniel.com/
                </a>
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
