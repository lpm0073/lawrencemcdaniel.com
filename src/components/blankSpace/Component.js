import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import './styles.css'

/* eslint-disable no-unused-vars */
const BlankSpace = (props) => {
  return <React.Fragment> </React.Fragment>
}

BlankSpace.propTypes = {
  // Define prop types if needed
}

export const CarriageReturnLineFeed = () => {
  return (
    <React.Fragment>
      <br />
    </React.Fragment>
  )
}

export default BlankSpace
