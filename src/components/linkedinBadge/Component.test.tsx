import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LinkedinBadge } from './Component'

describe('LinkedinBadge', () => {
  it('links to the LinkedIn profile', () => {
    render(<LinkedinBadge />)

    expect(screen.getByRole('article', { name: 'LinkedIn Badge' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lawrence McDaniel' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/lawrencemcdaniel?trk=profile-badge-name'
    )
    expect(screen.getByRole('button', { name: 'View profile' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'LinkedIn' })).toBeInTheDocument()
  })
})
