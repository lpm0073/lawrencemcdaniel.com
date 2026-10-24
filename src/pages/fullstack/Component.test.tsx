import { screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import type { AppStore } from '../../redux/configureStore'
import Fullstack from './Component'

// the specialties' skills are the names of their WordPress tags.
const TAGS = [
  { id: 71, name: 'full-stack' },
  { id: 70, name: 'cloud' },
]
const SPECIALTIES = [
  makePost({ id: 8, slug: 'django', title: { rendered: 'Django' }, tags: [71] }),
  makePost({ id: 9, slug: 'terraform', title: { rendered: 'Terraform' }, tags: [70] }),
]
const REPOSITORIES = [
  makeRepository({ skills: ['full-stack'] }),
  makeRepository({
    name: 'FullStackWithLawrence/other',
    html_url: 'https://github.com/FullStackWithLawrence/other',
    skills: ['cloud'],
  }),
]

/** Waits until every request the page made has been answered. */
async function waitForData(store: AppStore) {
  await waitFor(() => {
    const queries = Object.values(store.getState().api.queries)
    expect(queries.length).toBeGreaterThan(0)
    expect(queries.every((query) => query?.status !== 'pending')).toBe(true)
  })
}

const nodesOfType = (type: string) =>
  jsonLdGraph().filter((node) => node['@type'] === type)

describe('Fullstack', () => {
  beforeEach(() => {
    // jsdom has no 2D canvas context; the skill columns skip their animation without one.
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  })

  it('shows the full stack skills', async () => {
    server.use(...serveSiteData())
    const { store } = renderWithProviders(<Fullstack />)

    expect(screen.getByRole('main', { name: 'Full Stack Developer' })).toBeInTheDocument()
    for (const skill of ['Frontend', 'Backend', 'Database', 'DevOps', 'APIs']) {
      expect(screen.getByRole('article', { name: skill })).toBeInTheDocument()
    }
    expect(screen.getAllByText('100%')).toHaveLength(5)
    expect(screen.getByRole('link', { name: 'here' })).toHaveAttribute(
      'href',
      '/consulting'
    )
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    await waitForData(store)
  })

  it('adds the canonical link and structured data', async () => {
    server.use(
      ...serveSiteData({
        specialties: SPECIALTIES,
        tags: TAGS,
        repositories: REPOSITORIES,
      })
    )
    const { store } = renderWithProviders(<Fullstack />)

    await waitForCanonical('https://lawrencemcdaniel.com/full-stack')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Full Stack Developer')
    // only the full stack repositories and skills.
    await waitFor(() =>
      expect(nodesOfType('SoftwareSourceCode')).toEqual([
        expect.objectContaining({
          codeRepository: 'https://github.com/FullStackWithLawrence/react-mdr',
        }),
      ])
    )
    await waitFor(() =>
      expect(nodesOfType('DefinedTerm')).toEqual([
        expect.objectContaining({ name: 'Django' }),
      ])
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/full-stack/',
        }),
      ])
    )
    await waitForData(store)
  })

  it('leaves out of the structured data what fails to load', async () => {
    server.use(...serveSiteData({ specialties: 500, repositories: 503 }))
    const { store } = renderWithProviders(<Fullstack />)

    await waitForData(store)
    await waitForCanonical('https://lawrencemcdaniel.com/full-stack')
    expect(screen.getByRole('main', { name: 'Full Stack Developer' })).toBeInTheDocument()
    expect(nodesOfType('SoftwareSourceCode')).toEqual([])
    expect(nodesOfType('DefinedTerm')).toEqual([])
    expect(nodesOfType('Person')).toHaveLength(1)
  })
})
