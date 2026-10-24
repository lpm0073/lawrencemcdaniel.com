import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { renderWithProviders } from '../../../test/render'
import ProjectsGrid from './projectsGrid'

const PROJECTS = [
  makePost({ id: 7, slug: 'edx-at-scale', title: { rendered: 'edX at scale' } }),
  makePost({ id: 8, slug: 'no-image', title: { rendered: 'No image' }, _embedded: {} }),
]

describe('ProjectsGrid', () => {
  it('links each project to its detail page', () => {
    renderWithProviders(<ProjectsGrid projects={PROJECTS} />)

    expect(screen.getByRole('link', { name: 'edX at scale' })).toHaveAttribute(
      'href',
      '/portfolio/edx-at-scale'
    )
    expect(screen.getByRole('link', { name: 'No image' })).toHaveAttribute(
      'href',
      '/portfolio/no-image'
    )
  })

  it('shows nothing without projects', () => {
    renderWithProviders(<ProjectsGrid projects={[]} />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
