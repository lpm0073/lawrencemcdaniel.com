import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { EducationState } from '../../redux/education'
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

function education(isLoading: boolean): EducationState {
  return { isLoading, errMess: null, courses: isLoading ? [] : [COURSE] }
}

describe('Education', () => {
  it('shows the courses, with Lawrence McDaniel and his qualifications in the JSON-LD', async () => {
    const loaded = education(false)
    renderWithProviders(<Education education={loaded} />, {
      preloadedState: { education: loaded },
    })

    expect(screen.getByRole('main', { name: 'Education' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'ADVANCED TRAINING' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('article', { name: 'Education credential MIT Data Science' })
    ).toBeInTheDocument()

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/education')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Education')
    expect(graph).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
    )
    expect(JSON.stringify(graph)).toContain(
      'Data Science and Machine Learning: Making Data Driven Decisions'
    )
  })

  it('leaves Lawrence McDaniel out of the JSON-LD while the courses load', async () => {
    const loading = education(true)
    renderWithProviders(<Education education={loading} />, {
      preloadedState: { education: loading },
    })

    await waitForCanonical(APP_CONFIG.urls.site + '/education')
    // waitFor(), in case the previous test's head is still there.
    await waitFor(() =>
      expect(jsonLdGraph()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
  })
})
