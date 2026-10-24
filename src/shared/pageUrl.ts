import { APP_CONFIG } from './constants'

/**
 * A page's absolute url, as its canonical link names it: the site's url for
 * the home page, and no trailing slash, e.g. https://lawrencemcdaniel.com/smarter
 */
export function pageUrl(path: string): string {
  return path === '/' ? APP_CONFIG.urls.site : APP_CONFIG.urls.site + path
}
