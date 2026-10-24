import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
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
import Openedx from './Component'

const OPENEDX_URL = 'https://lawrencemcdaniel.com/openedx'

/** Waits until every request the page made has been answered. */
async function waitForData(store: AppStore) {
  await waitFor(() => {
    const queries = Object.values(store.getState().api.queries)
    expect(queries.length).toBeGreaterThan(0)
    expect(queries.every((query) => query?.status !== 'pending')).toBe(true)
  })
}

describe('Openedx', () => {
  it('describes the Open edX services, clients and FAQ', async () => {
    server.use(
      ...serveSiteData({
        clients: [
          makePost({ id: 11, title: { rendered: 'edX' }, categories: [46], tags: [55] }),
        ],
      })
    )
    const { store, user } = renderWithProviders(<Openedx />)

    expect(screen.getByRole('main', { name: 'Open edX Consulting' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Production Installation & Configuration of Open edX®',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Open edX® Client List' })
    ).toBeInTheDocument()
    expect(await screen.findByRole('article', { name: 'edX' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Contact Me' })).toHaveAttribute(
      'href',
      '/contact'
    )

    const cost = screen.getByRole('button', { name: 'How much does Open edX cost?' })
    const firms = screen.getByRole('button', {
      name: 'Are there any consulting firms who specialize in Open edX?',
    })
    expect(cost).toHaveAttribute('aria-expanded', 'true')
    expect(firms).toHaveAttribute('aria-expanded', 'false')

    await user.click(firms)
    expect(firms).toHaveAttribute('aria-expanded', 'true')
    expect(cost).toHaveAttribute('aria-expanded', 'false')
    await waitForData(store)
  })

  it('adds the canonical link, meta tags and structured data', async () => {
    server.use(
      ...serveSiteData({
        recommendations: [
          makePost({ categories: [45], title: { rendered: 'John Roe' } }),
        ],
      })
    )
    const { store } = renderWithProviders(<Openedx />)

    await waitForCanonical(OPENEDX_URL)
    expect(helmetHead().linkTags).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ href: expect.stringMatching(/undefined/) }),
      ])
    )
    expect(metaContent('og:url')).toBe(OPENEDX_URL)
    expect(metaContent('description')).toMatch(/^Lawrence McDaniel - Open edX consultant/)
    expect(metaContent('og:description')).toBe(metaContent('description'))
    expect(metaContent('keywords')).toMatch(/^Lawrence McDaniel, open edx/)
    await waitFor(() =>
      expect(JSON.stringify(jsonLdGraph())).toContain('Review by John Roe')
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({ '@type': 'Service' }),
        expect.objectContaining({ '@type': 'FAQPage' }),
        expect.objectContaining({ '@type': 'HowTo' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/openedx',
        }),
      ])
    )
    await waitForData(store)
  })

  it('still describes the Service when the recommendations fail to load', async () => {
    server.use(...serveSiteData({ recommendations: 500 }))
    const { store } = renderWithProviders(<Openedx />)

    await waitForData(store)
    await waitForCanonical(OPENEDX_URL)
    expect(screen.getByRole('main', { name: 'Open edX Consulting' })).toBeInTheDocument()
    const graph = jsonLdGraph()
    expect(graph.filter((node) => node['@type'] === 'Service')).toHaveLength(1)
    expect(JSON.stringify(graph)).not.toContain('Review by John Roe')
  })
})
