import { act, screen } from '@testing-library/react'
import { http } from 'msw'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { makeMedia, makePost } from '../../../test/fixtures'
import { serveSiteData } from '../../../test/handlers'
import { renderWithProviders } from '../../../test/render'
import { server } from '../../../test/server'
import { siteApi } from '../../redux/api'
import { ConfigureStore } from '../../redux/configureStore'
import type { WPPost } from '../../types'
import LogoCube from './Component'

const FEATURED_TECHNOLOGY = 48

/** A specialty whose medium-sized logo is logo; featured ones show on the front side. */
function specialty(id: number, logo: string, featured = false): WPPost {
  const media = makeMedia()
  return makePost({
    id,
    slug: `specialty-${id}`,
    categories: featured ? [43, FEATURED_TECHNOLOGY] : [43],
    _embedded: {
      'wp:featuredmedia': [
        {
          ...media,
          media_details: {
            ...media.media_details,
            sizes: { medium: { width: 300, height: 126, source_url: logo } },
          },
        },
      ],
    },
  })
}

const LOGOS = ['l1.png', 'l2.png', 'l3.png', 'l4.png', 'l5.png', 'l6.png', 'l7.png']
const FEATURED = ['f1.png', 'f2.png']
const SPECIALTIES = [
  ...LOGOS.map((logo, i) => specialty(i + 1, logo)),
  ...FEATURED.map((logo, i) => specialty(100 + i, logo, true)),
]

/** A store with the specialties loaded from the (mock) api, before the cube mounts. */
async function loadedStore(specialties: WPPost[] = SPECIALTIES) {
  server.use(...serveSiteData({ specialties }))
  const store = ConfigureStore()
  await store.dispatch(siteApi.endpoints.getSpecialties.initiate())
  return store
}

/** The logo image url on each of the six sides; the cube has no other way to show them. */
function cubeLogos(): string[] {
  return screen.getAllByLabelText('Cube Side').map((side) => {
    // eslint-disable-next-line testing-library/no-node-access -- the logo is a CSS background with no role
    const logo = side.querySelector<HTMLElement>('.logo')
    return logo?.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, '') ?? ''
  })
}

/** Whether the cube plays its construction animation, which it has no accessible sign of. */
function isConstructing(): boolean {
  return screen
    .getAllByLabelText('Cube Side')
    .some((side) => side.classList.contains('grow-side'))
}

/** Lets time pass in small steps, so that React renders between the cube's repaints. */
function runFor(ms: number) {
  for (let elapsed = 0; elapsed < ms; elapsed += 100) {
    act(() => {
      vi.advanceTimersByTime(100)
    })
  }
}

/** Fake timers, and a repeating sequence of "random" numbers, so that every side gets repainted. */
function startClock() {
  vi.useFakeTimers()
  const sequence = [0.05, 0.2, 0.4, 0.55, 0.7, 0.9, 0.3]
  let call = 0
  vi.spyOn(Math, 'random').mockImplementation(() => sequence[call++ % sequence.length])
}

describe('LogoCube', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with the locally-stored logos, and builds itself', async () => {
    const store = await loadedStore()
    startClock()
    renderWithProviders(<LogoCube />, { store })

    const logos = cubeLogos()
    expect(logos).toHaveLength(6)
    for (const logo of logos) {
      expect(logo).toMatch(/^assets\/images\//)
    }
    expect(isConstructing()).toBe(true)
  })

  it('replaces each logo with a specialty logo, and the front one with a featured logo', async () => {
    const store = await loadedStore()
    startClock()
    renderWithProviders(<LogoCube />, { store })

    runFor(60_000)

    const [top, bottom, front, back, right, left] = cubeLogos()
    const all = [...LOGOS, ...FEATURED]
    for (const logo of [top, bottom, back, right, left]) {
      expect(all).toContain(logo)
    }
    expect(FEATURED).toContain(front)
    // no two sides show the same logo.
    expect(new Set([top, bottom, front, back, right, left]).size).toBe(6)
  })

  it('shows a logo on more than one side, when there are too few to go around', async () => {
    const store = await loadedStore([specialty(1, 'solo.png', true)])
    startClock()
    renderWithProviders(<LogoCube />, { store })

    runFor(60_000)
    const logos = cubeLogos()
    expect(logos.filter((logo) => logo === 'solo.png').length).toBeGreaterThan(1)
    expect(logos[2]).toBe('solo.png')
  })

  it('keeps the locally-stored logos while the specialties load', () => {
    startClock()
    server.use(
      http.get(
        'https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts',
        () => new Promise(() => {})
      )
    )
    renderWithProviders(<LogoCube />)
    const initial = cubeLogos()

    runFor(60_000)
    expect(cubeLogos()).toEqual(initial)
  })

  it('remembers its logos in the store, and shows them again when remounted', async () => {
    const store = await loadedStore()
    startClock()
    const view = renderWithProviders(<LogoCube />, { store })
    runFor(10_000)
    const shown = cubeLogos()
    expect(store.getState().ui.logoCube).toBeNull()

    view.unmount()
    expect(store.getState().ui.logoCube).toMatchObject({
      cubeFrontBackgroundUrl: shown[2],
    })

    renderWithProviders(<LogoCube />, { store })
    expect(cubeLogos()).toEqual(shown)
    // the cube is already built, so it doesn't build itself again.
    expect(isConstructing()).toBe(false)
  })

  it('repaints nothing when the random side is not one of the six', async () => {
    const store = await loadedStore()
    vi.useFakeTimers()
    // Math.random() is below 1 in practice; the cube guards against it anyway.
    vi.spyOn(Math, 'random').mockReturnValue(1)
    renderWithProviders(<LogoCube />, { store })
    const initial = cubeLogos()

    runFor(10_000)
    expect(cubeLogos()).toEqual(initial)
  })
})
