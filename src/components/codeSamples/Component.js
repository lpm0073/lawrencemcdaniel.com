import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Loading from '../../components/Loading'

import './styles.css'

function categoryUrl(categoryCode) {
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
      return null
  }
}

function categoryLogoUrl(categoryCode, reduxSpecialties) {
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

function categoryIcon(categoryCode, reduxSpecialties) {
  /*
    returns an <img> element for a given category code.
    Part of repository metadata.
   */
  const categoryLabelText = categoryLabel(categoryCode)
  return (
    <a href={categoryUrl(categoryCode)}>
      <img
        src={categoryLogoUrl(categoryCode, reduxSpecialties)}
        alt={categoryLabelText}
        title={`Click to view ${categoryLabelText} projects`}
        height="20"
        style={{ objectFit: 'contain' }}
      />
    </a>
  )
}

function categoryLabel(categoryCode) {
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

const CodeCategories = ({ repo }) => {
  /*
    Renders up to six category icons for the given repository.
    Part of repository metadata. Sourced from github.json.
    This is the foundation for all icon, url and label logic above.
   */
  return (
    <div className="mt-2 text-end text-muted mb-3">
      <div className="d-flex justify-content-end">
        {(repo.categoryIcons || []).slice(0, 6).map((icon, index) => (
          <span key={index} className="ms-2">
            {icon}
          </span>
        ))}
      </div>
    </div>
  )
}
CodeCategories.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeEngagement = ({ repo }) => {
  /*
    Renders a table showing the popularity metrics for the given repository.
    Part of repository metadata. Sourced from github.json.
   */
  return (
    <table className="table-sm m-0 p-0 w-100 text-center small text-muted">
      <thead>
        <tr>
          <th className="w-25 border">⭐</th>
          <th className="w-25 border">🍴</th>
          <th className="w-25 border">👁</th>
          <th className="w-25 border">🐛</th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <td className="border">{repo.stargazers_count}</td>
          <td className="border">{repo.forks}</td>
          <td className="border">{repo.watchers}</td>
          <td className="border">{repo.open_issues}</td>
        </tr>
      </tbody>
    </table>
  )
}
CodeEngagement.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeCommits = ({ repo }) => {
  /*
    Renders the last commit date and total commits for the given repository.
    Part of repository metadata. Sourced from github.json.
   */
  return (
    <div className="mt-2">
      <small className="text-muted text-end">
        <div>
          Last commit:{' '}
          {new Date(repo.last_commit_date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })}
        </div>
        <div>Total commits: {repo.total_commits.toLocaleString()}</div>
      </small>
    </div>
  )
}

CodeCommits.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeLanguages = ({ repo }) => {
  /*
    Renders a list of up to 3 programming languages used in the given repository.
    Part of repository metadata. Sourced from github.json.
   */
  return (
    <div className="mt-2">
      <div className="mb-1 text-end text-muted">
        {(repo.languages || []).slice(0, 3).map((lang) => (
          <div key={lang.name} className="mb-1 text-end">
            <small key={lang.name} className="small">
              {lang.name} ({lang.percentage}%)
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}

CodeLanguages.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeMetadata = ({ repo }) => {
  /*
   Top-level component that renders metadata information for the given repository.
   Only shown on medium and larger screens.
   */
  return (
    <div>
      <CodeCategories repo={repo} />
      <CodeEngagement repo={repo} />
      <CodeCommits repo={repo} />
      <hr />
      <CodeLanguages repo={repo} />
    </div>
  )
}
CodeMetadata.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeRepositoryLink = ({ repo }) => {
  /*
   Renders a link to the given repository, with a padlock icon if it's private.
   */
  return (
    <div>
      {repo.private && (
        <img
          src="/assets/images/padlock.png"
          alt="Private repository"
          height="16"
          style={{ marginRight: '8px', verticalAlign: 'middle' }}
        />
      )}
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <strong>{repo.name}</strong>
      </a>
    </div>
  )
}
CodeRepositoryLink.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeDescription = ({ repo }) => {
  /*
    Renders the README content snippet for the given repository, or a placeholder if none exists.
    README filtering logic is handled in shared/githubDownloader.js.
   */
  return (
    <div
      className="code-sample-readme align-top text-break"
      style={{
        maxHeight: '200px',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      dangerouslySetInnerHTML={{
        __html: repo.readme?.content || '<em>No description available</em>',
      }}
    />
  )
}
CodeDescription.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeRepository = ({ repo }) => {
  /*
    Top-level component that renders the repository link and description.
   */
  return (
    <table className="mb-0">
      <tbody>
        <tr>
          <td>
            <CodeRepositoryLink repo={repo} />
          </td>
        </tr>
        <tr>
          <td className="ps-3 pt-3">
            <CodeDescription repo={repo} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
CodeRepository.propTypes = {
  repo: PropTypes.object.isRequired,
}

const CodeSamplesTable = ({ category }) => {
  /*
   Main component.
   Renders a table of code samples for the given category.
   */
  const reduxRepositories = useSelector((state) => state.repositories)
  const reduxSpecialties = useSelector((state) => state.specialties)
  const filteredRepositories = [
    ...(category
      ? reduxRepositories.repos.filter((redux) => redux.categories.includes(category))
      : reduxRepositories.repos),
  ]
    .map((repo) => {
      // If category is specified, remove the corresponding entry so that it doesn't
      // redundantly appear in the table.
      if (category && repo.categories) {
        const categoryIndex = repo.categories.indexOf(category)
        if (categoryIndex !== -1) {
          return {
            ...repo,
            categories: repo.categories.filter((_, index) => index !== categoryIndex),
          }
        }
      }
      return repo
    })
    .map((repo) => ({
      ...repo,
      categoryLabels: repo.categories.map(categoryLabel).filter(Boolean),
      categoryIcons: repo.categories
        .map((categoryCode) => categoryIcon(categoryCode, reduxSpecialties))
        .filter(Boolean),
    }))
    .sort((a, b) => {
      // Primary sort: combined engagement score (stargazers + watchers + forks) descending
      const aEngagement = a.stargazers_count + a.watchers + a.forks
      const bEngagement = b.stargazers_count + b.watchers + b.forks
      if (bEngagement !== aEngagement) {
        return bEngagement - aEngagement
      }
      // Secondary sort: total_commits (descending)
      return b.total_commits - a.total_commits
    })

  return (
    <div className="table-responsive">
      {reduxRepositories.isLoading ? (
        <Loading />
      ) : (
        <div>
          <table
            className="table table-bordered table-striped table-fixed mt-4 w-100"
            id="code-samples-table"
          >
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '80%' }}>Repository</th>
                <th className="hide-medium" style={{ width: '20%' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredRepositories.map((repo) => (
                <tr key={repo.name}>
                  <td className="align-top">
                    <CodeRepository repo={repo} />
                  </td>
                  <td className="hide-medium">
                    <CodeMetadata repo={repo} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const repositoriesStateShape = PropTypes.shape({
  isLoading: PropTypes.bool.isRequired,
  errMess: PropTypes.string,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
      private: PropTypes.bool,
      description: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string),
      languages: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          percentage: PropTypes.number.isRequired,
        })
      ),
      stargazers_count: PropTypes.number,
      forks: PropTypes.number,
      watchers: PropTypes.number,
      open_issues: PropTypes.number,
      categories: PropTypes.arrayOf(PropTypes.string),
      categoryLabels: PropTypes.arrayOf(PropTypes.string),
      categoryIcons: PropTypes.arrayOf(PropTypes.element),
    })
  ).isRequired,
})

CodeSamplesTable.propTypes = {
  category: PropTypes.string,
}
export default CodeSamplesTable
export { repositoriesStateShape }
