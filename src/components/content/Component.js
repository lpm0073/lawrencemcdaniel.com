import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import PropTypes from 'prop-types'
import CodeSamplesTable from '../codeSamples/Component'
import ArticlesTable from '../articles/Component'


export function categoryUrl(categoryCode) {
  /*
    anchor links to the specialties page. These are internal page
    links to follow when an icon is clicked.
    Part of repository metadata.
  */
  switch (categoryCode) {
    case 'aws':
      return '/full-stack-developer'
    case 'data-science':
      return '/data-science'
    case 'full-stack':
      return '/full-stack-developer'
    case 'openedx':
      return '/openedx'
    case 'python':
      return '/full-stack-developer'
    case 'react':
      return '/reactjs'
    case 'terraform':
      return '/full-stack-developer'
    default:
      console.warn('categoryUrl() categoryCode is not recognized', categoryCode)
      return null
  }
}

export function categoryLogoUrl(categoryCode, reduxSpecialties) {
  /*
    returns the internal URL of the logo image for a given category code.
    Part of repository metadata.
   */
  switch (categoryCode) {
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
    case 'openedx':
      return 'assets/images/edx-logo.png'
    case 'terraform':
      return 'assets/images/terraform-logo.png'
  }
  console.warn('categoryLogoUrl() categoryCode is not locally served', categoryCode)

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
  console.error('categoryLogoUrl() unknown categoryCode', categoryCode)

  return null
}

export function categoryIcon(categoryCode, reduxSpecialties) {
  /*
    returns an <img> element for a given category code.
    Part of repository metadata.
   */
  const category_label = categoryLabel(categoryCode)
  const category_url = categoryUrl(categoryCode)
  const category_logo_url = categoryLogoUrl(categoryCode, reduxSpecialties)
  if (!category_label || !category_url || !category_logo_url) {
    console.warn('categoryIcon() missing data for categoryCode', categoryCode)
    return null
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

export function categoryLabel(categoryCode) {
  /*
    Pretty label for a given category code, to be rendered to the browser
    as text.

    Part of repository metadata. Not currently used.
   */
  switch (categoryCode) {
    case 'aws':
      return 'AWS'
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
    case 'terraform':
      return 'Terraform'
    default:
      return null
  }
}

// ---------------------------- Main Component ------------------------------

export const ContentCategories = ({ categories }) => {
  /*
    Renders up to six category icons for the given repository.
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
  // categories is an array of category icon url strings
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export const Content = ({ category }) => {
  return (
    <React.Fragment>
      <Tabs
        defaultActiveKey="code-samples"
        id="content-tabs"
        className="m-0"
        style={{ backgroundColor: 'white' }}
        >
        <Tab eventKey="code-samples" title="Code Samples">
          <div className="p-3">
            <div className="col-lg-12 code-samples">
              <h3>Code Samples</h3>
              <p>
                These are a combination of managed GitHub repositories that I use for
                instructional purposes, combined with repositories belonging to open
                source organizations to which I am the maintainer. Most of these also
                demonstrate best practices for software management including pre-commit,
                linting techniques, and devops methods for automating unit testing,
                documentation and CI-CD operations for build, deploy and code dependency
                package updates.
              </p>
              <CodeSamplesTable category={category} maxrows={10} />
            </div>
          </div>
        </Tab>

        <Tab eventKey="articles" title="Articles">
          <div className="p-3">
            <h3>Articles</h3>
            <p>These are articles that I&apos;ve published. Usually from my personal blog, but every now and then from other sources.</p>
            <ArticlesTable category={category} maxrows={10} />
          </div>
        </Tab>

        <Tab eventKey="videos" title="Videos">
          <div className="p-3">
            <h3>Videos</h3>
            <p>Videos content will go here</p>
          </div>
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

Content.propTypes = {
  category: PropTypes.string.isRequired,
}
