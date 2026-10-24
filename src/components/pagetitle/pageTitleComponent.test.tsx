import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import RenderPageTitle from './pageTitleComponent'

describe('RenderPageTitle', () => {
  it('renders the heading and sets the document title', async () => {
    render(
      <RenderPageTitle theme="dark" icon="fa-users" title="MY" boxed_title="CLIENTS" />
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'MY CLIENTS' })
    ).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Lawrence McDaniel - My Clients'))
  })
})
