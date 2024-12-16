import React from 'react'
import PropTypes from 'prop-types'

const WhartonCertificate = (props) => {
  const thisClassName = props.cls + ' col-lg-6 col-md-12 mb-1 pe-1'
  const thisSource = props.src
  const thisHref = props.href

  return (
    <React.Fragment>
      <div key={props.idx} className={thisClassName}>
        <a href={thisHref}>
          <img
            src={thisSource}
            alt="Wharton Analytics Completion Certificate for Lawrence McDaniel"
            width="100%"
          />
        </a>
      </div>
    </React.Fragment>
  )
}

WhartonCertificate.propTypes = {
  cls: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
}

export default WhartonCertificate
