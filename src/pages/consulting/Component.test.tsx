import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import {
  helmetHead,
  jsonLdGraph,
  metaContent,
  waitForCanonical,
} from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import type { AppStore } from '../../redux/configureStore'
import Consulting from './Component'

// the specialties' skills are the names of their WordPress tags.
const TAGS = [
  { id: 74, name: 'react' },
  { id: 70, name: 'cloud' },
]
const SPECIALTIES = [
  makePost({ title: { rendered: 'Redux' }, tags: [74] }),
  makePost({ id: 2, title: { rendered: 'Terraform' }, tags: [70] }),
]
const REPOSITORIES = [
  makeRepository({ skills: ['react'] }),
  makeRepository({
    name: 'FullStackWithLawrence/other',
    html_url: 'https://github.com/FullStackWithLawrence/other',
    skills: ['cloud'],
  }),
]
const RECOMMENDATIONS = [
  makePost({
    categories: [45],
    title: { rendered: 'Jane Doe' },
    excerpt: { rendered: '<p>Great work.</p>' },
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

describe('Consulting', () => {
  it('lists the consulting services', async () => {
    server.use(...serveSiteData())
    const { store } = renderWithProviders(<Consulting />)

    expect(screen.getByRole('main', { name: 'Consulting Services' })).toBeInTheDocument()
    for (const service of [
      'Data Science',
      'Training',
      'Full Stack development',
      'Cloud Computing',
      'Dev Ops',
    ]) {
      expect(screen.getByText(service)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute(
      'href',
      '/contact'
    )
    expect(screen.getByRole('button', { name: 'Contact Me' })).toHaveAttribute(
      'href',
      '/contact'
    )
    expect(screen.getByRole('link', { name: 'advisory services' })).toHaveAttribute(
      'href',
      '/openedx'
    )
    const learnMore = screen.getAllByRole('link', { name: 'Learn more' })
    expect(learnMore.map((link) => link.getAttribute('href'))).toEqual([
      '/data-science',
      '/full-stack',
      '/full-stack',
      '/full-stack',
    ])
    await waitForData(store)
  })

  it('adds the canonical link and a Service with its reviews', async () => {
    server.use(
      ...serveSiteData({
        recommendations: RECOMMENDATIONS,
        specialties: SPECIALTIES,
        tags: TAGS,
        repositories: REPOSITORIES,
      })
    )
    const { store } = renderWithProviders(<Consulting />)

    await waitForCanonical('https://lawrencemcdaniel.com/consulting')
    // RenderPageTitle's Helmet is nested deeper, so its title wins over the page's.
    expect(helmetHead().title).toBe('Lawrence McDaniel - Consulting Services')
    expect(metaContent('description')).toMatch(/^Consulting services and technical/)
    await waitFor(() =>
      expect(JSON.stringify(jsonLdGraph())).toContain('Review by Jane Doe')
    )
    // every repository and every skill.
    await waitFor(() => expect(nodesOfType('SoftwareSourceCode')).toHaveLength(2))
    await waitFor(() =>
      expect(nodesOfType('DefinedTerm')).toEqual([
        expect.objectContaining({ name: 'Redux' }),
        expect.objectContaining({ name: 'Terraform' }),
      ])
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
        expect.objectContaining({ '@type': 'Service' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          relatedLink: 'https://lawrencemcdaniel.com/consulting',
        }),
      ])
    )
    await waitForData(store)
  })

  it('still describes the Service when its data fails to load', async () => {
    server.use(
      ...serveSiteData({ recommendations: 500, specialties: 500, repositories: 503 })
    )
    const { store } = renderWithProviders(<Consulting />)

    await waitForData(store)
    await waitForCanonical('https://lawrencemcdaniel.com/consulting')
    expect(screen.getByRole('main', { name: 'Consulting Services' })).toBeInTheDocument()
    expect(nodesOfType('Service')).toHaveLength(1)
    expect(JSON.stringify(jsonLdGraph())).not.toContain('Review by Jane Doe')
    expect(nodesOfType('SoftwareSourceCode')).toEqual([])
    expect(nodesOfType('DefinedTerm')).toEqual([])
  })
})
