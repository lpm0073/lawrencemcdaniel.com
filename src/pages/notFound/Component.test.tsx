import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { helmetHead, metaContent } from '../../../test/pageHead'
import { APP_CONFIG } from '../../shared/constants'
import PageNotFound from './Component'

// react-mdr animates a <canvas> with a 2D context, which jsdom lacks: a stand-in.
vi.mock('react-mdr', () => ({
  MatrixRainingLetters: ({ custom_class }: { custom_class?: string }) => (
    <canvas aria-label="Matrix digital rain" className={custom_class} />
  ),
}))

describe('PageNotFound', () => {
  it('shows the digital rain and a 404 dialog', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<PageNotFound />)

    expect(screen.getByRole('main', { name: '404 Page Not Found' })).toBeInTheDocument()
    expect(screen.getByLabelText('Matrix digital rain')).toHaveClass('ml-0 pl-0')
    expect(await screen.findByRole('dialog')).toHaveTextContent('404 Page Not Found')
  })

  it('styles the body while it is shown', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const { unmount } = render(<PageNotFound />)
    expect(document.body).toHaveClass('matrixPage')

    unmount()
    expect(document.body).not.toHaveClass('matrixPage')
  })

  it('has a canonical link and a description', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<PageNotFound />)

    await waitFor(() =>
      expect(helmetHead().linkTags).toEqual([
        expect.objectContaining({
          rel: 'canonical',
          href: APP_CONFIG.urls.site + '/matrix',
        }),
      ])
    )
    expect(metaContent('description')).toBe('Lawrence McDaniel - Page Not Found')
  })
})
