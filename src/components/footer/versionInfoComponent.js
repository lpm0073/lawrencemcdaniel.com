import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import './styles.css'
import BlankSpace from '../blankSpace/Component'
import packageJson from '../../../package.json'

/* eslint-disable no-unused-vars */
const VersionInfo = (props) => {
  const REACT_VERSION = React.version
  const APP_VERSION = packageJson.version
  const REDUX_VERSION = packageJson.dependencies.redux.replace(/[^0-9.]/g, '')
  const WORKBOX_CORE = packageJson.dependencies['workbox-core'].replace(/[^0-9.]/g, '')

  return (
    <React.Fragment>
      Progressive web app version {APP_VERSION}
      <BlankSpace />
      built with
      <BlankSpace />
      <img
        key="version-info-1"
        className="react-logo"
        src="/assets/images/react-logo-300x261.png"
        alt="ReactJS logo"
      />
      ReactJS {REACT_VERSION},<BlankSpace />
      <img
        key="version-info-2"
        className="react-logo"
        src="/assets/images/redux-logo.svg"
        alt="ReactJS logo"
      />
      Redux {REDUX_VERSION} and
      <BlankSpace />
      <img
        key="version-info-3"
        className="react-logo"
        src="/assets/images/workbox-logo.svg"
        alt="ReactJS logo"
      />
      Workbox {WORKBOX_CORE}
      <BlankSpace />
      <a className="mx-1 learn-more-link" href="/reactjs" target="_self">
        Learn more
      </a>
    </React.Fragment>
  )
}

VersionInfo.propTypes = {
  // Define prop types if needed
}

export default VersionInfo
