import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { ClientsState } from '../../redux/clients'
import type { RecommendationsState } from '../../redux/recommendations'
import { APP_CONFIG } from '../../shared/constants'
import Clients from './Component'

const RECOMMENDATIONS: RecommendationsState = {
  isLoading: false,
  errMess: null,
  items: [
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
  ],
}

const CLIENTS: ClientsState = {
  isLoading: false,
  errMess: null,
  logos: [makePost({ id: 2, title: { rendered: 'Acme' } })],
}

describe('Clients', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it('shows the recommendations and the client logos', async () => {
    renderWithProviders(<Clients recommendations={RECOMMENDATIONS} clients={CLIENTS} />, {
      preloadedState: { clients: CLIENTS },
    })

    expect(screen.getByRole('main', { name: 'Clients Page' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'MY CLIENTS' })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('article', {
        name: 'LinkedIn Recommendation Jane Doe',
        hidden: true,
      }).length
    ).toBeGreaterThan(0)
    expect(screen.getByRole('region', { name: 'Client Logos' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Acme' })).toBeInTheDocument()

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/clients')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Clients')
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
      ])
    )
  })
})
