import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import Bio from './Component'

const COURSE = makePost({
  id: 3467,
  acf: {
    institution: 'Massachusetts Institute of Technology',
    course_title: 'Data Science and Machine Learning: Making Data Driven Decisions',
    type: 'certificate',
  },
})

const WP_API = 'https://api.lawrencemcdaniel.com/wp-json/wp/v2'

describe('Bio', () => {
  beforeEach(() => {
    server.use(...serveSiteData({ education: [COURSE] }))
  })

  it("tells Lawrence McDaniel's story", () => {
    renderWithProviders(<Bio />)

    expect(screen.getByRole('main', { name: 'Bio Page' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'FULL BIO' })
    ).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Bio Content' })).toHaveTextContent(
      'lived in Mexico City since 2000'
    )
    expect(screen.getByRole('button', { name: /Download Resume/ })).toHaveAttribute(
      'href',
      APP_CONFIG.urls.resume
    )
    expect(screen.getByRole('button', { name: /Contact Me/ })).toHaveAttribute(
      'href',
      '/contact'
    )
    expect(screen.getByRole('link', { name: 'data scientist' })).toHaveAttribute(
      'href',
      '/data-science'
    )
  })

  it('adds Lawrence McDaniel and his qualifications to the JSON-LD once the courses load', async () => {
    renderWithProviders(<Bio />)

    await waitForCanonical(APP_CONFIG.urls.site + '/bio')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Bio')
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
    renderWithProviders(<Bio />)

    await waitForCanonical(APP_CONFIG.urls.site + '/bio')
    // waitFor(), in case the previous test's head is still there.
    await waitFor(() =>
      expect(jsonLdGraph()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
    release()
    await waitFor(() => expect(JSON.stringify(jsonLdGraph())).toContain('"Person"'))
  })

  it('adds Lawrence McDaniel without his courses if they fail to load', async () => {
    server.use(...serveSiteData({ education: 503 }))
    renderWithProviders(<Bio />)

    await waitFor(() =>
      expect(jsonLdGraph()).toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
    expect(JSON.stringify(jsonLdGraph())).not.toContain('Making Data Driven Decisions')
  })
})
