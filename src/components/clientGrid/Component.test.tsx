import { screen, waitFor } from '@testing-library/react'
import { http } from 'msw'
import { describe, expect, it } from 'vitest'

import { serveSiteData } from '../../../test/handlers'
import { makePost } from '../../../test/fixtures'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { ConfigureStore } from '../../redux/configureStore'
import { entryAnimationPlayed } from '../../redux/uiSlice'
import ClientGrid from './Component'

const LOGOS = [
  makePost({
    id: 1,
    title: { rendered: 'edX' },
    categories: [46],
    tags: [55],
    acf: { url: 'https://edx.org' },
  }),
  makePost({ id: 2, title: { rendered: 'Acme' }, categories: [46], tags: [] }),
]

/** A store in which the grid has already played its entry animation. */
function playedStore() {
  const store = ConfigureStore()
  store.dispatch(entryAnimationPlayed('clientGrid'))
  return store
}

describe('ClientGrid', () => {
  it("fades in every client's logo the first time", async () => {
    server.use(...serveSiteData({ clients: LOGOS }))
    renderWithProviders(<ClientGrid />)

    expect(await screen.findByRole('article', { name: 'edX' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Client Logos' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Acme' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it("plays the animation once, then links to the clients' web sites", async () => {
    server.use(...serveSiteData({ clients: LOGOS }))
    const view = renderWithProviders(<ClientGrid />)
    await screen.findByRole('article', { name: 'edX' })
    expect(view.store.getState().ui.entryAnimationsPlayed.clientGrid).toBe(false)

    view.unmount()
    expect(view.store.getState().ui.entryAnimationsPlayed.clientGrid).toBe(true)

    renderWithProviders(<ClientGrid />, { store: view.store })
    expect(await screen.findByRole('link', { name: 'edX Website' })).toHaveAttribute(
      'href',
      'https://edx.org'
    )
    // Acme has no url.
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('article', { name: 'Acme' })).toBeInTheDocument()
  })

  it('shows only the Open edX clients with the edx filter', async () => {
    server.use(...serveSiteData({ clients: LOGOS }))
    renderWithProviders(<ClientGrid filter="edx" />, { store: playedStore() })

    expect(await screen.findByRole('article', { name: 'edX' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Acme' })).not.toBeInTheDocument()
  })

  it('shows a spinner while loading', () => {
    server.use(
      http.get(
        'https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts',
        () => new Promise(() => {})
      )
    )
    renderWithProviders(<ClientGrid />)
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('shows no logos when the clients fail to load', async () => {
    server.use(...serveSiteData({ clients: 503 }))
    renderWithProviders(<ClientGrid />)

    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByLabelText('three-dots-loading')).not.toBeInTheDocument()
    )
    expect(screen.getByRole('region', { name: 'Client Logos' })).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
