import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import type { AppStore } from '../../redux/configureStore'
import Datascience from './Component'

// the specialties' skills are the names of their WordPress tags.
const TAGS = [
  { id: 72, name: 'data-science' },
  { id: 74, name: 'react' },
]
const SPECIALTIES = [
  makePost({ id: 9, slug: 'pandas', title: { rendered: 'Pandas' }, tags: [72] }),
  makePost({ id: 10, slug: 'redux', title: { rendered: 'Redux' }, tags: [74] }),
]
const REPOSITORIES = [
  makeRepository({ skills: ['data-science'] }),
  makeRepository({
    name: 'FullStackWithLawrence/other',
    html_url: 'https://github.com/FullStackWithLawrence/other',
    skills: ['react'],
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

describe('Datascience', () => {
  it('shows the data science credentials and specialties', async () => {
    server.use(...serveSiteData())
    const { store } = renderWithProviders(<Datascience />)

    expect(screen.getByRole('main', { name: 'Data Science Page' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Data Scientist' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Smarter' })).toHaveAttribute(
      'href',
      'https://smarter.sh'
    )
    expect(
      screen.getAllByRole('img', {
        name: 'Wharton Analytics Completion Certificate for Lawrence McDaniel',
      })
    ).toHaveLength(4)
    // the specialties banner
    expect(screen.getByRole('heading', { name: 'ALGORITHMS' })).toBeInTheDocument()
    // the specialties table
    for (const specialty of [
      'Regression',
      'Neural Networks',
      'Support Vector Machines',
      'Anomaly Detection',
      'Recommender Systems',
      'Unsupervised Learning',
    ]) {
      expect(screen.getByRole('rowheader', { name: specialty })).toBeInTheDocument()
    }
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    await waitForData(store)
  })

  it('adds the canonical link, meta tags and structured data', async () => {
    server.use(
      ...serveSiteData({
        specialties: SPECIALTIES,
        tags: TAGS,
        repositories: REPOSITORIES,
      })
    )
    const { store } = renderWithProviders(<Datascience />)

    await waitForCanonical('https://lawrencemcdaniel.com/data-science')
    expect(metaContent('keywords')).toMatch(/^Lawrence McDaniel, machine learning/)
    expect(metaContent('og:description')).toMatch(/^Data Scientist - Machine learning/)
    // only the data science repositories and skills.
    await waitFor(() =>
      expect(nodesOfType('SoftwareSourceCode')).toEqual([
        expect.objectContaining({
          codeRepository: 'https://github.com/FullStackWithLawrence/react-mdr',
        }),
      ])
    )
    await waitFor(() =>
      expect(nodesOfType('DefinedTerm')).toEqual([
        expect.objectContaining({ name: 'Pandas' }),
      ])
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          image:
            'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220349/data-science-certificate.jpg',
        }),
      ])
    )
    await waitForData(store)
  })

  it('leaves out of the structured data what fails to load', async () => {
    server.use(...serveSiteData({ specialties: 500, repositories: 503 }))
    const { store } = renderWithProviders(<Datascience />)

    await waitForData(store)
    await waitForCanonical('https://lawrencemcdaniel.com/data-science')
    expect(screen.getByRole('main', { name: 'Data Science Page' })).toBeInTheDocument()
    expect(nodesOfType('SoftwareSourceCode')).toEqual([])
    expect(nodesOfType('DefinedTerm')).toEqual([])
    expect(nodesOfType('Article')).toHaveLength(1)
  })
})
