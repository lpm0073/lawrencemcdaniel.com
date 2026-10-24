import { screen, waitFor, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import CoursesGrid from './coursesGrid'

const COURSES = [
  makePost({
    id: 1,
    title: { rendered: 'MIT' },
    acf: {
      institution: 'Massachusetts Institute of Technology',
      course_title: 'Data Science and Machine Learning',
      course_summary: 'A 12-week online program.',
      certificate_url: 'https://certificates.example/mit',
      institution_url: 'https://web.mit.edu/',
    },
  }),
  makePost({
    id: 2,
    title: { rendered: 'Wharton' },
    acf: {
      institution: 'The Wharton School',
      course_title: 'Business Analytics',
      institution_url: 'https://www.wharton.upenn.edu/',
    },
  }),
  makePost({ id: 3, title: { rendered: 'Unknown' }, acf: undefined }),
]

describe('CoursesGrid', () => {
  beforeEach(() => {
    server.use(...serveSiteData({ education: COURSES }))
  })

  it('shows each course, linked to its certificate', async () => {
    renderWithProviders(<CoursesGrid />)

    const mit = await screen.findByRole('article', { name: 'Education credential MIT' })
    expect(within(mit).getByRole('link')).toHaveAttribute(
      'href',
      'https://certificates.example/mit'
    )
    expect(
      within(mit).getByRole('heading', { name: 'Massachusetts Institute of Technology' })
    ).toBeInTheDocument()
    expect(
      within(mit).getByRole('heading', { name: 'Data Science and Machine Learning' })
    ).toBeInTheDocument()
    expect(within(mit).getByTitle('A 12-week online program.')).toBeInTheDocument()
  })

  it("links to the institution when there's no certificate", async () => {
    renderWithProviders(<CoursesGrid />)

    const wharton = await screen.findByRole('article', {
      name: 'Education credential Wharton',
    })
    expect(within(wharton).getByRole('link')).toHaveAttribute(
      'href',
      'https://www.wharton.upenn.edu/'
    )
    expect(within(wharton).getByTitle('Unknown Course Summary')).toBeInTheDocument()
  })

  it('shows defaults and no link for a course without details', async () => {
    renderWithProviders(<CoursesGrid />)

    const unknown = await screen.findByRole('article', {
      name: 'Education credential Unknown',
    })
    expect(within(unknown).queryByRole('link')).not.toBeInTheDocument()
    expect(
      within(unknown).getByRole('heading', { name: 'Unknown Institution' })
    ).toBeInTheDocument()
    expect(
      within(unknown).getByRole('heading', { name: 'Unknown Course Title' })
    ).toBeInTheDocument()
  })

  it('shows no courses until they load', async () => {
    renderWithProviders(<CoursesGrid />)

    expect(screen.getByRole('region', { name: 'Courses Grid' })).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(await screen.findAllByRole('article')).toHaveLength(3)
  })

  it('shows no courses if they fail to load', async () => {
    server.use(...serveSiteData({ education: 503 }))
    const { store } = renderWithProviders(<CoursesGrid />)

    await waitFor(() =>
      expect(store.getState().api.queries['getEducation(undefined)']?.status).toBe(
        'rejected'
      )
    )
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
