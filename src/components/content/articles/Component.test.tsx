import { screen, waitFor, within } from '@testing-library/react'
import { http } from 'msw'
import { describe, expect, it } from 'vitest'

import { makeArticle } from '../../../../test/fixtures'
import { serveSiteData } from '../../../../test/handlers'
import { renderWithProviders } from '../../../../test/render'
import { server } from '../../../../test/server'
import type { Article } from '../../../types'
import ArticlesTable from './Component'

/** An article; its skills come from its categories, as the api derives them. */
function article(
  id: number,
  title: string,
  modified: string,
  categories: string[]
): Article {
  return makeArticle({
    id,
    slug: `article-${id}`,
    link: `https://blog.lawrencemcdaniel.com/article-${id}/`,
    modified_gmt: modified,
    title: { rendered: title },
    excerpt: { rendered: `<p>About ${title}.</p>` },
    categories,
    yoast_head_json: {
      title: title,
      og_image: [{ width: 1200, height: 630, url: `https://cdn.example.com/${id}.jpg` }],
    },
  })
}

const ARTICLES = [
  article(1, 'Older React article', '2024-01-01T00:00:00', ['reactjs', 'aws']),
  article(2, 'Newer React article', '2025-01-01T00:00:00', ['react']),
  article(3, 'Cloud article', '2023-01-01T00:00:00', ['aws']),
]

function renderTable(props: { skill?: string; maxrows?: number } = {}) {
  server.use(...serveSiteData({ articles: ARTICLES }))
  return renderWithProviders(<ArticlesTable {...props} />)
}

describe('ArticlesTable', () => {
  it("shows a skill's articles, newest first", async () => {
    renderTable({ skill: 'react' })

    const articles = await screen.findAllByRole('table', { name: /^Article / })
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

    expect(await screen.findAllByRole('link')).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: 'More (1 remaining)' }))

    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Cloud article' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /More/ })).not.toBeInTheDocument()
  })

  it('shows a placeholder for an article without an excerpt', async () => {
    server.use(
      ...serveSiteData({ articles: [{ ...ARTICLES[2], excerpt: { rendered: '' } }] })
    )
    renderWithProviders(<ArticlesTable />)
    expect(await screen.findByText('No description available')).toBeInTheDocument()
  })

  it('shows a spinner while the articles load', () => {
    server.use(
      http.get('*/data/blog.lawrencemcdaniel.com.json', () => new Promise(() => {}))
    )
    renderWithProviders(<ArticlesTable />)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('shows an empty table when the articles fail to load', async () => {
    server.use(...serveSiteData({ articles: 503 }))
    renderWithProviders(<ArticlesTable />)

    await waitFor(() =>
      expect(screen.queryByLabelText('three-dots-loading')).not.toBeInTheDocument()
    )
    expect(screen.getByRole('columnheader', { name: 'Article' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
