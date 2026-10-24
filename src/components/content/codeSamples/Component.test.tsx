import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makeRepository } from '../../../../test/fixtures'
import { renderWithProviders } from '../../../../test/render'
import type { Repository } from '../../../types'
import CodeSamplesTable from './Component'

const REPOS: Repository[] = [
  makeRepository({
    name: 'quiet-repo',
    html_url: 'https://github.com/example/quiet-repo',
    stargazers_count: 1,
    watchers: 1,
    forks: 0,
    total_commits: 3,
    skills: ['react', 'aws'],
    private: true,
    readme: { content: '<p>Quiet readme.</p>' },
  }),
  makeRepository({
    name: 'busy-repo',
    html_url: 'https://github.com/example/busy-repo',
    stargazers_count: 1,
    watchers: 1,
    forks: 0,
    total_commits: 900,
    skills: ['react'],
    last_commit_date: '2024-03-15T12:00:00Z',
    languages: [
      { name: 'Python', bytes: 700, percentage: '70.0' },
      { name: 'Shell', bytes: 200, percentage: '20.0' },
      { name: 'HTML', bytes: 90, percentage: '9.0' },
      { name: 'CSS', bytes: 10, percentage: '1.0' },
    ],
  }),
  makeRepository({
    name: 'popular-cloud-repo',
    html_url: 'https://github.com/example/popular-cloud-repo',
    stargazers_count: 500,
    skills: ['cloud'],
  }),
]

function renderTable(
  props: { skill?: string; maxrows?: number } = {},
  isLoading = false
) {
  return renderWithProviders(<CodeSamplesTable {...props} />, {
    preloadedState: { repositories: { isLoading, errMess: null, repos: REPOS } },
  })
}

describe('CodeSamplesTable', () => {
  it("shows a skill's repositories, most engaged and then most committed first", () => {
    renderTable({ skill: 'react' })

    const repos = screen.getAllByRole('article')
    expect(repos.map((repo) => within(repo).getByRole('link').textContent)).toEqual([
      'busy-repo',
      'quiet-repo',
    ])
    expect(screen.queryByText('popular-cloud-repo')).not.toBeInTheDocument()

    // busy-repo's metadata: commits and its top three languages.
    expect(screen.getByText('Last commit: Mar 2024')).toBeInTheDocument()
    expect(screen.getByText('Total commits: 900')).toBeInTheDocument()
    expect(screen.getByText('Python (70.0%)')).toBeInTheDocument()
    expect(screen.getByText('HTML (9.0%)')).toBeInTheDocument()
    expect(screen.queryByText('CSS (1.0%)')).not.toBeInTheDocument()
    expect(screen.getByText('No description available')).toBeInTheDocument()

    // quiet-repo: private, with a readme, and an icon for its other skill.
    expect(screen.getByRole('img', { name: 'Private repository' })).toBeInTheDocument()
    expect(screen.getByText('Quiet readme.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'cloud' })).toHaveAttribute('href', '/cloud')
  })

  it('shows every repository without a skill, and more on request', async () => {
    const { user } = renderTable({ maxrows: 1 })

    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'popular-cloud-repo' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'More (2 remaining)' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('shows a spinner while the repositories load', () => {
    renderTable({}, true)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
  })

  it('shows nothing when the repositories are not a list', () => {
    renderWithProviders(<CodeSamplesTable />, {
      preloadedState: {
        repositories: {
          isLoading: false,
          errMess: null,
          repos: null as unknown as Repository[],
        },
      },
    })
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
