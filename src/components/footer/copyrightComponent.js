import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import './styles.css'

/* eslint-disable no-unused-vars */
const Copyright = (props) => {
  const curr_year = new Date().getFullYear()

  return <React.Fragment>© Copyright 2015 - {curr_year}.</React.Fragment>
}

Copyright.propTypes = {
  // Define prop types if needed
}

export default Copyright
