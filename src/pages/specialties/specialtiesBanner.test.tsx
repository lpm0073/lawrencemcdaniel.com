import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SpecialtiesBanner from './specialtiesBanner'

describe('SpecialtiesBanner', () => {
  it('shows the three specialties', () => {
    render(<SpecialtiesBanner />)

    expect(
      screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent)
    ).toEqual(['FULL STACK DEVELOPMENT', 'BUSINESS ANALYSIS', 'OPEN EDX® PLATFORM'])
    expect(screen.getByText(/predictive analytics, forensics/)).toBeInTheDocument()
  })
})
