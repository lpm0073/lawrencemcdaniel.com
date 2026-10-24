import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost, makeRepository } from '../../../test/fixtures'
import { waitForCanonical, metaContent } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import type { SpecialtiesState } from '../../redux/specialties'
import CloudComputing from './Component'

const SPECIALTIES: SpecialtiesState = {
  isLoading: false,
  errMess: null,
  logos: [],
  featured_logos: [],
  items: [makePost({ id: 7, title: { rendered: 'Terraform' }, skills: ['cloud'] })],
}

describe('CloudComputing', () => {
  it('describes the cloud computing services', () => {
    renderWithProviders(<CloudComputing specialties={SPECIALTIES} />)

    expect(screen.getByRole('main', { name: 'Cloud Computing' })).toBeInTheDocument()
    expect(screen.getByText('CLOUD')).toBeInTheDocument()
    expect(screen.getByText(/expert Terraform developer/)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Code Samples & Publications' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'here' })).toHaveAttribute(
      'href',
      '/consulting'
    )
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
  })

  it("adds the canonical link and the full stack repositories' structured data", async () => {
    renderWithProviders(<CloudComputing specialties={SPECIALTIES} />, {
      preloadedState: {
        repositories: {
          isLoading: false,
          errMess: null,
          repos: [
            makeRepository({ skills: ['full-stack'] }),
            makeRepository({
              name: 'FullStackWithLawrence/other',
              html_url: 'https://github.com/FullStackWithLawrence/other',
              skills: ['data-science'],
            }),
          ],
        },
      },
    })

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/cloud')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Cloud Expert')
    const repos = graph.filter((node) => node['@type'] === 'SoftwareSourceCode')
    expect(repos).toEqual([
      expect.objectContaining({
        codeRepository: 'https://github.com/FullStackWithLawrence/react-mdr',
      }),
    ])
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/cloud/',
          description: 'Cloud Computing',
        }),
      ])
    )
  })
})
