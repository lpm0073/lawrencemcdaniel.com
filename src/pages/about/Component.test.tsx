import { screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { ConfigureStore } from '../../redux/configureStore'
import { APP_CONFIG } from '../../shared/constants'
import About from './Component'

const WP_API = 'https://api.lawrencemcdaniel.com/wp-json/wp/v2'

const COURSE = makePost({
  id: 3467,
  title: { rendered: 'MIT, Data Science and Machine Learning' },
  acf: {
    institution: 'Massachusetts Institute of Technology',
    course_title: 'Data Science and Machine Learning: Making Data Driven Decisions',
    type: 'certificate',
  },
})

/** The right column's text: it starts with a blank space while the entry animation plays. */
const rightColumnText = () => screen.getAllByRole('complementary')[1].textContent

describe('About', () => {
  beforeEach(() => {
    server.use(...serveSiteData({ education: [COURSE] }))
  })

  it('tells about Lawrence McDaniel', () => {
    renderWithProviders(<About />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'ABOUT ME' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Great things are done by a series of small things brought together',
      })
    ).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'LinkedIn Badge' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'The Smarter Project' })).toHaveAttribute(
      'href',
      'https://smarter.sh/'
    )
    expect(screen.getByRole('link', { name: 'Education' })).toHaveAttribute(
      'href',
      '/education'
    )
    expect(screen.getByRole('link', { name: 'full bio here' })).toHaveAttribute(
      'href',
      '/bio/'
    )
  })

  it.each([false, true])(
    'shows the experience tiles (page already shown: %s)',
    (shownBefore) => {
      const store = ConfigureStore()
      if (shownBefore) renderWithProviders(<About />, { store }).unmount()
      renderWithProviders(<About />, { store })

      const year = new Date().getFullYear()
      expect(screen.getByText('Countries worked in')).toBeInTheDocument()
      expect(screen.getByText('13')).toBeInTheDocument()
      expect(screen.getByText(String(year - 1992))).toBeInTheDocument()
      expect(screen.getByText(String(year - 2010))).toBeInTheDocument()
      expect(screen.getByText(String(year - 1995))).toBeInTheDocument()
      expect(screen.getByText('Years bicycle commuting')).toBeInTheDocument()
    }
  )

  it('adds Lawrence McDaniel and his qualifications to the JSON-LD once the courses load', async () => {
    renderWithProviders(<About />)

    await waitForCanonical(APP_CONFIG.urls.site + '/about')
    await waitFor(() =>
      expect(JSON.stringify(jsonLdGraph())).toContain(
        'Data Science and Machine Learning: Making Data Driven Decisions'
      )
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'AboutPage' }),
      ])
    )
  })

  it('leaves Lawrence McDaniel out of the JSON-LD while the courses load', async () => {
    // hold the courses back until the loading state has been checked.
    let release = () => {}
    const held = new Promise<void>((resolve) => (release = resolve))
    server.use(
      http.get(`${WP_API}/posts`, async () => {
        await held
        return HttpResponse.json([COURSE])
      })
    )
    renderWithProviders(<About />)

    await waitForCanonical(APP_CONFIG.urls.site + '/about')
    // waitFor(), in case the previous test's head is still there.
    await waitFor(() =>
      expect(jsonLdGraph()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
    release()
    await waitFor(() => expect(JSON.stringify(jsonLdGraph())).toContain('"Person"'))
  })

  it('adds Lawrence McDaniel without qualifications from courses if they fail to load', async () => {
    server.use(...serveSiteData({ education: 503 }))
    renderWithProviders(<About />)

    await waitFor(() =>
      expect(jsonLdGraph()).toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
    expect(JSON.stringify(jsonLdGraph())).not.toContain('Making Data Driven Decisions')
  })

  it('plays the entry animation only on the first visit of a session', () => {
    const store = ConfigureStore()

    const { unmount } = renderWithProviders(<About />, { store })
    expect(rightColumnText()).toMatch(/^ /)
    // marking it played doesn't change the page that is showing.
    expect(store.getState().ui.entryAnimationsPlayed.aboutPage).toBe(true)
    expect(rightColumnText()).toMatch(/^ /)
    unmount()

    renderWithProviders(<About />, { store })
    expect(rightColumnText()).toMatch(/^13 ?Countries worked in/)
  })

  it('plays the entry animation again in a new session', () => {
    renderWithProviders(<About />, { store: ConfigureStore() }).unmount()
    renderWithProviders(<About />, { store: ConfigureStore() })

    expect(rightColumnText()).toMatch(/^ /)
  })
})
