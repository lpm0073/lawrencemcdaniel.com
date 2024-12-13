import React from 'react'
import PropTypes from 'prop-types'

const JobTitle = (props) => {
  const thisClassName = props.cls + ' job-title lead mb-0 mt-5 col-4 ps-5 pe-5'
  const thisHref = props.href
  const thisTitle = props.title

  return (
    <React.Fragment>
      <div key={props.idx} className={thisClassName}>
        <a href={thisHref}>
          <h2>{thisTitle}</h2>
        </a>
      </div>
    </React.Fragment>
  )
}

JobTitle.propTypes = {
  cls: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
}

export default JobTitle
