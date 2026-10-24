import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { metaContent, waitForCanonical } from '../../../test/pageHead'
import MRLPage from './Component'

// react-mdr animates a <canvas> with a 2D context, which jsdom lacks: a stand-in.
vi.mock('react-mdr', () => ({
  MatrixRainingLetters: ({ custom_class }: { custom_class?: string }) => (
    <canvas aria-label="Matrix digital rain" className={custom_class} />
  ),
}))

describe('MRLPage', () => {
  it('shows the digital rain and a dialog about the npm package', async () => {
    render(<MRLPage />)

    expect(screen.getByLabelText('Matrix digital rain')).toBeInTheDocument()
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveTextContent('Matrix Digital Rain for React')
    expect(dialog).toHaveTextContent('npm i react-mdr')
    expect(
      screen.getByRole('link', { name: 'https://www.npmjs.com/package/react-mdr' })
    ).toHaveAttribute('target', '_blank')
  })

  it('styles the body while it is shown', () => {
    const { unmount } = render(<MRLPage />)
    expect(document.body).toHaveClass('matrixPage')

    unmount()
    expect(document.body).not.toHaveClass('matrixPage')
  })

  it('adds the canonical link and structured data', async () => {
    render(<MRLPage />)

    const graph = await waitForCanonical('https://lawrencemcdaniel.com/react-mdr')
    expect(metaContent('description')).toBe(
      'Lawrence McDaniel - Matrix digital rain for React'
    )
    expect(metaContent('keywords')).toMatch(/Matrix Digital Rain/)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/matrix-digital-rain-for-react/',
        }),
      ])
    )
  })
})
