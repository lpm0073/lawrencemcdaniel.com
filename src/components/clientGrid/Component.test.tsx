import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { renderWithProviders } from '../../../test/render'
import type { RootState } from '../../redux/configureStore'
import ClientGrid from './Component'

const LOGOS = [
  makePost({
    id: 1,
    title: { rendered: 'edX' },
    tags: [55],
    acf: { url: 'https://edx.org' },
  }),
  makePost({ id: 2, title: { rendered: 'Acme' }, tags: [] }),
]

function state(isSet: boolean): Partial<RootState> {
  return {
    clients: { isLoading: false, errMess: null, logos: LOGOS },
    clientGrid: { isSet },
  }
}

describe('ClientGrid', () => {
  it("fades in every client's logo the first time", () => {
    renderWithProviders(<ClientGrid />, { preloadedState: state(false) })

    expect(screen.getByRole('region', { name: 'Client Logos' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'edX' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Acme' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it("links to the clients' web sites after that", () => {
    renderWithProviders(<ClientGrid />, { preloadedState: state(true) })

    expect(screen.getByRole('link', { name: 'edX Website' })).toHaveAttribute(
      'href',
      'https://edx.org'
    )
    // Acme has no url.
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('shows only the Open edX clients with the edx filter', () => {
    renderWithProviders(<ClientGrid filter="edx" />, { preloadedState: state(true) })

    expect(screen.getByRole('article', { name: 'edX' })).toBeInTheDocument()
    expect(screen.queryByRole('article', { name: 'Acme' })).not.toBeInTheDocument()
  })

  it('uses the Redux store, not the clients prop', () => {
    renderWithProviders(
      <ClientGrid clients={{ isLoading: false, errMess: null, logos: [] }} />,
      { preloadedState: state(true) }
    )
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('shows a spinner while loading', () => {
    renderWithProviders(<ClientGrid isLoading />, { preloadedState: state(true) })
    expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('records in the store that the grid has been shown', () => {
    const { store, unmount } = renderWithProviders(<ClientGrid />, {
      preloadedState: state(false),
    })
    expect(store.getState().clientGrid.isSet).toBe(false)

    unmount()
    expect(store.getState().clientGrid.isSet).toBe(true)
  })
})
