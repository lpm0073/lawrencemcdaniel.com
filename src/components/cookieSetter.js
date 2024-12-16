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

export function setCookie(name, value, options = {}) {
  options = {
    sameSite: 'None',
    secure: true,
    ...options,
  }

  Cookies.set(name, value, options)
}

export function getCookie(name) {
  return Cookies.get(name)
}
