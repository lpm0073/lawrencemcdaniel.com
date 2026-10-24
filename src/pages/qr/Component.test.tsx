import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { APP_CONFIG } from '../../shared/constants'
import QR from './Component'

describe('QR', () => {
  it("shows the site's QR code", () => {
    render(<QR />)

    expect(screen.getByRole('heading', { level: 1, name: 'QR CODE' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 4, name: 'lawrencemcdaniel.com' })
    ).toBeInTheDocument()
  })

  it('has a canonical link and JSON-LD', async () => {
    render(<QR />)

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/qr')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Whatsapp QR Code')
    expect(graph).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person' })])
    )
  })
})
