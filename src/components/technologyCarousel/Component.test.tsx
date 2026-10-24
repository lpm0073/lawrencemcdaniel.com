import { screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import TechnologyCarousel from './Component'

const CLOUD = 1
const FULL_STACK = 2

const SPECIALTIES = [
  makePost({
    id: 1,
    title: { rendered: '<b>AWS</b>' },
    excerpt: { rendered: '<p>Amazon Web Services</p>' },
    tags: [CLOUD],
    acf: { url: 'https://aws.amazon.com' },
  }),
  makePost({
    id: 4,
    title: { rendered: 'Azure' },
    excerpt: { rendered: 'Microsoft Azure' },
    tags: [CLOUD],
  }),
  makePost({
    id: 2,
    title: { rendered: 'Django' },
    excerpt: { rendered: '' },
    tags: [FULL_STACK],
  }),
  makePost({ id: 3, title: { rendered: 'No skills' }, tags: [] }),
]

const TAGS = [
  { id: CLOUD, name: 'cloud' },
  { id: FULL_STACK, name: 'full-stack' },
]

/** Slides scrolled out of view are aria-hidden, so the queries include hidden elements. */
const slides = (name: string) => screen.queryAllByRole('article', { name, hidden: true })

/** The locally-stored logos that the carousel shows until the specialties load. */
const localLogos = () =>
  screen
    .queryAllByRole('img', { hidden: true })
    .filter((img) => img.getAttribute('src')?.startsWith('assets/images/'))

describe('TechnologyCarousel', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it("shows a skill's specialties", async () => {
    server.use(...serveSiteData({ specialties: SPECIALTIES, tags: TAGS }))
    renderWithProviders(<TechnologyCarousel skill="cloud" />)

    await waitFor(() => expect(slides('AWS').length).toBeGreaterThan(0))
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    expect(slides('Azure').length).toBeGreaterThan(0)
    expect(
      screen.getAllByRole('link', { name: /Amazon Web Services/, hidden: true })[0]
    ).toHaveAttribute('href', 'https://aws.amazon.com')
    expect(
      screen.getAllByRole('img', { name: 'Amazon Web Services', hidden: true })[0]
    ).toHaveAttribute(
      'src',
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'
    )
    expect(slides('Django')).toHaveLength(0)
    expect(slides('No skills')).toHaveLength(0)
    expect(localLogos()).toHaveLength(0)
  })

  it('shows every specialty without a skill, with a default description', async () => {
    server.use(...serveSiteData({ specialties: SPECIALTIES, tags: TAGS }))
    renderWithProviders(<TechnologyCarousel />)

    await waitFor(() => expect(slides('AWS').length).toBeGreaterThan(0))
    expect(slides('No skills').length).toBeGreaterThan(0)
    expect(
      screen.getAllByRole('img', {
        name: 'Django, a technology specialty of mine',
        hidden: true,
      }).length
    ).toBeGreaterThan(0)
  })

  it('shows the local logos until the specialties load', async () => {
    server.use(...serveSiteData({ specialties: SPECIALTIES, tags: TAGS }))
    renderWithProviders(<TechnologyCarousel skill="cloud" />)

    expect(localLogos().length).toBeGreaterThan(0)
    expect(slides('AWS')).toHaveLength(0)

    await waitFor(() => expect(slides('AWS').length).toBeGreaterThan(0))
    expect(localLogos()).toHaveLength(0)
  })

  it('shows the specialties at once when they have already loaded', async () => {
    server.use(...serveSiteData({ specialties: SPECIALTIES, tags: TAGS }))
    const view = renderWithProviders(<TechnologyCarousel skill="cloud" />)
    await waitFor(() => expect(slides('AWS').length).toBeGreaterThan(0))
    view.unmount()

    renderWithProviders(<TechnologyCarousel skill="cloud" />, { store: view.store })
    expect(slides('AWS').length).toBeGreaterThan(0)
    expect(localLogos()).toHaveLength(0)
  })

  it('keeps the local logos when no specialty has the skill', async () => {
    server.use(...serveSiteData({ specialties: SPECIALTIES, tags: TAGS }))
    const { store } = renderWithProviders(<TechnologyCarousel skill="python" />)

    await waitFor(() =>
      expect(store.getState().api.queries['getSpecialties(undefined)']?.status).toBe(
        'fulfilled'
      )
    )
    expect(localLogos().length).toBeGreaterThan(0)
    expect(slides('AWS')).toHaveLength(0)
  })

  it('keeps the local logos when the specialties fail to load', async () => {
    server.use(...serveSiteData({ specialties: 503 }))
    const { store } = renderWithProviders(<TechnologyCarousel />)

    await waitFor(() =>
      expect(store.getState().api.queries['getSpecialties(undefined)']?.status).toBe(
        'rejected'
      )
    )
    expect(localLogos().length).toBeGreaterThan(0)
  })
})
