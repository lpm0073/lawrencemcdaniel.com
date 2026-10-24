import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { renderWithProviders } from '../../../test/render'
import type { EducationState } from '../../redux/education'
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

function education(courses = COURSES): EducationState {
  return { isLoading: false, errMess: null, courses }
}

describe('CoursesGrid', () => {
  it('shows each course, linked to its certificate', () => {
    renderWithProviders(<CoursesGrid education={education()} />, {
      preloadedState: { education: education() },
    })

    const mit = screen.getByRole('article', { name: 'Education credential MIT' })
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

  it("links to the institution when there's no certificate", () => {
    renderWithProviders(<CoursesGrid education={education()} />, {
      preloadedState: { education: education() },
    })

    const wharton = screen.getByRole('article', { name: 'Education credential Wharton' })
    expect(within(wharton).getByRole('link')).toHaveAttribute(
      'href',
      'https://www.wharton.upenn.edu/'
    )
    expect(within(wharton).getByTitle('Unknown Course Summary')).toBeInTheDocument()
  })

  it('shows defaults and no link for a course without details', () => {
    renderWithProviders(<CoursesGrid education={education()} />, {
      preloadedState: { education: education() },
    })

    const unknown = screen.getByRole('article', { name: 'Education credential Unknown' })
    expect(within(unknown).queryByRole('link')).not.toBeInTheDocument()
    expect(
      within(unknown).getByRole('heading', { name: 'Unknown Institution' })
    ).toBeInTheDocument()
    expect(
      within(unknown).getByRole('heading', { name: 'Unknown Course Title' })
    ).toBeInTheDocument()
  })

  it('uses the Redux store, not the education prop', () => {
    renderWithProviders(<CoursesGrid education={education([])} />, {
      preloadedState: { education: education() },
    })

    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('shows a spinner while loading', () => {
    renderWithProviders(<CoursesGrid education={education()} isLoading={true} />, {
      preloadedState: { education: education() },
    })

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('remembers that the grid was shown when it unmounts', () => {
    const { store, unmount } = renderWithProviders(
      <CoursesGrid education={education()} />,
      { preloadedState: { education: education() } }
    )

    expect(store.getState().coursesGrid.isSet).toBe(false)
    unmount()
    expect(store.getState().coursesGrid.isSet).toBe(true)
  })
})
