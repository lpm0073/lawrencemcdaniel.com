import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import type { AppStore } from '../../redux/configureStore'
import ReactPage from './Component'

// the specialties' skills are the names of their WordPress tags.
const TAGS = [
  { id: 74, name: 'react' },
  { id: 70, name: 'cloud' },
]
const SPECIALTIES = [
  makePost({ title: { rendered: 'Redux' }, tags: [74] }),
  makePost({ id: 2, title: { rendered: 'Terraform' }, tags: [70] }),
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

describe('ReactPage', () => {
  it('describes how the site is built', async () => {
    server.use(...serveSiteData())
    const { store } = renderWithProviders(<ReactPage />)

    expect(screen.getByRole('main', { name: 'ReactJS Page' })).toBeInTheDocument()
    expect(screen.getByText('REACTJS')).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'ReactJS Page Content' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download Resume' })).toHaveAttribute(
      'target',
      '_blank'
    )
    expect(
      screen.getByRole('heading', { name: 'Code Samples & Publications' })
    ).toBeInTheDocument()
    await waitForData(store)
  })

  it('adds the canonical link and structured data', async () => {
    server.use(...serveSiteData({ specialties: SPECIALTIES, tags: TAGS }))
    const { store } = renderWithProviders(<ReactPage />)

    await waitForCanonical('https://lawrencemcdaniel.com/react')
    expect(metaContent('og:description')).toMatch(/^Full Stack Web Developer/)
    // only the react skills.
    await waitFor(() =>
      expect(nodesOfType('DefinedTerm')).toEqual([
        expect.objectContaining({ name: 'Redux' }),
      ])
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/reactjs/',
        }),
      ])
    )
    await waitForData(store)
  })

  it('leaves the skills out of the structured data when they fail to load', async () => {
    server.use(...serveSiteData({ specialties: 500 }))
    const { store } = renderWithProviders(<ReactPage />)

    await waitForData(store)
    await waitForCanonical('https://lawrencemcdaniel.com/react')
    expect(screen.getByRole('main', { name: 'ReactJS Page' })).toBeInTheDocument()
    expect(nodesOfType('DefinedTerm')).toEqual([])
    expect(nodesOfType('Article')).toHaveLength(1)
  })
})
