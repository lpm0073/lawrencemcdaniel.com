import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makeArticle } from '../../../../test/fixtures'
import { renderWithProviders } from '../../../../test/render'
import type { Article } from '../../../types'
import ArticlesTable from './Component'

function article(id: number, title: string, modified: string, skills: string[]): Article {
  return makeArticle({
    id,
    slug: `article-${id}`,
    link: `https://blog.lawrencemcdaniel.com/article-${id}/`,
    modified_gmt: modified,
    title: { rendered: title },
    excerpt: { rendered: `<p>About ${title}.</p>` },
    skills,
    yoast_head_json: {
      title: title,
      og_image: [{ width: 1200, height: 630, url: `https://cdn.example.com/${id}.jpg` }],
    },
  })
}

const ARTICLES = [
  article(1, 'Older React article', '2024-01-01T00:00:00', ['react', 'aws']),
  article(2, 'Newer React article', '2025-01-01T00:00:00', ['react']),
  article(3, 'Cloud article', '2023-01-01T00:00:00', ['cloud']),
]

function renderTable(
  props: { skill?: string; maxrows?: number } = {},
  isLoading = false
) {
  return renderWithProviders(<ArticlesTable {...props} />, {
    preloadedState: { articles: { isLoading, errMess: null, articles: ARTICLES } },
  })
}

describe('ArticlesTable', () => {
  it("shows a skill's articles, newest first", () => {
    renderTable({ skill: 'react' })

    const articles = screen.getAllByRole('table', { name: /^Article / })
    expect(articles.map((table) => table.getAttribute('aria-label'))).toEqual([
      'Article Newer React article',
      'Article Older React article',
    ])
    expect(screen.getByRole('link', { name: 'Newer React article' })).toHaveAttribute(
      'href',
      'https://blog.lawrencemcdaniel.com/article-2/'
    )
    expect(
      within(articles[1]).getByText('About Older React article.')
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Older React article' })).toHaveAttribute(
      'src',
      'https://cdn.example.com/1.jpg'
    )
    expect(screen.queryByText('Cloud article')).not.toBeInTheDocument()
  })

  it('shows every article without a skill, and more on request', async () => {
    const { user } = renderTable({ maxrows: 2 })

    expect(screen.getAllByRole('link')).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: 'More (1 remaining)' }))

    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Cloud article' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /More/ })).not.toBeInTheDocument()
  })

  it('shows a placeholder for an article without an excerpt', () => {
    renderWithProviders(<ArticlesTable />, {
      preloadedState: {
        articles: {
          isLoading: false,
          errMess: null,
          articles: [{ ...ARTICLES[2], excerpt: { rendered: '' } }],
        },
      },
    })
    expect(screen.getByText('No description available')).toBeInTheDocument()
  })

  it('shows a spinner while the articles load', () => {
    renderTable({}, true)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
