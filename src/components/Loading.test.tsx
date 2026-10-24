import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Loading from './Loading'

describe('Loading', () => {
  it('shows a spinner', () => {
    render(<Loading />)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
  })
})
