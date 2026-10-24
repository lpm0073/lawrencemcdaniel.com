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

  it('shows a spinner while loading', () => {
    render(<ProjectCarousel images={['https://cdn.example/one.jpg']} isLoading={true} />)

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
  })
})
