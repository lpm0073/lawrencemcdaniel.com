import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import ReactPage from './Component'

describe('ReactPage', () => {
  it('describes how the site is built', () => {
    renderWithProviders(<ReactPage />)

    expect(screen.getByRole('main', { name: 'ReactJS Page' })).toBeInTheDocument()
    expect(screen.getByText('REACTJS')).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'ReactJS Page Content' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download Resume' })).toHaveAttribute(
      'target',
      '_blank'
    )
    expect(
      screen.getByRole('heading', { name: 'Code Samples & Publications' })
    ).toBeInTheDocument()
  })

  it('adds the canonical link and structured data', async () => {
    renderWithProviders(<ReactPage />, {
      preloadedState: {
        specialties: {
          isLoading: false,
          errMess: null,
          logos: [],
          featured_logos: [],
          items: [
            makePost({ title: { rendered: 'Redux' }, skills: ['react'] }),
            makePost({ id: 2, title: { rendered: 'Terraform' }, skills: ['cloud'] }),
          ],
        },
      },
    })

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/react')
    expect(metaContent('og:description')).toMatch(/^Full Stack Web Developer/)
    expect(graph.filter((node) => node['@type'] === 'DefinedTerm')).toEqual([
      expect.objectContaining({ name: 'Redux' }),
    ])
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/reactjs/',
        }),
      ])
    )
  })
})
