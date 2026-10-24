/*
 Chrome is moving towards a new experience that allows users to choose to browse without third-party cookies.
  To ensure compatibility and enhance security, cookies must be set with the `SameSite` and `Secure` attributes.

 * This module provides utility functions for setting and getting cookies
 * with specific attributes to comply with modern browser security policies.
 *
 * Chrome and other browsers are moving towards a new experience that allows
 * users to choose to browse without third-party cookies. To ensure compatibility
 * and enhance security, cookies must be set with the `SameSite` and `Secure` attributes.
 *
 * The `setCookie` function ensures that all cookies are set with `SameSite=None` and
 * `Secure=true` attributes by default, which is necessary for cross-site cookies to be
 * sent in third-party contexts.
 *
 * The `getCookie` function is a simple wrapper around the `js-cookie` library's get method
 * to retrieve the value of a cookie by its name.
 *
 * Usage:
 *
 * import { setCookie, getCookie } from './cookieSetter';
 *
 * // Set a cookie
 * setCookie('example', 'value');
 *
 * // Get a cookie
 * const value = getCookie('example');
 *
 * This module helps ensure that your application complies with the latest browser
 * security standards and provides a consistent way to manage cookies.
 */
import Cookies from 'js-cookie'

export function setCookie(
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {}
) {
  Cookies.set(name, value, {
    sameSite: 'None',
    secure: true,
    ...options,
  })
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

/**
 * Re-set every cookie that the page can see with SameSite=None and Secure,
 * keeping its value exactly as the browser stores it.
 *
 * It writes document.cookie directly, rather than through setCookie(): the
 * values in document.cookie are already encoded, and js-cookie would encode
 * them again (each % becoming %25), so every page load made them longer,
 * until the requests' Cookie header was too large for the server (HTTP 431).
 * A value is everything after the first =, because values (base64, for
 * example) may contain = themselves. Nameless cookies are left alone.
 */
export function secureExistingCookies(): void {
  for (const pair of document.cookie.split(';')) {
    // a pair without = is a nameless cookie, whose name can't be written back.
    const separator = pair.indexOf('=')
    if (separator === -1) continue
    const name = pair.slice(0, separator).trim()
    if (!name) continue
    const value = pair.slice(separator + 1)
    document.cookie = `${name}=${value}; path=/; SameSite=None; Secure`
  }
}
