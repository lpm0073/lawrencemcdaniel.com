import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SpecialtiesBanner from './datascienceBanner'

describe('SpecialtiesBanner', () => {
  it('shows the three data science specialties', () => {
    render(<SpecialtiesBanner />)

    for (const title of ['INFRASTRUCTURE', 'DATA', 'ALGORITHMS']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    expect(screen.getByText(/High data throughput/)).toBeInTheDocument()
  })

  it('shows a spinner while loading', () => {
    render(<SpecialtiesBanner isLoading />)

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
