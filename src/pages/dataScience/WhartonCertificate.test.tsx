import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import WhartonCertificate from './WhartonCertificate'

const ALT = 'Wharton Analytics Completion Certificate for Lawrence McDaniel'

describe('WhartonCertificate', () => {
  it('links the certificate image to its verification page', () => {
    render(
      <WhartonCertificate
        idx="1"
        href="https://www.coursera.org/account/accomplishments/certificate/KZN42KMZ4HHJ"
        src="https://cdn.lawrencemcdaniel.com/wharton.png"
      />
    )

    expect(screen.getByRole('link', { name: ALT })).toHaveAttribute(
      'href',
      'https://www.coursera.org/account/accomplishments/certificate/KZN42KMZ4HHJ'
    )
    expect(screen.getByRole('img', { name: ALT })).toHaveAttribute(
      'src',
      'https://cdn.lawrencemcdaniel.com/wharton.png'
    )
  })

  it('adds extra classes to the column', () => {
    render(<WhartonCertificate idx="2" cls="mt-3" href="/a" src="/b.png" />)

    // eslint-disable-next-line testing-library/no-node-access -- the column has no accessible role of its own
    const column = screen.getByRole('link', { name: ALT }).parentElement
    expect(column).toHaveClass('mt-3', 'col-lg-3')
    expect(column?.className).not.toMatch(/undefined/)
  })
})
