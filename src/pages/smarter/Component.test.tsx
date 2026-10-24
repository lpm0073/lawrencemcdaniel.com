import { screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { siteHandlers } from '../../../test/handlers'
import { metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import SmarterPage from './Component'
import { SMARTER_IDEAS, SMARTER_REPOS, SMARTER_URLS } from './content'

describe('SmarterPage', () => {
  beforeEach(() => {
    server.use(...siteHandlers)
  })

  it('tells the story of the project and its author', async () => {
    renderWithProviders(<SmarterPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'THE SMARTER PROJECT' })
    ).toBeInTheDocument()
    expect(screen.getByText(/It started in March 2023/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Smarter' })).toHaveAttribute(
      'href',
      SMARTER_URLS.site
    )
    expect(screen.getByRole('link', { name: 'origin story' })).toHaveAttribute(
      'href',
      SMARTER_URLS.about
    )
    expect(screen.getByRole('link', { name: 'decision records' })).toHaveAttribute(
      'href',
      SMARTER_URLS.adrs
    )
    // the chat's preview, while the chatbot doesn't answer.
    expect(await screen.findByLabelText('Smarter Developer Guide preview')).toBeVisible()
  })

  it('shows the project in numbers', () => {
    renderWithProviders(<SmarterPage />)

    const stats = screen.getByRole('region', { name: 'The project in numbers' })
    expect(stats).toHaveTextContent('~500K')
    expect(stats).toHaveTextContent('In production since January 2026')
  })

  it('links every idea to its write-ups', () => {
    renderWithProviders(<SmarterPage />)

    for (const idea of SMARTER_IDEAS) {
      const card = screen.getByRole('article', { name: idea.title })
      for (const link of idea.links) {
        const anchor = within(card).getByRole('link', { name: link.label })
        expect(anchor).toHaveAttribute('href', link.href)
        expect(anchor).toHaveAttribute('target', '_blank')
      }
    }
  })

  it('illustrates each idea with an image, or with code where there is none', () => {
    renderWithProviders(<SmarterPage />)

    for (const idea of SMARTER_IDEAS.filter((idea) => idea.image)) {
      const card = screen.getByRole('article', { name: idea.title })
      expect(within(card).getByRole('img', { name: idea.image?.alt })).toHaveAttribute(
        'src',
        idea.image?.src
      )
    }
    const ownership = screen.getByRole('article', {
      name: 'A resource ownership model for Django',
    })
    expect(within(ownership).getByLabelText('Code example')).toHaveTextContent(
      'MetaDataWithOwnershipModel'
    )
  })

  it('links every repository', () => {
    renderWithProviders(<SmarterPage />)

    for (const repo of SMARTER_REPOS.flatMap((group) => group.repos)) {
      expect(screen.getByRole('link', { name: repo })).toHaveAttribute(
        'href',
        'https://github.com/smarter-sh/' + repo
      )
    }
  })

  it('adds the canonical link, description and structured data', async () => {
    renderWithProviders(<SmarterPage />)

    const graph = await waitForCanonical(APP_CONFIG.urls.site + '/smarter')
    expect(metaContent('description')).toMatch(/author and principal maintainer/)
    expect(metaContent('keywords')).toMatch(/The Smarter Project/)
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person' }),
        expect.objectContaining({ '@type': 'WebPage' }),
      ])
    )
  })
})
