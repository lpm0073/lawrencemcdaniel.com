import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { SpecialtiesState } from '../../redux/specialties'
import Datascience from './Component'

const SPECIALTIES: SpecialtiesState = {
  isLoading: false,
  errMess: null,
  logos: [],
  featured_logos: [],
  items: [
    makePost({
      id: 9,
      slug: 'pandas',
      title: { rendered: 'Pandas' },
      skills: ['data-science'],
    }),
  ],
}

describe('Datascience', () => {
  it('shows the data science credentials and specialties', () => {
    renderWithProviders(<Datascience specialties={SPECIALTIES} />)

    expect(screen.getByRole('main', { name: 'Data Science Page' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Data Scientist' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Smarter' })).toHaveAttribute(
      'href',
      'https://smarter.sh'
    )
    expect(
      screen.getAllByRole('img', {
        name: 'Wharton Analytics Completion Certificate for Lawrence McDaniel',
      })
    ).toHaveLength(4)
    // the specialties banner
    expect(screen.getByRole('heading', { name: 'ALGORITHMS' })).toBeInTheDocument()
    // the specialties table
    for (const specialty of [
      'Regression',
      'Neural Networks',
      'Support Vector Machines',
      'Anomaly Detection',
      'Recommender Systems',
      'Unsupervised Learning',
    ]) {
      expect(screen.getByRole('rowheader', { name: specialty })).toBeInTheDocument()
    }
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
  })

  it('adds the canonical link, meta tags and structured data', async () => {
    renderWithProviders(<Datascience specialties={SPECIALTIES} />, {
      preloadedState: {
        repositories: {
          isLoading: false,
          errMess: null,
          repos: [
            makeRepository({ skills: ['data-science'] }),
            makeRepository({ skills: ['react'] }),
          ],
        },
        specialties: SPECIALTIES,
      },
    })

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/data-science')
    expect(metaContent('keywords')).toMatch(/^Lawrence McDaniel, machine learning/)
    expect(metaContent('og:description')).toMatch(/^Data Scientist - Machine learning/)
    expect(graph.filter((node) => node['@type'] === 'SoftwareSourceCode')).toHaveLength(1)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({ '@type': 'DefinedTerm', name: 'Pandas' }),
        expect.objectContaining({
          '@type': 'WebPage',
          image:
            'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220349/data-science-certificate.jpg',
        }),
      ])
    )
  })
})
