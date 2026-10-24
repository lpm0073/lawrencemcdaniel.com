import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { renderWithProviders } from '../../../test/render'
import type { PortfolioState } from '../../redux/portfolio'
import ProjectsGrid from './projectsGrid'

const PORTFOLIO: PortfolioState = {
  isLoading: false,
  errMess: null,
  projects: [
    makePost({ id: 7, slug: 'edx-at-scale', title: { rendered: 'edX at scale' } }),
    makePost({ id: 8, slug: 'no-image', title: { rendered: 'No image' }, _embedded: {} }),
  ],
}

describe('ProjectsGrid', () => {
  it('links each project to its detail page', () => {
    renderWithProviders(<ProjectsGrid portfolio={PORTFOLIO} />)

    expect(screen.getByRole('link', { name: 'edX at scale' })).toHaveAttribute(
      'href',
      '/portfolio/edx-at-scale'
    )
    expect(screen.getByRole('link', { name: 'No image' })).toHaveAttribute(
      'href',
      '/portfolio/no-image'
    )
  })

  it('shows a spinner while loading', () => {
    renderWithProviders(<ProjectsGrid portfolio={PORTFOLIO} isLoading={true} />)

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
