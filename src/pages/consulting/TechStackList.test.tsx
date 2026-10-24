import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TechStackList from './TechStackList'

describe('TechStackList', () => {
  it('lists the tech stack', () => {
    render(<TechStackList />)

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(7)
    expect(items[0]).toHaveTextContent('Python, Django')
    expect(items[6]).toHaveTextContent(
      'Azure AI machine learning studio and Cognitive Services'
    )
  })
})
