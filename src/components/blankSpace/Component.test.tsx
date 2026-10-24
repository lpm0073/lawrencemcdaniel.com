import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import BlankSpace, { CarriageReturnLineFeed } from './Component'

describe('BlankSpace', () => {
  it('renders a single space', () => {
    const { container } = render(
      <p>
        a<BlankSpace />b
      </p>
    )
    expect(container).toHaveTextContent('a b', { normalizeWhitespace: false })
  })

  it('CarriageReturnLineFeed renders a line break', () => {
    const { container } = render(<CarriageReturnLineFeed />)
    expect(container.innerHTML).toBe('<br>')
  })
})
