import { screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { siteHandlers } from '../../../test/handlers'
import { waitForCanonical } from '../../../test/pageHead'
import { server } from '../../../test/server'
import { renderWithProviders } from '../../../test/render'
import { APP_CONFIG } from '../../shared/constants'
import Home from './Component'

describe('Home', () => {
  beforeEach(() => {
    // the logo cube loads the specialties' logos.
    server.use(...siteHandlers)
    // the logo cube repaints on timers; they never need to run here.
    vi.useFakeTimers({ toFake: ['setTimeout', 'setInterval'] })
    return () => vi.useRealTimers()
  })

  it('introduces Lawrence McDaniel', () => {
    renderWithProviders(<Home />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Lawrence McDaniel headshot' })
    ).toHaveAttribute('src', APP_CONFIG.static.images.default)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Lawrence McDaniel' })
    ).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Logo Cube' })).toBeInTheDocument()
  })

  it('offers contact and the Smarter Project', () => {
    renderWithProviders(<Home />)

    expect(screen.getByRole('link', { name: 'Work with me' })).toHaveAttribute(
      'href',
      '/contact'
    )
    expect(screen.getByRole('link', { name: 'The Smarter Project' })).toHaveAttribute(
      'href',
      '/smarter'
    )
  })

  it.each([
    ['Programmer', '/' + APP_CONFIG.skills.fullStack, '_self'],
    ['Consultant', '/consulting', '_self'],
    ['Data Scientist', '/' + APP_CONFIG.skills.dataScience, '_self'],
    ['The Smarter Project', '/smarter', '_self'],
    [
      'Educator',
      'https://extendedlearning.ubc.ca/about/our-instructors?field_course_program_areas_target_id_verf=All&field_instr_first_name=Lawrence&field_instr_last_name=McDaniel',
      '_blank',
    ],
    ['Code Samples', 'https://github.com/fullStackWithLawrence/', '_blank'],
    ['Photographer', 'https://photography.lawrencemcdaniel.com/', '_blank'],
    ['Blogger', APP_CONFIG.urls.blog, '_blank'],
  ])('links the %s job title', (name, href, target) => {
    renderWithProviders(<Home />)

    expect(
      screen.getByRole('heading', { level: 2, name: new RegExp(name) })
    ).toBeVisible()
    const titles = screen.getByRole('region', { name: 'Titles' })
    const link = within(titles).getByRole('link', { name: new RegExp(name) })
    expect(link).toHaveAttribute('href', href)
    expect(link).toHaveAttribute('target', target)
  })

  it('has a canonical link and JSON-LD for Lawrence McDaniel', async () => {
    vi.useRealTimers()
    renderWithProviders(<Home />)

    const graph = await waitForCanonical(APP_CONFIG.urls.site)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
        expect.objectContaining({ '@type': 'WebSite' }),
      ])
    )
  })
})
