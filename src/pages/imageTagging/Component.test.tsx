import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import ImageTaggerPage from './Component'

describe('ImageTaggerPage', () => {
  it('shows the drag and drop zone and the meta tag columns', () => {
    renderWithProviders(<ImageTaggerPage />)

    expect(screen.getByText('IMAGE')).toBeInTheDocument()
    expect(screen.getByText('Drag & Drop file here')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Browse files' })).toBeInTheDocument()
    expect(screen.getByText('Image Meta Objects')).toBeInTheDocument()
    expect(screen.getByText('Attributes')).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'LinkedIn Badge' })).toBeInTheDocument()
  })

  it('adds the canonical link and structured data', async () => {
    renderWithProviders(<ImageTaggerPage />)

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/image-tagging')
    expect(metaContent('description')).toMatch(/^Data Scientist and Full Stack/)
    expect(metaContent('og:description')).toMatch(/^Full Stack Web Developer/)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/image-tagging/',
          image:
            'https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/19131001/aws-react-hosting.png',
        }),
      ])
    )
  })
})
