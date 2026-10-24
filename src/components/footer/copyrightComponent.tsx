import React from 'react'

const Copyright = () => {
  const curr_year = new Date().getFullYear()

  return <React.Fragment>© Copyright 2015 - {curr_year}.</React.Fragment>
}

export default Copyright
