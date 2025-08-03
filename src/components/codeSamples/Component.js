import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Loading from '../../components/Loading'

import './styles.css'


const CodeSamplesTable = ({ category }) => {
  const reduxRepositories = useSelector((state) => state.repositories)

  console.log('CodeSamplesTable repositories:', reduxRepositories)
  const filteredRepositories = category
    ? reduxRepositories.filter(redux => redux.repos.categories.includes(category))
    : reduxRepositories.repos


  return (
    <div className="table-responsive">
      {reduxRepositories.isLoading ? (
        <Loading />
      ) : (
        <div>
          <h2 className="mt-4 mb-3">Code Samples - {category}</h2>
          <table
            className="table table-bordered table-striped table-fixed mt-4 w-100"
            id="code-samples-table"
          >
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '65%' }}>Repository</th>
                <th style={{ width: '15%' }}>Languages</th>
                <th style={{ width: '20%' }}>Stats</th>
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
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              <strong>{repo.name}</strong>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div
                            className="code-sample-readme align-top text-break ps-2"
                              style={{
                                height: '200px',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                overflowX: 'hidden'
                              }}

                            dangerouslySetInnerHTML={{
                              __html: repo.readme?.content || '<em>No description available</em>'
                            }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </td>
                  <td>
                    {repo.languages.slice(0, 3).map((lang) => (
                      <div key={lang.name} className="mb-1">
                        <small>
                          {lang.name} ({lang.percentage}%)
                        </small>
                      </div>
                    ))}
                  </td>
                  <td>
                    <table className="table-sm m-0 p-0 w-100 ">
                      <thead>
                        <tr>
                          <th className="w-25">⭐</th>
                          <th className="w-25">🍴</th>
                          <th className="w-25">👁</th>
                          <th className="w-25">🐛</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{repo.stargazers_count}</td>
                          <td>{repo.forks}</td>
                          <td>{repo.watchers}</td>
                          <td>{repo.open_issues}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-2">
                      <small className="text-muted">
                        <div>Last commit: {new Date(repo.last_commit_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                        <div>Total commits: {repo.total_commits}</div>
                      </small>
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

CodeSamplesTable.propTypes = {
  category: PropTypes.string,
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
    })
  ).isRequired,
})

CodeSamplesTable.propTypes = {
  category: PropTypes.string,
}
export default CodeSamplesTable
export { repositoriesStateShape }
