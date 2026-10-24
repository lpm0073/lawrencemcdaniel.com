import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makeRepository } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import type { AppStore } from '../../redux/configureStore'
import CloudComputing from './Component'

const REPOSITORIES = [
  makeRepository({
    name: 'FullStackWithLawrence/terraform-kubernetes',
    html_url: 'https://github.com/FullStackWithLawrence/terraform-kubernetes',
    skills: ['cloud'],
  }),
  makeRepository({ skills: ['full-stack'] }),
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

describe('CloudComputing', () => {
  it('describes the cloud computing services', async () => {
    server.use(...serveSiteData())
    const { store } = renderWithProviders(<CloudComputing />)

    expect(screen.getByRole('main', { name: 'Cloud Computing' })).toBeInTheDocument()
    expect(screen.getByText('CLOUD')).toBeInTheDocument()
    expect(screen.getByText(/expert Terraform developer/)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Code Samples & Publications' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'here' })).toHaveAttribute(
      'href',
      '/consulting'
    )
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    await waitForData(store)
  })

  it("adds the canonical link and the cloud repositories' structured data", async () => {
    server.use(...serveSiteData({ repositories: REPOSITORIES }))
    const { store } = renderWithProviders(<CloudComputing />)

    await waitForCanonical('https://lawrencemcdaniel.com/cloud')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Cloud Expert')
    // only the cloud repositories, not the full-stack-only one.
    await waitFor(() =>
      expect(nodesOfType('SoftwareSourceCode')).toEqual([
        expect.objectContaining({
          codeRepository: 'https://github.com/FullStackWithLawrence/terraform-kubernetes',
        }),
      ])
    )
    expect(JSON.stringify(jsonLdGraph())).not.toContain(
      'https://github.com/FullStackWithLawrence/react-mdr'
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/cloud/',
          description: 'Cloud Computing',
        }),
      ])
    )
    await waitForData(store)
  })

  it('leaves the repositories out of the structured data when they fail to load', async () => {
    server.use(...serveSiteData({ repositories: 500 }))
    const { store } = renderWithProviders(<CloudComputing />)

    await waitForData(store)
    await waitForCanonical('https://lawrencemcdaniel.com/cloud')
    expect(screen.getByRole('main', { name: 'Cloud Computing' })).toBeInTheDocument()
    expect(nodesOfType('SoftwareSourceCode')).toEqual([])
    expect(nodesOfType('Person')).toHaveLength(1)
  })
})
