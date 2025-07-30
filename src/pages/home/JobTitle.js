import React from 'react'
import PropTypes from 'prop-types'

const JobTitle = (props) => {
  const thisClassName = props.cls + ' job-title lead mb-0 mt-4 col-4 ps-4 pe-4'
  const thisHref = props.href
  const thisTitle = props.title
  const thisTarget = props.target

  return (
    <React.Fragment>
      <div key={props.idx} className={thisClassName}>
        <a href={thisHref} target={thisTarget}>
          <h2>{thisTitle}</h2>
        </a>
      </div>
    </React.Fragment>
  )
}

JobTitle.propTypes = {
  target: PropTypes.string.isRequired,
  cls: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
}

export default JobTitle
