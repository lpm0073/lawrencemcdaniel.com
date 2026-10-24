import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { APP_CONFIG } from '../../shared/constants.ts'

const urlCloud = '/' + APP_CONFIG.skills.cloud
const urlDataScience = '/' + APP_CONFIG.skills.dataScience
const urlFullStack = '/' + APP_CONFIG.skills.fullStack
const urlOpenEdx = '/' + APP_CONFIG.skills.openEdx
const urlReact = '/' + APP_CONFIG.skills.react

/** The site's pages, in the sitemap, and prerendered (src/prerender/). */
export const routes: string[] = [
  '/',
  '/contact',
  '/consulting',
  '/about',
  urlCloud,
  urlDataScience,
  urlFullStack,
  urlOpenEdx,
  urlReact,
  '/bio',
  '/specialties',
  '/portfolio',
  '/education',
  '/react-mdr',
  '/clients',
  '/smarter',
]

export const priorities: Record<string, number> = {
  '/': 1.0,
  '/consulting': 0.9,
  [urlCloud]: 0.8,
  [urlDataScience]: 0.8,
  [urlFullStack]: 0.8,
  [urlOpenEdx]: 0.8,
  [urlReact]: 0.8,
  '/smarter': 0.8,
  '/contact': 0.7,
  '/about': 0.6,
  '/bio': 0.6,
  '/specialties': 0.6,
  '/portfolio': 0.6,
  '/education': 0.6,
  '/clients': 0.6,
  '/react-mdr': 0.5,
}

/**
 * Pages that are prerendered but left out of the sitemap: the WhatsApp QR code
 * and a demo of image tagging, which aren't meant to be found by search.
 */
export const unlistedRoutes: string[] = ['/qr', '/image-tagging']

/** A page of the sitemap that the routes don't list, e.g. a portfolio project. */
export interface SitemapEntry {
  url: string
  /** when its content last changed, if known. */
  lastmod?: string
  priority?: number
}

/**
 * Writes the sitemap to outputPath, by default public/sitemap.xml under the
 * current directory: the routes, then entries (the build adds the portfolio's
 * detail pages, src/prerender/prerender.ts).
 *
 * The routes have no lastmod: the date they last changed isn't known, and a
 * lastmod that is always the build's date teaches search engines to ignore it.
 */
export function main(
  outputPath: string = './public/sitemap.xml',
  entries: readonly SitemapEntry[] = []
): Promise<void> {
  const changefreq = 'monthly'

  const sitemap = new SitemapStream({ hostname: 'https://lawrencemcdaniel.com' })
  const writeStream = createWriteStream(outputPath)

  routes.forEach((url) => {
    sitemap.write({
      url,
      changefreq,
      priority: priorities[url] || 0.5,
    })
  })
  entries.forEach(({ url, lastmod, priority }) => {
    sitemap.write({
      url,
      changefreq,
      priority: priority ?? 0.5,
      ...(lastmod ? { lastmod } : {}),
    })
  })

  sitemap.end()
  sitemap.pipe(writeStream)

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
}

// Run main() only when Node runs this file directly (node <file>.ts), not when a test imports it.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main()
