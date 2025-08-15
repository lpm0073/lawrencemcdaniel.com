import React from 'react'
import './styles.css'
import BlankSpace from '../blankSpace/Component'

export const LinkedinBadge = () => {
  return (
    <article key="linkedin-badge" className="LI-badge-container text-center">
      <div className="">
        <div className="">
          <div className="LI-profile-pic-container pt-4">
            <div className="LI-img-wrapper">
              <img
                className="LI-profile-pic"
                src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2024/12/16192734/linkedin-profile-pic.jpeg"
                alt="Lawrence McDaniel"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="LI-name mb-1">
            <a href="https://www.linkedin.com/in/lawrencemcdaniel?trk=profile-badge-name">
              Lawrence McDaniel
            </a>
          </div>
          <div className="LI-title">
            <span role="img" aria-label="Close">
              📡
            </span>
            <BlankSpace />
            Full Stack Developer
          </div>
        </div>
      </div>
      <div className="">
        <div className="">lawrencemcdaniel.com</div>
        <div className="">
          <a href="https://www.linkedin.com/edu/university-of-north-texas-19538?trk=profile-badge-school">
            University of North Texas
          </a>
        </div>
      </div>
      <div className="mt-4">
        <a
          className="btn btn-primary"
          role="button"
          href="https://www.linkedin.com/in/lawrencemcdaniel?trk=profile-badge-cta"
        >
          View profile
        </a>
        <div className="pb-3 mt-3">
          <img
            src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/15213433/logo_linkedin_flat_white_93x21.png"
            alt="LinkedIn"
            className="LI-icon"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  )
}
