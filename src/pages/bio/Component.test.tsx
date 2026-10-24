import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import type { EducationState } from '../../redux/education'
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

function education(isLoading: boolean): EducationState {
  return { isLoading, errMess: null, courses: isLoading ? [] : [COURSE] }
}

describe('Bio', () => {
  it("tells Lawrence McDaniel's story", () => {
    render(<Bio education={education(false)} />)

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
    render(<Bio education={education(false)} />)

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/bio')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Bio')
    expect(graph).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
    )
    expect(JSON.stringify(graph)).toContain(
      'Data Science and Machine Learning: Making Data Driven Decisions'
    )
  })

  it('leaves Lawrence McDaniel out of the JSON-LD while the courses load', async () => {
    render(<Bio education={education(true)} />)

    await waitForCanonical(APP_CONFIG.urls.site + '/bio')
    // waitFor(), in case the previous test's head is still there.
    await waitFor(() =>
      expect(jsonLdGraph()).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
      )
    )
  })
})
