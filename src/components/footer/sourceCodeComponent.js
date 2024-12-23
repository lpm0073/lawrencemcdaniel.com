import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import './styles.css'
import BlankSpace from '../blankSpace/Component'

/* eslint-disable no-unused-vars */
const SourceCode = (props) => {
  return (
    <React.Fragment>
      Source code:
      <BlankSpace />
      <a
        className="edx-links"
        href="https://github.com/lpm0073/lawrencemcdaniel.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/lpm0073/lawrencemcdaniel.com/
      </a>
    </React.Fragment>
  )
}

SourceCode.propTypes = {
  // Define prop types if needed
}

export default SourceCode
