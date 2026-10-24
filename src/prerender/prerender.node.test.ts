// @vitest-environment node
/**
 * The build's prerender script, with a stand-in for the bundle of render.tsx,
 * which render.test.tsx tests itself.
 */
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { routes, unlistedRoutes } from '../components/sitemap/generator.ts'
import { main, pageFile } from './prerender.ts'
import type { PrerenderOptions, PrerenderResult } from './types.ts'

/** A bundle that records its options and returns result. */
function writeBundle(dir: string, result: PrerenderResult): string {
  const bundle = join(dir, 'render.js')
  writeFileSync(
    bundle,
    'export async function prerenderSite(options) {\n' +
      '  globalThis.prerenderOptions = options\n' +
      `  return ${JSON.stringify(result)}\n` +
      '}\n'
  )
  return bundle
}

const RESULT: PrerenderResult = {
  pages: [
    { path: '/', html: '<html>home</html>' },
    { path: '/smarter', html: '<html>smarter</html>' },
    { path: '/portfolio/one', html: '<html>one</html>' },
  ],
  posts: [{ path: '/portfolio/one', lastmod: '2024-05-06T07:08:09' }],
  notFound: '<html>not found</html>',
  errors: [],
}

describe('prerender', () => {
  let dir: string
  let buildDir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'prerender-test-'))
    buildDir = join(dir, 'build')
    mkdirSync(buildDir)
    writeFileSync(join(buildDir, 'index.html'), '<html><!--app-head--></html>')
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
    Reflect.deleteProperty(globalThis, 'prerenderOptions')
  })

  it('writes every page, the 404 page and the sitemap', async () => {
    await main({ buildDir, bundle: writeBundle(dir, RESULT) })

    const read = (file: string) => readFileSync(join(buildDir, file), 'utf8')
    expect(read('index.html')).toBe('<html>home</html>')
    expect(read('smarter/index.html')).toBe('<html>smarter</html>')
    expect(read('portfolio/one/index.html')).toBe('<html>one</html>')
    expect(read('404.html')).toBe('<html>not found</html>')
    expect(read('sitemap.xml')).toContain(
      '<loc>https://lawrencemcdaniel.com/portfolio/one</loc><lastmod>2024-05-06T07:08:09'
    )
    expect(read('sitemap.xml')).toContain(
      '<loc>https://lawrencemcdaniel.com/smarter</loc>'
    )
  })

  it("renders the sitemap's routes and the unlisted ones, from build/index.html", async () => {
    await main({ buildDir, bundle: writeBundle(dir, RESULT) })

    const options = (globalThis as { prerenderOptions?: PrerenderOptions })
      .prerenderOptions
    expect(options).toEqual({
      template: '<html><!--app-head--></html>',
      routes: [...routes, ...unlistedRoutes],
      dataOrigin: 'https://lawrencemcdaniel.com',
    })
  })

  it('writes nothing, and fails, when a data source failed', async () => {
    const bundle = writeBundle(dir, { ...RESULT, errors: ['getVideos: Error 503'] })

    await expect(main({ buildDir, bundle })).rejects.toThrow(
      /failed to load, so no page was written:\n {2}getVideos: Error 503/
    )
    expect(readFileSync(join(buildDir, 'index.html'), 'utf8')).toBe(
      '<html><!--app-head--></html>'
    )
    expect(existsSync(join(buildDir, '404.html'))).toBe(false)
  })
})

describe('pageFile', () => {
  it('is index.html in the folder of the path', () => {
    expect(pageFile('build', '/')).toBe(join('build', 'index.html'))
    expect(pageFile('build', '/portfolio/one')).toBe(
      join('build', 'portfolio', 'one', 'index.html')
    )
  })
})
