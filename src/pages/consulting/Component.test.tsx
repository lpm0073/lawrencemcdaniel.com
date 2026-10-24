import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { helmetHead, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import Consulting from './Component'

describe('Consulting', () => {
  it('lists the consulting services', () => {
    renderWithProviders(<Consulting />)

    expect(screen.getByRole('main', { name: 'Consulting Services' })).toBeInTheDocument()
    for (const service of [
      'Data Science',
      'Training',
      'Full Stack development',
      'Cloud Computing',
      'Dev Ops',
    ]) {
      expect(screen.getByText(service)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute(
      'href',
      '/contact'
    )
    expect(screen.getByRole('button', { name: 'Contact Me' })).toHaveAttribute(
      'href',
      '/contact'
    )
    expect(screen.getByRole('link', { name: 'advisory services' })).toHaveAttribute(
      'href',
      '/openedx'
    )
    const learnMore = screen.getAllByRole('link', { name: 'Learn more' })
    expect(learnMore.map((link) => link.getAttribute('href'))).toEqual([
      '/data-science',
      '/full-stack',
      '/full-stack',
      '/full-stack',
    ])
  })

  it('adds the canonical link and a Service with its reviews', async () => {
    renderWithProviders(<Consulting />, {
      preloadedState: {
        recommendations: {
          isLoading: false,
          errMess: null,
          items: [
            makePost({
              title: { rendered: 'Jane Doe' },
              excerpt: { rendered: '<p>Great work.</p>' },
            }),
          ],
        },
      },
    })

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/consulting')
    // RenderPageTitle's Helmet is nested deeper, so its title wins over the page's.
    expect(helmetHead().title).toBe('Lawrence McDaniel - Consulting Services')
    expect(metaContent('description')).toMatch(/^Consulting services and technical/)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
        expect.objectContaining({ '@type': 'Service' }),
        expect.objectContaining({
          '@type': 'WebPage',
          relatedLink: 'https://lawrencemcdaniel.com/consulting',
        }),
      ])
    )
    expect(JSON.stringify(graph)).toContain('Review by Jane Doe')
  })
})
