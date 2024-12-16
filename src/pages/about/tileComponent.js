import React from 'react'
import PropTypes from 'prop-types'

const AboutTile = (props) => {
  const thisClassName = 'fa ' + props.icon + ' fa-2x about-tile-icon'
  const keyName = 'tile-component-' + props.icon
  return (
    <div key={keyName} className="col-md-6 col-sm-12 p-0 text-center noselect">
      <div className="m-1">
        <div className="about-tile">
          <div className={thisClassName}></div>
          <div className="about-tile-value">{props.value}</div>
          <div className="about-tile-text">{props.text}</div>
        </div>
      </div>
    </div>
  )
}

AboutTile.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
}

export default AboutTile
