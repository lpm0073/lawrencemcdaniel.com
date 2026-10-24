/*
    CodeSamplesTable Component.

    This is a Redux-managed React component that renders a table of code samples from
    GitHub Api. It displays repositories with metadata such as
    engagement metrics, last commit date, languages used, and skills.
 */
import React, { useState, type ReactElement } from 'react'
import { useAppSelector } from '../../../redux/hooks'
import type { Repository } from '../../../types'

import { skillIcon, skillLabel, ContentCategories } from '../Component'
import Loading from '../../../components/Loading'

import './styles.css'

/** A repository from the Redux store, with its skill labels and icons. */
type RepositoryRow = Repository & {
  skillLabels: string[]
  skillIcons: ReactElement[]
}

interface RepoProps {
  repo: RepositoryRow
}

// ---------------------------- Internal Components ------------------------------

const CodeEngagement = ({ repo }: RepoProps) => {
  /*
    Renders a table showing the popularity metrics for the given repository.
    Part of repository metadata. Sourced from github.json.
   */
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const CodeCommits = ({ repo }: RepoProps) => {
  /*
    Renders the last commit date and total commits for the given repository.
    Part of repository metadata. Sourced from github.json.
   */
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const CodeLanguages = ({ repo }: RepoProps) => {
  /*
    Renders a list of up to 3 programming languages used in the given repository.
    Part of repository metadata. Sourced from github.json.
   */
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const CodeMetadata = ({ repo }: RepoProps) => {
  /*
   Top-level component that renders metadata information for the given repository.
   Only shown on medium and larger screens.
   ContentCategories skills={repo.skillIcons}
   */
  return (
    <React.Fragment>
      <ContentCategories categories={repo.skillIcons} />
      <CodeEngagement repo={repo} />
      <CodeCommits repo={repo} />
      <hr />
      <CodeLanguages repo={repo} />
    </React.Fragment>
  )
}

const CodeRepositoryLink = ({ repo }: RepoProps) => {
  /*
   Renders a link to the given repository, with a padlock icon if it's private.
   */
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const CodeDescription = ({ repo }: RepoProps) => {
  /*
    Renders the README content snippet for the given repository, or a placeholder if none exists.
    README filtering logic is handled in shared/githubDownloader.js.
   */
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const CodeRepository = ({ repo }: RepoProps) => {
  /*
    Top-level component that renders the repository link and description.
   */
  return (
    <article aria-label={repo.name}>
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
    </article>
  )
}

// ------------------------------ Main Component ------------------------------

interface CodeSamplesTableProps {
  /** A skill slug from APP_CONFIG.skills. Omit for every repository. */
  skill?: string
  maxrows?: number
}

const CodeSamplesTable = ({ skill, maxrows = 100 }: CodeSamplesTableProps) => {
  /*
   Renders a table of code samples for the given skill.
   */
  const [currentMaxRows, setCurrentMaxRows] = useState(maxrows)

  const reduxRepositories = useAppSelector((state) => state.repositories)
  const reduxSpecialties = useAppSelector((state) => state.specialties)
  const reposArray = Array.isArray(reduxRepositories.repos) ? reduxRepositories.repos : []

  const untrimmedRepos = [
    ...(skill ? reposArray.filter((redux) => redux.skills.includes(skill)) : reposArray),
  ]
    .map((repo) => {
      // If skill is specified, remove the corresponding entry so that it doesn't
      // redundantly appear in the table.
      if (skill && repo.skills) {
        const skillIndex = repo.skills.indexOf(skill)
        if (skillIndex !== -1) {
          return {
            ...repo,
            skills: repo.skills.filter((_, index) => index !== skillIndex),
          }
        }
      }
      return repo
    })
    .map((repo) => ({
      ...repo,
      skillLabels: repo.skills.map(skillLabel).filter(Boolean),
      skillIcons: repo.skills
        .map((skillCode) => skillIcon(skillCode, reduxSpecialties))
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

  const untrimmedCount = untrimmedRepos.length
  const trimmedRepos = untrimmedRepos.slice(0, currentMaxRows)

  const handleShowMore = () => {
    setCurrentMaxRows(1000)
  }

  return (
    <section className="table-responsive" aria-label="Code Samples">
      {reduxRepositories.isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <table
            className="table table-bordered table-striped table-fixed mt-1 w-100"
            id="code-samples-table"
          >
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '80%' }}>Repository</th>
                <th className="hide-medium" style={{ width: '20%' }}></th>
              </tr>
            </thead>
            <tbody>
              {trimmedRepos.map((repo) => (
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

          {untrimmedCount > currentMaxRows && (
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={handleShowMore}>
                More ({untrimmedCount - currentMaxRows} remaining)
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </section>
  )
}

export default CodeSamplesTable
