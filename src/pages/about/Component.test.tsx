import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { jsonLdGraph, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { RootState } from '../../redux/configureStore'
import { APP_CONFIG } from '../../shared/constants'
import About from './Component'

const COURSE = makePost({
  id: 3467,
  title: { rendered: 'MIT, Data Science and Machine Learning' },
  acf: {
    institution: 'Massachusetts Institute of Technology',
    course_title: 'Data Science and Machine Learning: Making Data Driven Decisions',
    type: 'certificate',
  },
})

function state(isLoading: boolean, isSet = false): Partial<RootState> {
  return {
    education: { isLoading, errMess: null, courses: isLoading ? [] : [COURSE] },
    aboutPage: { isSet },
  }
}

describe('About', () => {
  it('tells about Lawrence McDaniel', () => {
    renderWithProviders(<About />, { preloadedState: state(false) })

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
    (isSet) => {
      renderWithProviders(<About />, { preloadedState: state(false, isSet) })

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
    renderWithProviders(<About />, { preloadedState: state(false) })

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/about')
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'AboutPage' }),
      ])
    )
    expect(JSON.stringify(graph)).toContain(
      'Data Science and Machine Learning: Making Data Driven Decisions'
    )
  })

  it('leaves Lawrence McDaniel out of the JSON-LD while the courses load', async () => {
    renderWithProviders(<About />, { preloadedState: state(true) })

    await waitForCanonical(APP_CONFIG.urls.site + '/about')
    // waitFor(), in case the previous test's head is still there.
    await waitFor(() =>
      expect(jsonLdGraph()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
  })

  it('remembers that the about page was shown when it unmounts', () => {
    const { store, unmount } = renderWithProviders(<About />, {
      preloadedState: state(false),
    })

    expect(store.getState().aboutPage.isSet).toBe(false)
    unmount()
    expect(store.getState().aboutPage.isSet).toBe(true)
  })
})
