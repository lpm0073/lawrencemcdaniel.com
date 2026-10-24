import React from 'react'

interface WhartonCertificateProps {
  /** Extra classes for the column. The data science page passes none. */
  cls?: string
  src: string
  href: string
  idx: string
}

const WhartonCertificate = (props: WhartonCertificateProps) => {
  const thisClassName =
    (props.cls ? props.cls + ' ' : '') + 'col-lg-3 col-md-12 mb-1 pe-1'
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

export default WhartonCertificate
