import { act, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '../../../test/render'
import type { RootState } from '../../redux/configureStore'
import LogoCube from './Component'

const LOGOS = [
  'l1.png',
  'l2.png',
  'l3.png',
  'l4.png',
  'l5.png',
  'l6.png',
  'l7.png',
  'l8.png',
]
const FEATURED = ['f1.png', 'f2.png']

function specialties(isLoading = false): Partial<RootState> {
  return {
    specialties: {
      isLoading,
      errMess: null,
      items: [],
      logos: LOGOS,
      featured_logos: FEATURED,
    },
  }
}

/** The logo image url on each of the six sides; the cube has no other way to show them. */
function cubeLogos(): string[] {
  return screen.getAllByLabelText('Cube Side').map((side) => {
    // eslint-disable-next-line testing-library/no-node-access -- the logo is a CSS background with no role
    const logo = side.querySelector<HTMLElement>('.logo')
    return logo?.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, '') ?? ''
  })
}

/** Lets time pass in small steps, so that React renders between the cube's repaints. */
function runFor(ms: number) {
  for (let elapsed = 0; elapsed < ms; elapsed += 100) {
    act(() => {
      vi.advanceTimersByTime(100)
    })
  }
}

describe('LogoCube', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // a repeating sequence of "random" numbers, so that every side gets repainted.
    const sequence = [0.05, 0.2, 0.4, 0.55, 0.7, 0.9, 0.3]
    let call = 0
    vi.spyOn(Math, 'random').mockImplementation(() => sequence[call++ % sequence.length])
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with the locally-stored logos', () => {
    renderWithProviders(<LogoCube />, { preloadedState: specialties() })

    const logos = cubeLogos()
    expect(logos).toHaveLength(6)
    for (const logo of logos) {
      expect(logo).toMatch(/^assets\/images\//)
    }
  })

  it('replaces each logo with a specialty logo, and the front one with a featured logo', () => {
    renderWithProviders(<LogoCube />, { preloadedState: specialties() })

    runFor(60_000)

    const [top, bottom, front, back, right, left] = cubeLogos()
    for (const logo of [top, bottom, back, right, left]) {
      expect(LOGOS).toContain(logo)
    }
    expect(FEATURED).toContain(front)
    // no two sides show the same logo.
    expect(new Set([top, bottom, back, right, left]).size).toBe(5)
  })

  it('shows a logo on only one side, when there are too few to go around', () => {
    renderWithProviders(<LogoCube />, {
      preloadedState: {
        specialties: {
          isLoading: false,
          errMess: null,
          items: [],
          logos: ['solo.png'],
          featured_logos: ['featured.png'],
        },
      },
    })

    runFor(60_000)
    const logos = cubeLogos()
    expect(logos.filter((logo) => logo === 'solo.png').length).toBeGreaterThan(0)
    expect(logos[2]).toBe('featured.png')
  })

  it('keeps the locally-stored logos while the specialties load', () => {
    renderWithProviders(<LogoCube />, { preloadedState: specialties(true) })
    const initial = cubeLogos()

    runFor(60_000)
    expect(cubeLogos()).toEqual(initial)
  })

  it('remembers its logos in the store, and shows them again when remounted', () => {
    const view = renderWithProviders(<LogoCube />, { preloadedState: specialties() })
    runFor(10_000)
    const shown = cubeLogos()

    view.unmount()
    expect(view.store.getState().logoCube.isSet).toBe(true)

    renderWithProviders(<LogoCube />, { store: view.store })
    expect(cubeLogos()).toEqual(shown)
  })
})
