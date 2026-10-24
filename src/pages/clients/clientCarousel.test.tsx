import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import type { ClientsState } from '../../redux/clients'
import ClientCarousel from './clientCarousel'

const CLIENTS: ClientsState = {
  isLoading: false,
  errMess: null,
  logos: [makePost({ id: 1 }), makePost({ id: 2, _embedded: {} })],
}

describe('ClientCarousel', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  })

  it("shows each client's logo", () => {
    render(<ClientCarousel clients={CLIENTS} />)

    // the logos are CSS backgrounds of empty articles, which have no accessible name.
    const logos = screen.getAllByRole('article', { hidden: true })
    expect(logos.length).toBeGreaterThanOrEqual(2)
    const backgrounds = logos.map((logo) =>
      logo.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, '')
    )
    expect(backgrounds).toContain(
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'
    )
    // a client without a logo
    expect(backgrounds).toContain('null')
  })

  it('shows a spinner while loading', () => {
    render(<ClientCarousel clients={CLIENTS} isLoading={true} />)

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('article', { hidden: true })).not.toBeInTheDocument()
  })
})
