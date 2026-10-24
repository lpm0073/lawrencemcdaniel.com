import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { SpecialtiesState } from '../../redux/specialties'
import Fullstack from './Component'

const SPECIALTIES: SpecialtiesState = {
  isLoading: false,
  errMess: null,
  logos: [],
  featured_logos: [],
  items: [
    makePost({
      id: 8,
      slug: 'django',
      title: { rendered: 'Django' },
      skills: ['full-stack'],
    }),
  ],
}

describe('Fullstack', () => {
  beforeEach(() => {
    // jsdom has no 2D canvas context; the skill columns skip their animation without one.
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  })

  it('shows the full stack skills', () => {
    renderWithProviders(<Fullstack specialties={SPECIALTIES} />)

    expect(screen.getByRole('main', { name: 'Full Stack Developer' })).toBeInTheDocument()
    for (const skill of ['Frontend', 'Backend', 'Database', 'DevOps', 'APIs']) {
      expect(screen.getByRole('article', { name: skill })).toBeInTheDocument()
    }
    expect(screen.getAllByText('100%')).toHaveLength(5)
    expect(screen.getByRole('link', { name: 'here' })).toHaveAttribute(
      'href',
      '/consulting'
    )
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
  })

  it('adds the canonical link and structured data', async () => {
    renderWithProviders(<Fullstack specialties={SPECIALTIES} />, {
      preloadedState: {
        repositories: {
          isLoading: false,
          errMess: null,
          repos: [makeRepository({ skills: ['full-stack'] })],
        },
        specialties: SPECIALTIES,
      },
    })

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/full-stack')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Full Stack Developer')
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'SoftwareSourceCode' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({ '@type': 'DefinedTerm', name: 'Django' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/full-stack/',
        }),
      ])
    )
  })
})
