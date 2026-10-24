import { act, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../test/fixtures'
import { siteHandlers } from '../../test/handlers'
import { renderWithProviders, type RenderWithProvidersOptions } from '../../test/render'
import { server } from '../../test/server'
import * as ActionTypes from '../redux/ActionTypes'
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
    const state = utils.store.getState()
    expect(state.specialties.isLoading).toBe(false)
    expect(state.clients.isLoading).toBe(false)
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

describe('SiteRoutes re-rendering', () => {
  // The home, clients, education and full-stack pages have entry animations, so
  // SiteRoutes.shouldComponentUpdate() stops re-rendering (on the browser's
  // current path) once that page has marked itself set.

  /** Render /portfolio with the browser at path, then add a project to the store. */
  async function addProjectAt(path: string, setAction?: string) {
    window.history.pushState({}, '', path)
    const { store } = await renderRoute('/portfolio')
    // shouldComponentUpdate() reads the current props, so the update that sets the
    // page renders, and only the updates after it are skipped.
    if (setAction) act(() => store.dispatch({ type: setAction }))
    act(() => {
      store.dispatch({
        type: ActionTypes.ADD_PORTFOLIO,
        payload: [makePost({ title: { rendered: 'Fresh Project' } })],
      })
    })
  }

  const ANIMATED_PAGES = [
    ['/', ActionTypes.SET_HOMEPAGE_STATE],
    ['/home', ActionTypes.SET_HOMEPAGE_STATE],
    ['/clients', ActionTypes.SET_CLIENTGRID_STATE],
    ['/education', ActionTypes.SET_COURSESGRID_STATE],
    ['/full-stack', ActionTypes.SET_COURSESGRID_STATE],
  ]

  it.each(ANIMATED_PAGES)('re-renders at %s until its animation is set', async (path) => {
    await addProjectAt(path)
    expect(screen.getAllByText('Fresh Project').length).toBeGreaterThan(0)
  })

  it.each(ANIMATED_PAGES)(
    'stops re-rendering at %s once its animation is set',
    async (path, setAction) => {
      await addProjectAt(path, setAction)
      expect(screen.queryByText('Fresh Project')).not.toBeInTheDocument()
    }
  )

  it('keeps re-rendering at other paths', async () => {
    await addProjectAt('/portfolio', ActionTypes.SET_HOMEPAGE_STATE)
    expect(screen.getAllByText('Fresh Project').length).toBeGreaterThan(0)
  })
})
