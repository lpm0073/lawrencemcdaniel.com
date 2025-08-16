import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { titleCase } from '../../shared/titleCase'
import { nameLawrenceMcDaniel } from '../../shared/seo/gsdCommon'
import './styles.css'

const RenderPageTitle = (props) => {
  const iconClasses = 'fa ' + props.icon + ' fa-2x page-tile-icon'
  const pageClasses = 'col page-title ' + props.theme
  const titleText =
    nameLawrenceMcDaniel +
    ' - ' +
    titleCase(props.title) +
    ' ' +
    titleCase(props.boxed_title)

  return (
    <React.Fragment>
      <Helmet>
        <title>{titleText}</title>
        <meta property="og:title" content={titleText} />
        <meta name="twitter:title" content={titleText} />
        <meta name="twitter:description" content={titleText} />
      </Helmet>
      <div key="page-title" className="row text-center noselect" aria-label="Page Title">
        <div className={pageClasses}>
          <span className={iconClasses}></span>
          <h1 className="display-4">
            {props.title} <i className="page-title-boxed light">{props.boxed_title}</i>
          </h1>
        </div>
      </div>
    </React.Fragment>
  )
}

RenderPageTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  boxed_title: PropTypes.string.isRequired,
}

export default RenderPageTitle
