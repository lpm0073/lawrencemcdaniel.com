import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Loading from '../../components/Loading'

import './styles.css'

function categoryLogoUrl(categoryCode, reduxSpecialties) {

  // shortcuts
  switch (categoryCode) {
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
  }

  // reduxSpecialties.items[i].slug
  //reduxSpecialties.items[i]._embedded.wp:featuredmedia[0].source_url
  const specialty = reduxSpecialties.items.find((item) => item.slug === categoryCode)
  if (
    specialty &&
    specialty._embedded &&
    specialty._embedded['wp:featuredmedia'] &&
    specialty._embedded['wp:featuredmedia'][0]
  ) {
    return specialty._embedded['wp:featuredmedia'][0].source_url
  }

  return null
}

function categoryIcon(categoryCode, reduxSpecialties) {
  return (
    <img
      src={categoryLogoUrl(categoryCode, reduxSpecialties)}
      alt={categoryLabel(categoryCode)}
      height="20"
      style={{ objectFit: 'contain' }}
    />
  )
}

function categoryLabel(categoryCode) {
  switch (categoryCode) {
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
    default:
      return null
  }
}

const CodeSamplesTable = ({ category }) => {
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
                <th style={{ width: '20%' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredRepositories.map((repo) => (
                <tr key={repo.name}>
                  <td className="align-top">
                    <table className="mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <strong>{repo.name}</strong>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3 pt-3">
                            <div
                              className="code-sample-readme align-top text-break"
                              style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                              }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  repo.readme?.content ||
                                  '<em>No description available</em>',
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <div className="mt-2 text-end text-muted mb-3">
                      <div className="d-flex justify-content-end">
                          {(repo.categoryIcons || []).slice(0, 3).map((icon, index) => (
                          <span key={index} className="ms-2">
                              {icon}
                          </span>
                          ))}
                      </div>
                    </div>
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
                    <hr />
                    <div className="mt-2">
                      <div className="mb-1 text-end text-muted">
                        {/* <div><small>Top Languages</small></div> */}
                        {(repo.languages || []).slice(0, 3).map((lang) => (
                          <div key={lang.name} className="mb-1 text-end">
                            <small key={lang.name} className="small">
                              {lang.name} ({lang.percentage}%)
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>
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
