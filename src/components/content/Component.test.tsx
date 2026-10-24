import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { makeMedia, makePost } from '../../../test/fixtures'
import { renderWithProviders } from '../../../test/render'
import { serveSiteData } from '../../../test/handlers'
import { server } from '../../../test/server'
import type { Specialties } from '../../redux/api'
import {
  Content,
  ContentCategories,
  skillIcon,
  skillLabel,
  skillLogoUrl,
} from './Component'

function specialtiesData(overrides: Partial<Specialties> = {}): Specialties {
  return {
    items: [],
    logos: [],
    featured_logos: [],
    ...overrides,
  }
}

// [code, label, link, logo]
const SKILLS: [string, string, string, string][] = [
  ['cloud', 'Cloud', '/cloud', 'assets/images/aws-logo.png'],
  ['aws', 'cloud', '/cloud', 'assets/images/aws-logo.png'],
  ['python', 'Python', '/full-stack', 'assets/images/python-logo.png'],
  [
    'data-science',
    'Data Science',
    '/data-science',
    'assets/images/data-science-icon.png',
  ],
  ['full-stack', 'Full Stack', '/full-stack', 'assets/images/pancakes.png'],
  ['react', 'React', '/react', 'assets/images/react-logo-300x261.png'],
  ['reactjs', 'React', '/react', 'assets/images/react-logo-300x261.png'],
  ['openedx', 'Open edX', '/openedx', 'assets/images/edx-logo.png'],
  ['open-edx', 'Open edX', '/openedx', 'assets/images/edx-logo.png'],
  ['terraform', 'cloud', '/cloud', 'assets/images/terraform-logo.png'],
  ['dev-ops', 'DevOps', '/full-stack', 'assets/images/pancakes.png'],
  ['wordpress', 'Full Stack', '/full-stack', 'assets/images/pancakes.png'],
  ['django', 'Full Stack', '/full-stack', 'assets/images/pancakes.png'],
]

describe('skill helpers', () => {
  it.each(SKILLS)(
    '%s is labelled %s, links to %s and shows %s',
    (code, label, href, logo) => {
      expect(skillLabel(code)).toBe(label)
      expect(skillLogoUrl(code, specialtiesData())).toBe(logo)

      render(skillIcon(code, specialtiesData()))
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', href)
      expect(screen.getByRole('img', { name: label })).toHaveAttribute('src', logo)
      expect(screen.getByTitle(`Click to view ${label} projects`)).toBeInTheDocument()
    }
  )

  it('skillLabel throws for an unknown skill', () => {
    expect(() => skillLabel('cobol')).toThrow(
      'skillLabel() categoryCode is not recognized: cobol'
    )
  })

  it('skillIcon throws for an unknown skill', () => {
    expect(() => skillIcon('cobol', specialtiesData())).toThrow()
  })

  it("skillLogoUrl falls back to the specialty's featured image", () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const specialties = specialtiesData({
      items: [makePost({ slug: 'kubernetes' })],
    })

    expect(skillLogoUrl('kubernetes', specialties)).toBe(makeMedia().source_url)
    expect(warn).toHaveBeenCalledWith(
      'skillLogoUrl() categoryCode is not locally served',
      'kubernetes'
    )
  })

  it('skillLogoUrl returns null for a skill with no logo', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const specialties = specialtiesData({
      items: [makePost({ slug: 'kubernetes', _embedded: {} })],
    })

    expect(skillLogoUrl('kubernetes', specialties)).toBeNull()
    expect(skillLogoUrl('cobol', specialties)).toBeNull()
    expect(error).toHaveBeenCalledWith('skillLogoUrl() unknown categoryCode', 'cobol')
  })
})

describe('ContentCategories', () => {
  it('shows at most six icons', () => {
    const icons = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((name) => (
      <img key={name} src={`/${name}.png`} alt={name} />
    ))
    render(<ContentCategories categories={icons} />)

    expect(screen.getAllByRole('img')).toHaveLength(6)
    expect(screen.queryByRole('img', { name: 'g' })).not.toBeInTheDocument()
  })

  it('shows nothing without categories', () => {
    render(<ContentCategories />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})

describe('Content', () => {
  it('shows code samples, articles and videos in tabs', async () => {
    server.use(...serveSiteData())
    const { user } = renderWithProviders(<Content skill="react" />)

    // each tab's table shows its records once they load.
    expect(
      await screen.findByRole('link', { name: 'FullStackWithLawrence/react-mdr' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('tab', { name: 'Code Samples', selected: true })
    ).toBeInTheDocument()
    expect(screen.getByText(/managed GitHub repositories/)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Articles' }))
    expect(
      screen.getByRole('tab', { name: 'Articles', selected: true })
    ).toBeInTheDocument()
    expect(screen.getByText(/articles that I've published/)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Videos' }))
    expect(
      screen.getByRole('tab', { name: 'Videos', selected: true })
    ).toBeInTheDocument()
    expect(screen.getByText(/Full Stack With Lawrence/)).toBeInTheDocument()
  })
})
