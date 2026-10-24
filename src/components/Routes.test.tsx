import { act, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { siteHandlers } from '../../test/handlers'
import { siteApi } from '../redux/api'
import { renderWithProviders, type RenderWithProvidersOptions } from '../../test/render'
import { server } from '../../test/server'
import SiteRoutes from './Routes'

// the Matrix rain on the 404 and react-mdr pages draws on a canvas, which jsdom lacks.
vi.mock('react-mdr', () => ({
  MatrixRainingLetters: () => <canvas aria-label="Matrix rain" />,
}))

beforeEach(() => {
  server.use(...siteHandlers)
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  window.history.pushState({}, '', '/')
})

/** Render SiteRoutes at a route, and wait until every data source has loaded. */
async function renderRoute(route: string, options: RenderWithProvidersOptions = {}) {
  const utils = renderWithProviders(<SiteRoutes />, { route, ...options })
  await vi.waitFor(() => {
    const queries = Object.values(utils.store.getState().api.queries)
    expect(queries).toHaveLength(9)
    expect(queries.every((query) => query?.status === 'fulfilled')).toBe(true)
  })
  return utils
}

describe('SiteRoutes', () => {
  // every route, and the boxed part of the title that its page shows.
  it.each([
    ['/consulting', 'Services'],
    ['/contact', 'TALK'],
    ['/qr', 'CODE'],
    ['/about', 'ME'],
    ['/image-tagging', 'TAGGING'],
    ['/bio', 'BIO'],
    ['/full-bio', 'BIO'],
    ['/specialties', 'SPECIALTIES'],
    ['/portfolio', 'PORTFOLIO'],
    ['/education', 'TRAINING'],
    ['/openedx', 'Consulting'],
    ['/data-science', 'SCIENCE'],
    ['/full-stack', 'DEVELOPER'],
    ['/cloud', 'COMPUTING'],
    ['/react', 'REACTJS'],
    ['/clients', 'CLIENTS'],
  ])('renders the page at %s', async (route, boxedTitle) => {
    await renderRoute(route)
    const titles = await screen.findAllByRole('heading', { level: 1 })
    expect(titles.map((title) => title.textContent).join(' ')).toContain(boxedTitle)
  })

  it.each(['/', '/react-mdr'])('renders the page at %s', async (route) => {
    await renderRoute(route)
    expect((await screen.findAllByRole('main')).length).toBeGreaterThan(0)
  })

  it('shows the 404 page for an unknown route', async () => {
    await renderRoute('/no-such-page')
    expect(await screen.findByLabelText('Matrix rain')).toBeInTheDocument()
  })

  it('shows the portfolio project whose slug is in the url', async () => {
    // test/handlers.ts serves one portfolio post (category 47), slug post-47.
    await renderRoute('/portfolio/post-47')
    const titles = await screen.findAllByRole('heading', { level: 1 })
    expect(titles.map((title) => title.textContent).join(' ')).toContain('Detail')
  })
})

describe('SiteRoutes and the store', () => {
  it('keeps the page mounted when the data changes', async () => {
    const { store } = await renderRoute('/contact')
    const page = screen.getAllByRole('main')[0]

    await act(async () => {
      await store.dispatch(siteApi.util.resetApiState())
    })

    // the same element: the page was neither remounted nor replaced.
    expect(screen.getAllByRole('main')[0]).toBe(page)
  })
})
