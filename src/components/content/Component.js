import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import PropTypes from 'prop-types'
import CodeSamplesTable from './codeSamples/Component'
import ArticlesTable from './articles/Component'
import VideosTable from './videos/Component'
import { APP_CONFIG } from '../../shared/constants'

import './styles.css'

function skillUrl(categoryCode) {
  /*
    anchor links to the specialties page. These are internal page
    links to follow when an icon is clicked.
    Part of repository metadata.
  */

  const urlCloud = '/' + APP_CONFIG.skills.cloud
  const urlDataScience = '/' + APP_CONFIG.skills.dataScience
  const urlFullStack = '/' + APP_CONFIG.skills.fullStack
  const urlOpenEdx = '/' + APP_CONFIG.skills.openEdx
  const urlReact = '/' + APP_CONFIG.skills.react

  switch (categoryCode) {
    case 'cloud':
      return urlCloud
    case 'azure':
      return urlCloud
    case 'aws':
      return urlCloud
    case 'data-science':
      return urlDataScience
    case 'full-stack':
      return urlFullStack
    case 'openedx':
      return urlOpenEdx
    case 'open-edx':
      return urlOpenEdx
    case 'wordpress':
      return urlFullStack
    case 'python':
      return urlFullStack
    case 'react':
      return urlReact
    case 'reactjs':
      return urlReact
    case 'terraform':
      return urlCloud
    case 'dev-ops':
      return urlFullStack
    case 'django':
      return urlFullStack
    default:
      throw new Error(`skillUrl() categoryCode is not recognized: ${categoryCode}`)
  }
}

export function skillLogoUrl(categoryCode, reduxSpecialties) {
  /*
    returns the internal URL of the logo image for a given skill code.
    Part of repository metadata.
   */
  switch (categoryCode) {
    case 'cloud':
      return 'assets/images/aws-logo.png'
    case 'aws':
      return 'assets/images/aws-logo.png'
    case 'python':
      return 'assets/images/python-logo.png'
    case 'data-science':
      return 'assets/images/data-science-icon.png'
    case 'full-stack':
      return 'assets/images/pancakes.png'
    case 'react':
      return 'assets/images/react-logo-300x261.png'
    case 'reactjs':
      return 'assets/images/react-logo-300x261.png'
    case 'openedx':
      return 'assets/images/edx-logo.png'
    case 'open-edx':
      return 'assets/images/edx-logo.png'
    case 'terraform':
      return 'assets/images/terraform-logo.png'
    // youtube and wordpress categories are non-standard
    case 'dev-ops':
      return 'assets/images/pancakes.png'
    case 'wordpress':
      return 'assets/images/pancakes.png'
    case 'django':
      return 'assets/images/pancakes.png'
  }
  console.warn('skillLogoUrl() categoryCode is not locally served', categoryCode)

  // reduxSpecialties.items[i].slug
  // reduxSpecialties.items[i]._embedded.wp:featuredmedia[0].source_url
  const specialty = reduxSpecialties.items.find((item) => item.slug === categoryCode)
  if (
    specialty &&
    specialty._embedded &&
    specialty._embedded['wp:featuredmedia'] &&
    specialty._embedded['wp:featuredmedia'][0]
  ) {
    return specialty._embedded['wp:featuredmedia'][0].source_url
  }
  console.error('skillLogoUrl() unknown categoryCode', categoryCode)

  return null
}

export function skillIcon(categoryCode, reduxSpecialties) {
  /*
    returns an <img> element for a given skill code.
    Part of repository metadata.
   */
  const category_label = skillLabel(categoryCode)
  const category_url = skillUrl(categoryCode)
  const category_logo_url = skillLogoUrl(categoryCode, reduxSpecialties)
  if (!category_label || !category_url || !category_logo_url) {
    throw new Error(
      `skillIcon() missing data for categoryCode: ${categoryCode} label: ${category_label} url: ${category_url} logo: ${category_logo_url}`
    )
  }
  return (
    <a href={category_url}>
      <img
        src={category_logo_url}
        alt={category_label}
        title={`Click to view ${category_label} projects`}
        height="20"
        style={{ objectFit: 'contain' }}
      />
    </a>
  )
}

export function skillLabel(categoryCode) {
  /*
    Pretty label for a given skill code, to be rendered to the browser
    as text.

    Part of repository metadata. Not currently used.
   */
  switch (categoryCode) {
    case 'cloud':
      return 'Cloud'
    case 'aws':
      return 'cloud'
    case 'python':
      return 'Python'
    case 'data-science':
      return 'Data Science'
    case 'full-stack':
      return 'Full Stack'
    case 'react':
      return 'React'
    case 'openedx':
      return 'Open edX'
    case 'open-edx':
      return 'Open edX'
    case 'reactjs':
      return 'React'
    case 'terraform':
      return 'cloud'
    case 'dev-ops':
      return 'DevOps'
    case 'wordpress':
      return 'Full Stack'
    case 'django':
      return 'Full Stack'
    default:
      throw new Error(`skillLabel() categoryCode is not recognized: ${categoryCode}`)
  }
}

// ---------------------------- Main Component ------------------------------

export const ContentCategories = ({ categories }) => {
  /*
    Renders up to six skill icons for the given repository.
    Part of repository metadata. Sourced from github.json.
    This is the foundation for all icon, url and label logic above.
   */
  return (
    <React.Fragment>
      <div className="mt-2 text-end text-muted mb-3">
        <div className="d-flex justify-content-end">
          {(categories || []).slice(0, 6).map((icon, index) => (
            <span key={index} className="ms-2">
              {icon}
            </span>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
ContentCategories.propTypes = {
  // categories is an array of skill icon url strings
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export const Content = ({ skill }) => {
  return (
    <React.Fragment>
      <div className="p-1 bg-secondary border border-dark rounded">
        <div className="border border-dark bg-white rounded">
          <Tabs
            defaultActiveKey="code-samples"
            id="content-tabs"
            className="ml-5 mr-5 p-0 bg-white"
            style={{ backgroundColor: 'white' }}
          >
            <Tab
              eventKey="code-samples"
              title="Code Samples"
              className="p-1 m-1 mt-3 code-samples bg-white"
            >
              <section aria-label="Code Samples">
                <p>
                  These are a combination of managed GitHub repositories that I use for
                  instructional purposes, combined with repositories belonging to open
                  source organizations to which I am the maintainer. Most of these also
                  demonstrate best practices for software management including pre-commit,
                  linting techniques, and devops methods for automating unit testing,
                  documentation and CI-CD operations for build, deploy and code dependency
                  package updates.
                </p>
                <CodeSamplesTable skill={skill} maxrows={10} />
              </section>
            </Tab>

            <Tab eventKey="articles" title="Articles" className="p-3">
              <section aria-label="Articles">
                <p>
                  These are articles that I&apos;ve published. Usually from my personal
                  blog, but every now and then from other sources.
                </p>
                <ArticlesTable skill={skill} maxrows={10} />
              </section>
            </Tab>

            <Tab eventKey="videos" title="Videos" className="p-3">
              <section aria-label="Videos">
                <p>Videos from my YouTube Channel, Full Stack With Lawrence</p>
                <VideosTable skill={skill} maxrows={10} />
              </section>
            </Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  )
}

Content.propTypes = {
  skill: PropTypes.string.isRequired,
}
