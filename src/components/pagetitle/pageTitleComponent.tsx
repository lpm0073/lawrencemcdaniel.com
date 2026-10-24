import React from 'react'
import { Helmet } from 'react-helmet'
import { titleCase } from '../../shared/titleCase'
import { nameLawrenceMcDaniel } from '../../shared/seo/gsdCommon'
import './styles.css'

interface RenderPageTitleProps {
  /** Font Awesome 4 icon class, e.g. 'fa-users'. */
  icon: string
  /** 'light' or 'dark'. */
  theme: string
  title: string
  boxed_title: string
}

const RenderPageTitle = (props: RenderPageTitleProps) => {
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
      <div
        key="page-title"
        className="row text-center noselect"
        aria-label="Page Title"
        role="heading"
        aria-level={1}
      >
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

export default RenderPageTitle
