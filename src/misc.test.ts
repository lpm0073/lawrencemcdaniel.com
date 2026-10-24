import Cookies from 'js-cookie'
import { describe, expect, it, vi } from 'vitest'

import { getCookie, secureExistingCookies, setCookie } from './components/cookieSetter'
import reportWebVitals from './reportWebVitals'
import { getInitialLogos } from './shared/getInitialLogos'
import { getPixelRatio } from './shared/getPixelRatio'
import unescapedString from './shared/unescapedString'

const vitals = vi.hoisted(() => ({
  onCLS: vi.fn(),
  onINP: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}))
vi.mock('web-vitals', () => vitals)

describe('cookieSetter', () => {
  it('sets cookies with SameSite=None and Secure by default', () => {
    const set = vi.spyOn(Cookies, 'set')

    setCookie('theme', 'dark')
    setCookie('lang', 'en', { expires: 7 })

    expect(set).toHaveBeenCalledWith('theme', 'dark', { sameSite: 'None', secure: true })
    expect(set).toHaveBeenCalledWith('lang', 'en', {
      sameSite: 'None',
      secure: true,
      expires: 7,
    })
  })

  it('re-sets existing cookies without changing them, however many times it runs', () => {
    document.cookie = 'messages="[[\\"__json_message\\",0,25]]"; path=/'
    document.cookie = 'token=YWJjZA==; path=/'
    document.cookie = 'flag; path=/'
    const before = document.cookie
    const set = vi.spyOn(document, 'cookie', 'set')

    for (let load = 0; load < 5; load++) secureExistingCookies()

    expect(document.cookie).toBe(before)
    expect(set).toHaveBeenCalledWith('token=YWJjZA==; path=/; SameSite=None; Secure')
    expect(set).not.toHaveBeenCalledWith(expect.stringContaining('flag'))
  })

  it('reads a cookie', () => {
    document.cookie = 'flavor=vanilla'
    expect(getCookie('flavor')).toBe('vanilla')
  })
})

describe('reportWebVitals', () => {
  it('reports each metric to the callback', async () => {
    const callback = vi.fn()
    reportWebVitals(callback)
    await vi.waitFor(() => expect(vitals.onTTFB).toHaveBeenCalledWith(callback))
    for (const report of [vitals.onCLS, vitals.onINP, vitals.onFCP, vitals.onLCP]) {
      expect(report).toHaveBeenCalledWith(callback)
    }
  })

  it('does nothing without a callback', () => {
    reportWebVitals()
    expect(vitals.onCLS).not.toHaveBeenCalled()
  })
})

describe('small helpers', () => {
  it('lists the logos shown before the WordPress logos load', () => {
    const logos = getInitialLogos()
    expect(logos).toHaveLength(8)
    expect(logos).toContain('assets/images/python-logo.png')
  })

  it('wraps html for dangerouslySetInnerHTML', () => {
    expect(unescapedString('<b>hi</b>')).toEqual({ __html: '<b>hi</b>' })
  })

  it("divides the device pixel ratio by the canvas's backing store ratio", () => {
    const context = {} as CanvasRenderingContext2D
    vi.stubGlobal('devicePixelRatio', 2)
    expect(getPixelRatio(context)).toBe(2)
    expect(
      getPixelRatio({
        webkitBackingStorePixelRatio: 2,
      } as unknown as CanvasRenderingContext2D)
    ).toBe(1)
    vi.unstubAllGlobals()
  })
})
