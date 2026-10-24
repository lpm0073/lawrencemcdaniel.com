import React from 'react'

interface JobTitleProps {
  target: string
  /** Prepended to the className. Home passes none, so the className starts with 'undefined'. */
  cls?: string
  href: string
  title: string
  idx: string | number
}

const JobTitle = (props: JobTitleProps) => {
  const thisClassName = props.cls + ' job-title lead mb-0 mt-4 col-4 ps-4 pe-4'
  const thisHref = props.href
  const thisTitle = props.title
  const thisTarget = props.target

  return (
    <React.Fragment>
      <div key={props.idx} className={thisClassName} aria-label={thisTitle}>
        <a href={thisHref} target={thisTarget}>
          <h2>{thisTitle}</h2>
        </a>
      </div>
    </React.Fragment>
  )
}

export default JobTitle
