/**
 * The last step of `yarn build`: renders every page of the site to html, with
 * the bundle of render.tsx that vite.prerender.config.ts builds into
 * build-ssr/, and writes the pages into build/:
 *
 *   build/index.html                   the home page (and the service worker's offline fallback)
 *   build/<path>/index.html            every other page, e.g. build/smarter/index.html
 *   build/404.html                     the page for urls that match no page
 *   build/sitemap.xml                  the routes and the portfolio's detail pages
 *
 * The deploy uploads each page a second time without its /index.html
 * (.github/workflows/deploy.yml), so that CloudFront serves /smarter itself,
 * and the html of every page has its own title, description and preview.
 *
 * It fails, and so does the build, when a data source can't be loaded: a page
 * without its data would show search engines an error message or a spinner.
 *
 *   node src/prerender/prerender.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  main as writeSitemap,
  routes,
  unlistedRoutes,
} from '../components/sitemap/generator.ts'
import { APP_CONFIG } from '../shared/constants.ts'
import type { Prerender } from './types.ts'

export interface PrerenderPaths {
  /** Vite's output, with index.html. */
  buildDir: string
  /** the bundle of render.tsx. */
  bundle: string
}

const DEFAULT_PATHS: PrerenderPaths = {
  buildDir: 'build',
  bundle: 'build-ssr/render.js',
}

/** The file that serves path: build/index.html for '/', build/<path>/index.html otherwise. */
export function pageFile(buildDir: string, path: string): string {
  return join(buildDir, path, 'index.html')
}

function write(file: string, content: string): void {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

/** Render and write every page. Rejects, writing nothing, when a data source fails. */
export async function main(paths: PrerenderPaths = DEFAULT_PATHS): Promise<void> {
  const { buildDir, bundle } = paths
  const template = readFileSync(join(buildDir, 'index.html'), 'utf8')
  const { prerenderSite } = (await import(pathToFileURL(resolve(bundle)).href)) as {
    prerenderSite: Prerender
  }

  const result = await prerenderSite({
    template,
    routes: [...routes, ...unlistedRoutes],
    dataOrigin: APP_CONFIG.urls.site,
  })
  if (result.errors.length > 0) {
    throw new Error(
      'prerender: these data sources failed to load, so no page was written:\n  ' +
        result.errors.join('\n  ')
    )
  }

  for (const page of result.pages) write(pageFile(buildDir, page.path), page.html)
  write(join(buildDir, '404.html'), result.notFound)
  await writeSitemap(
    join(buildDir, 'sitemap.xml'),
    result.posts.map((post) => ({ url: post.path, lastmod: post.lastmod }))
  )
  console.log(`prerender: wrote ${result.pages.length} pages, 404.html and sitemap.xml`)
}

// Run main() only when Node runs this file directly (node <file>.ts), not when a test imports it.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  try {
    await main()
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}
