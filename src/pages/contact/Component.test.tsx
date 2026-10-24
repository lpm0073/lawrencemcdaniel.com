import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { APP_CONFIG } from '../../shared/constants'
import Contact from './Component'

describe('Contact', () => {
  it('shows the contact information', () => {
    render(<Contact />)

    expect(screen.getByRole('main', { name: 'Contact Page' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'LETS TALK' })
    ).toBeInTheDocument()
    const contactData = screen.getByRole('region', { name: 'Contact Information' })
    expect(contactData).toHaveTextContent('Lawrence McDaniel, Data Scientist')
    expect(screen.getByRole('link', { name: 'lpm0073@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:lpm0073@gmail.com'
    )
    expect(screen.getByRole('link', { name: '+1 (617) 834-6172' })).toHaveAttribute(
      'href',
      'tel:+16178346172'
    )
    expect(screen.getByRole('button', { name: /Download Resume/ })).toHaveAttribute(
      'href',
      APP_CONFIG.urls.resume
    )
  })

  it('switches between the QR codes', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    expect(screen.getByRole('tab', { name: 'Whatsapp' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByRole('heading', { name: 'Whatsapp QR Code' })).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'LinkedIn' }))
    expect(screen.getByRole('heading', { name: 'LinkedIn QR Code' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Whatsapp QR Code' })
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Venmo' }))
    expect(screen.getByRole('heading', { name: 'Venmo QR Code' })).toBeInTheDocument()
  })

  it('has a canonical link and JSON-LD for the contact page', async () => {
    render(<Contact />)

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/contact')
    expect(metaContent('description')).toBe('Lawrence McDaniel - Contact Information')
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'ContactPage' }),
      ])
    )
  })
})
