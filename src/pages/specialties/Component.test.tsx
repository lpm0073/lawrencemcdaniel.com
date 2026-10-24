import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { jsonLdGraph, metaContent, waitForCanonical } from '../../../test/pageHead'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../../shared/constants'
import Specialties from './Component'

const WP_API = 'https://api.lawrencemcdaniel.com/wp-json/wp/v2'

const SPECIALTIES = [
  makePost({
    id: 1,
    title: { rendered: 'Django' },
    tags: [7],
    acf: { url: 'https://www.djangoproject.com/' },
  }),
]

/** The Person in the page's JSON-LD. */
const person = () => jsonLdGraph().find((node) => node['@type'] === 'Person')

describe('Specialties', () => {
  beforeEach(() => {
    // react-multi-carousel renders no slides until its container has a width, which jsdom never gives.
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
    server.use(...serveSiteData({ specialties: SPECIALTIES }))
  })

  it('shows the specialties, the technologies and a link to the code samples', async () => {
    renderWithProviders(<Specialties />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'MY SPECIALTIES' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 4, name: 'FULL STACK DEVELOPMENT' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'Technology Specialties Carousel' })
    ).toBeInTheDocument()
    expect(
      (await screen.findAllByRole('article', { name: 'Django', hidden: true })).length
    ).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /Code samples/ })).toHaveAttribute(
      'href',
      'consulting/'
    )
  })

  it('lists the technologies Lawrence McDaniel knows about in the JSON-LD', async () => {
    renderWithProviders(<Specialties />)

    await waitForCanonical(APP_CONFIG.urls.site + '/specialties')
    expect(metaContent('description')).toBe(
      'Lawrence McDaniel - Professional Specialties'
    )
    await waitFor(() =>
      expect(person()).toEqual(
        expect.objectContaining({
          knowsAbout: expect.arrayContaining([
            expect.objectContaining({ name: 'Django' }),
          ]),
        })
      )
    )
  })

  it('lists no technologies in the JSON-LD while the specialties load', async () => {
    // hold the specialties back until the loading state has been checked.
    let release = () => {}
    const held = new Promise<void>((resolve) => (release = resolve))
    server.use(
      http.get(`${WP_API}/posts`, async () => {
        await held
        return HttpResponse.json(SPECIALTIES)
      })
    )
    renderWithProviders(<Specialties />)

    // the specialties haven't arrived.
    await waitFor(() =>
      expect(person()).toEqual(expect.objectContaining({ knowsAbout: [] }))
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'MY SPECIALTIES' })
    ).toBeInTheDocument()
    release()
    await waitFor(() => expect(person()?.knowsAbout).toHaveLength(1))
  })

  it('lists no technologies if the specialties fail to load', async () => {
    server.use(...serveSiteData({ specialties: 503 }))
    const { store } = renderWithProviders(<Specialties />)

    await waitFor(() =>
      expect(store.getState().api.queries['getSpecialties(undefined)']?.status).toBe(
        'rejected'
      )
    )
    await waitFor(() =>
      expect(person()).toEqual(expect.objectContaining({ knowsAbout: [] }))
    )
    expect(
      screen.getByRole('heading', { level: 1, name: 'MY SPECIALTIES' })
    ).toBeInTheDocument()
  })
})
