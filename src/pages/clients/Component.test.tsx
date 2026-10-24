import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { serveSiteData } from '../../../test/handlers'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import Clients from './Component'

const RECOMMENDATIONS = [
  makePost({
    id: 10,
    slug: 'jane-doe',
    date: '2019-03-01T12:00:00',
    title: { rendered: 'Jane Doe' },
    content: {
      rendered:
        '<p class="title">CTO at Acme</p><p class="relationship">managed Lawrence</p>' +
        '<p class="description">A pleasure to work with.</p>',
    },
  }),
]

const CLIENTS = [makePost({ id: 2, title: { rendered: 'Acme' } })]

describe('Clients', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it('shows the recommendations and the client logos', async () => {
    server.use(...serveSiteData({ recommendations: RECOMMENDATIONS, clients: CLIENTS }))
    renderWithProviders(<Clients />)

    expect(screen.getByRole('main', { name: 'Clients Page' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'MY CLIENTS' })
    ).toBeInTheDocument()
    expect(
      (
        await screen.findAllByRole('article', {
          name: 'LinkedIn Recommendation Jane Doe',
          hidden: true,
        })
      ).length
    ).toBeGreaterThan(0)
    expect(screen.getByRole('region', { name: 'Client Logos' })).toBeInTheDocument()
    expect(await screen.findByRole('article', { name: 'Acme' })).toBeInTheDocument()

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/clients')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Clients')
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
      ])
    )
  })

  it('shows no recommendations while they load', async () => {
    server.use(...serveSiteData({ recommendations: RECOMMENDATIONS, clients: CLIENTS }))
    renderWithProviders(<Clients />)

    expect(
      screen.getByRole('region', { name: 'Recommendations Carousel' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('article', { name: /LinkedIn Recommendation/, hidden: true })
    ).not.toBeInTheDocument()
    // let the data load before the test ends.
    expect(await screen.findByRole('article', { name: 'Acme' })).toBeInTheDocument()
  })

  it('still shows the client logos if the recommendations fail to load', async () => {
    server.use(...serveSiteData({ recommendations: 503, clients: CLIENTS }))
    renderWithProviders(<Clients />)

    expect(await screen.findByRole('article', { name: 'Acme' })).toBeInTheDocument()
    expect(
      screen.queryByRole('article', { name: /LinkedIn Recommendation/, hidden: true })
    ).not.toBeInTheDocument()
  })
})
