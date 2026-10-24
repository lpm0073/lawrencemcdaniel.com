import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { serveSiteData } from '../../../test/handlers'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import Portfolio from './Component'

const PORTFOLIO = [
  makePost({ id: 7, slug: 'edx-at-scale', title: { rendered: 'edX at scale' } }),
]

describe('Portfolio', () => {
  it('shows the projects, with Lawrence McDaniel in the JSON-LD', async () => {
    server.use(...serveSiteData({ portfolio: PORTFOLIO }))
    renderWithProviders(<Portfolio />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'PROJECT PORTFOLIO' })
    ).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'edX at scale' })).toHaveAttribute(
      'href',
      '/portfolio/edx-at-scale'
    )

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/portfolio')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Portfolio')
    expect(graph).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
    )
  })

  it('shows no projects until they load', async () => {
    server.use(...serveSiteData({ portfolio: PORTFOLIO }))
    renderWithProviders(<Portfolio />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'edX at scale' })).toBeInTheDocument()
  })

  it('shows no projects if they fail to load', async () => {
    server.use(...serveSiteData({ portfolio: 503 }))
    const { store } = renderWithProviders(<Portfolio />)

    await waitFor(() =>
      expect(store.getState().api.queries['getPortfolio(undefined)']?.status).toBe(
        'rejected'
      )
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
