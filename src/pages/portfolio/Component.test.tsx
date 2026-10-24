import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { PortfolioState } from '../../redux/portfolio'
import { APP_CONFIG } from '../../shared/constants'
import Portfolio from './Component'

const PORTFOLIO: PortfolioState = {
  isLoading: false,
  errMess: null,
  projects: [
    makePost({ id: 7, slug: 'edx-at-scale', title: { rendered: 'edX at scale' } }),
  ],
}

describe('Portfolio', () => {
  it('shows the projects, with Lawrence McDaniel in the JSON-LD', async () => {
    renderWithProviders(<Portfolio portfolio={PORTFOLIO} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'PROJECT PORTFOLIO' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'edX at scale' })).toHaveAttribute(
      'href',
      '/portfolio/edx-at-scale'
    )

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/portfolio')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Portfolio')
    expect(graph).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
    )
  })
})
