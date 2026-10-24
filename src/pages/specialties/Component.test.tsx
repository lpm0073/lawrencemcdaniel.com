import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import type { SpecialtiesState } from '../../redux/specialties'
import { APP_CONFIG } from '../../shared/constants'
import Specialties from './Component'

const SPECIALTIES: SpecialtiesState = {
  isLoading: false,
  errMess: null,
  logos: [],
  featured_logos: [],
  items: [
    makePost({
      id: 1,
      title: { rendered: 'Django' },
      skills: ['full-stack'],
      acf: { url: 'https://www.djangoproject.com/' },
    }),
  ],
}

describe('Specialties', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it('shows the specialties, the technologies and a link to the code samples', () => {
    render(<Specialties specialties={SPECIALTIES} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'MY SPECIALTIES' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 4, name: 'FULL STACK DEVELOPMENT' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('article', { name: 'Django', hidden: true }).length
    ).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /Code samples/ })).toHaveAttribute(
      'href',
      'consulting/'
    )
  })

  it('lists the technologies Lawrence McDaniel knows about in the JSON-LD', async () => {
    render(<Specialties specialties={SPECIALTIES} />)

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/specialties')
    expect(metaContent('description')).toBe(
      'Lawrence McDaniel - Professional Specialties'
    )
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Person',
          knowsAbout: expect.arrayContaining([
            expect.objectContaining({ name: 'Django' }),
          ]),
        }),
      ])
    )
  })
})
