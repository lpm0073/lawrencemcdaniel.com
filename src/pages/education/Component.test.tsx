import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { serveSiteData } from '../../../test/handlers'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import Education from './Component'

const COURSE = makePost({
  id: 3467,
  title: { rendered: 'MIT Data Science' },
  acf: {
    institution: 'Massachusetts Institute of Technology',
    course_title: 'Data Science and Machine Learning: Making Data Driven Decisions',
    type: 'certificate',
  },
})

const WP_API = 'https://api.lawrencemcdaniel.com/wp-json/wp/v2'

describe('Education', () => {
  beforeEach(() => {
    server.use(...serveSiteData({ education: [COURSE] }))
  })

  it('shows the courses, with Lawrence McDaniel and his qualifications in the JSON-LD', async () => {
    renderWithProviders(<Education />)

    expect(screen.getByRole('main', { name: 'Education' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'ADVANCED TRAINING' })
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('article', {
        name: 'Education credential MIT Data Science',
      })
    ).toBeInTheDocument()

    await waitForCanonical(APP_CONFIG.urls.site + '/education')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Education')
    await waitFor(() =>
      expect(JSON.stringify(jsonLdGraph())).toContain(
        'Data Science and Machine Learning: Making Data Driven Decisions'
      )
    )
    expect(jsonLdGraph()).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
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
    renderWithProviders(<Education />)

    await waitForCanonical(APP_CONFIG.urls.site + '/education')
    // waitFor(), in case the previous test's head is still there.
    await waitFor(() =>
      expect(jsonLdGraph()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    release()
    expect(await screen.findByRole('article')).toBeInTheDocument()
  })

  it('adds Lawrence McDaniel without his courses if they fail to load', async () => {
    server.use(...serveSiteData({ education: 503 }))
    renderWithProviders(<Education />)

    await waitFor(() =>
      expect(jsonLdGraph()).toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
    expect(JSON.stringify(jsonLdGraph())).not.toContain('Making Data Driven Decisions')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
