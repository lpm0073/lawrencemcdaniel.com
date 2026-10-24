import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import type { SpecialtiesState } from '../../redux/specialties'
import TechnologyCarousel from './Component'

const SPECIALTIES: SpecialtiesState = {
  isLoading: false,
  errMess: null,
  logos: [],
  featured_logos: [],
  items: [
    makePost({
      id: 1,
      title: { rendered: '<b>AWS</b>' },
      excerpt: { rendered: '<p>Amazon Web Services</p>' },
      skills: ['cloud'],
      acf: { url: 'https://aws.amazon.com' },
    }),
    makePost({
      id: 4,
      title: { rendered: 'Azure' },
      excerpt: { rendered: 'Microsoft Azure' },
      skills: ['cloud'],
    }),
    makePost({
      id: 2,
      title: { rendered: 'Django' },
      excerpt: { rendered: '' },
      skills: ['full-stack'],
    }),
    makePost({ id: 3, title: { rendered: 'No skills' }, skills: undefined }),
  ],
}

const LOADING: SpecialtiesState = { ...SPECIALTIES, isLoading: true, items: [] }

describe('TechnologyCarousel', () => {
  // Slides scrolled out of view are aria-hidden, so the queries include hidden elements.
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it("shows a skill's specialties", () => {
    render(<TechnologyCarousel specialties={SPECIALTIES} skill="cloud" />)

    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    const aws = screen.getAllByRole('article', { name: 'AWS', hidden: true })[0]
    expect(aws).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /Amazon Web Services/, hidden: true })[0]
    ).toHaveAttribute('href', 'https://aws.amazon.com')
    expect(
      screen.getAllByRole('img', { name: 'Amazon Web Services', hidden: true })[0]
    ).toHaveAttribute(
      'src',
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'
    )
    expect(
      screen.queryAllByRole('article', { name: 'Django', hidden: true })
    ).toHaveLength(0)
    expect(
      screen.queryAllByRole('article', { name: 'No skills', hidden: true })
    ).toHaveLength(0)
  })

  it('shows every specialty without a skill, with a default description', () => {
    render(<TechnologyCarousel specialties={SPECIALTIES} />)

    expect(
      screen.getAllByRole('article', { name: 'AWS', hidden: true }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByRole('article', { name: 'No skills', hidden: true }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByRole('img', {
        name: 'Django, a technology specialty of mine',
        hidden: true,
      }).length
    ).toBeGreaterThan(0)
  })

  it('shows the local logos until the specialties load', () => {
    const { rerender } = render(
      <TechnologyCarousel specialties={LOADING} skill="cloud" />
    )

    const local = screen.getAllByRole('img', { hidden: true })
    expect(local.length).toBeGreaterThan(0)
    expect(local[0]).toHaveAttribute('src', expect.stringMatching(/^assets\/images\//))

    // nothing changes while the parent says it is loading, or with no matching specialties.
    rerender(<TechnologyCarousel specialties={LOADING} skill="cloud" />)
    rerender(
      <TechnologyCarousel specialties={{ ...SPECIALTIES }} skill="cloud" isLoading />
    )
    rerender(<TechnologyCarousel specialties={{ ...SPECIALTIES }} skill="python" />)
    expect(screen.queryAllByRole('article', { name: 'AWS', hidden: true })).toHaveLength(
      0
    )

    rerender(<TechnologyCarousel specialties={SPECIALTIES} skill="cloud" />)
    expect(
      screen.getAllByRole('article', { name: 'AWS', hidden: true }).length
    ).toBeGreaterThan(0)
  })

  it('shows a spinner while loading', () => {
    render(<TechnologyCarousel specialties={SPECIALTIES} isLoading />)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('shows the local logos when the specialties are not a list', () => {
    render(
      <TechnologyCarousel
        specialties={{
          ...SPECIALTIES,
          items: null as unknown as SpecialtiesState['items'],
        }}
      />
    )
    expect(screen.queryAllByRole('article', { name: 'AWS', hidden: true })).toHaveLength(
      0
    )
  })
})
