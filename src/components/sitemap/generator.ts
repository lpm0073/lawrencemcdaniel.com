import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { APP_CONFIG } from '../../shared/constants.ts'

const urlCloud = '/' + APP_CONFIG.skills.cloud
const urlDataScience = '/' + APP_CONFIG.skills.dataScience
const urlFullStack = '/' + APP_CONFIG.skills.fullStack
const urlOpenEdx = '/' + APP_CONFIG.skills.openEdx
const urlReact = '/' + APP_CONFIG.skills.react

export const routes: string[] = [
  '/',
  '/contact',
  '/consulting',
  '/qr',
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
  '/qr': 0.5,
}

/** Writes the sitemap to outputPath, by default public/sitemap.xml under the current directory. */
export function main(outputPath: string = './public/sitemap.xml'): Promise<void> {
  const lastmod = new Date().toISOString()
  const changefreq = 'monthly'

  const sitemap = new SitemapStream({ hostname: 'https://lawrencemcdaniel.com' })
  const writeStream = createWriteStream(outputPath)

  routes.forEach((url) => {
    sitemap.write({
      url,
      lastmod,
      changefreq,
      priority: priorities[url] || 0.5,
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
