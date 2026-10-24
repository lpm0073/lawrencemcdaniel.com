import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { helmetHead, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import Openedx from './Component'

const OPENEDX_URL = 'https://lawrencemcdaniel.com/openedx'

describe('Openedx', () => {
  it('describes the Open edX services, clients and FAQ', async () => {
    const { user } = renderWithProviders(<Openedx />, {
      preloadedState: {
        clients: {
          isLoading: false,
          errMess: null,
          logos: [makePost({ id: 11, title: { rendered: 'edX' }, tags: [55] })],
        },
      },
    })

    expect(screen.getByRole('main', { name: 'Open edX Consulting' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Production Installation & Configuration of Open edX®',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Open edX® Client List' })
    ).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'edX' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Contact Me' })).toHaveAttribute(
      'href',
      '/contact'
    )

    const cost = screen.getByRole('button', { name: 'How much does Open edX cost?' })
    const firms = screen.getByRole('button', {
      name: 'Are there any consulting firms who specialize in Open edX?',
    })
    expect(cost).toHaveAttribute('aria-expanded', 'true')
    expect(firms).toHaveAttribute('aria-expanded', 'false')

    await user.click(firms)
    expect(firms).toHaveAttribute('aria-expanded', 'true')
    expect(cost).toHaveAttribute('aria-expanded', 'false')
  })

  it('adds the canonical link, meta tags and structured data', async () => {
    renderWithProviders(<Openedx />, {
      preloadedState: {
        recommendations: {
          isLoading: false,
          errMess: null,
          items: [makePost({ title: { rendered: 'John Roe' } })],
        },
      },
    })

    const graph = await waitForCanonical(OPENEDX_URL)
    expect(helmetHead().linkTags).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ href: expect.stringMatching(/undefined/) }),
      ])
    )
    expect(metaContent('og:url')).toBe(OPENEDX_URL)
    expect(metaContent('og:site_name')).toBe('Lawrence McDaniel')
    expect(metaContent('keywords')).toMatch(/^Lawrence McDaniel, open edx/)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', hasOccupation: expect.anything() }),
        expect.objectContaining({ '@type': 'Article' }),
        expect.objectContaining({ '@type': 'Service' }),
        expect.objectContaining({ '@type': 'FAQPage' }),
        expect.objectContaining({ '@type': 'HowTo' }),
        expect.objectContaining({ '@type': 'VideoObject' }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://lawrencemcdaniel.com/openedx/',
        }),
      ])
    )
    expect(JSON.stringify(graph)).toContain('Review by John Roe')
  })
})
