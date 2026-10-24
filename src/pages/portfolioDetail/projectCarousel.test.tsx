import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ProjectCarousel from './projectCarousel'

describe('ProjectCarousel', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it('shows the images', () => {
    render(<ProjectCarousel images={['https://cdn.example/one.jpg']} />)

    expect(screen.getByRole('img', { name: 'alt text', hidden: true })).toHaveAttribute(
      'src',
      'https://cdn.example/one.jpg'
    )
  })

  it('shows no images without urls', () => {
    render(<ProjectCarousel images={[]} />)

    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
  })
})
