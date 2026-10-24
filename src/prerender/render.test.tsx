// @vitest-environment node
/**
 * The prerender, in Node as the build runs it, rendering the real app against
 * the test data that MSW serves (test/handlers.ts).
 */
import { http, HttpResponse } from 'msw'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { makePost, makeRepository } from '../../test/fixtures'
import { serveSiteData } from '../../test/handlers'
import { server } from '../../test/server'
import { setDataOrigin } from '../redux/cachedBaseQuery'
import { HEAD_PLACEHOLDER, HTML_PLACEHOLDER, prerenderSite } from './render'
import { SNAPSHOT_ELEMENT_ID } from './snapshot'

const TEMPLATE =
  '<!doctype html><html><head><meta charset="utf-8" />' +
  HEAD_PLACEHOLDER +
  '</head><body><div id="root">' +
  HTML_PLACEHOLDER +
  '</div><script type="module" src="/static/index.js"></script></body></html>'

const ORIGIN = 'https://lawrencemcdaniel.com'

const PROJECT = makePost({
  id: 47,
  slug: 'open-edx-at-scale',
  modified: '2024-05-06T07:08:09',
  categories: [47],
  title: { rendered: 'Open edX at Scale, $& more' },
  content: {
    rendered: '<p>{“description”: “Kubernetes, for $1 a day.”, “images”: []}</p>',
  },
})

/** The text between <title> and </title>. */
const titleOf = (html: string) => html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]

/** The endpoints whose data the page embeds. */
function snapshotKeys(html: string): string[] {
  const json = html.match(
    new RegExp(
      `<script id="${SNAPSHOT_ELEMENT_ID}" type="application/json">(.*?)</script>`
    )
  )?.[1]
  return Object.keys(JSON.parse(json ?? 'null') as object).sort()
}

describe('prerenderSite', () => {
  beforeEach(() => {
    // the portfolio detail page logs the posts whose JSON it can't read.
    vi.spyOn(console, 'log').mockImplementation(() => {})
    server.use(...serveSiteData({ portfolio: [PROJECT] }))
  })
  afterEach(() => {
    setDataOrigin('')
  })

  it('renders every page with its own head tags, content and data', async () => {
    const { errors, pages } = await prerenderSite({
      template: TEMPLATE,
      routes: ['/', '/smarter', '/portfolio'],
      dataOrigin: ORIGIN,
    })

    expect(errors).toEqual([])
    expect(pages.map((page) => page.path)).toEqual([
      '/',
      '/smarter',
      '/portfolio',
      '/portfolio/open-edx-at-scale',
    ])
    const [home, smarter, portfolio] = pages.map((page) => page.html)

    expect(titleOf(smarter)).toBe('Lawrence McDaniel - The Smarter Project')
    expect(smarter).toContain(
      '<link data-react-helmet="true" rel="canonical" href="https://lawrencemcdaniel.com/smarter"/>'
    )
    expect(smarter).toContain(
      'property="og:image" content="https://lawrencemcdaniel.com/assets/images/share/smarter.jpg"'
    )
    expect(smarter).toContain(
      '<script data-react-helmet="true" type="application/ld+json">'
    )
    expect(smarter).toContain('THE SMARTER')
    expect(smarter).not.toContain(HEAD_PLACEHOLDER)

    expect(home).toContain('rel="canonical" href="https://lawrencemcdaniel.com"')

    // each page embeds the data that it shows, and nothing else.
    expect(snapshotKeys(portfolio)).toContain('getPortfolio')
    expect(snapshotKeys(smarter)).not.toContain('getPortfolio')
  })

  it("renders the portfolio's detail pages, and lists them for the sitemap", async () => {
    const { pages, posts } = await prerenderSite({
      template: TEMPLATE,
      routes: [],
      dataOrigin: ORIGIN,
    })

    expect(posts).toEqual([
      { path: '/portfolio/open-edx-at-scale', lastmod: '2024-05-06T07:08:09' },
    ])
    const [project] = pages
    expect(project.path).toBe('/portfolio/open-edx-at-scale')
    // a "$" in the content is text, not a replacement pattern.
    expect(titleOf(project.html)).toBe(
      'Lawrence McDaniel - Open edX at Scale, $&amp; more'
    )
    expect(project.html).toContain('Kubernetes, for $1 a day.')
    expect(project.html).toContain(
      'rel="canonical" href="https://lawrencemcdaniel.com/portfolio/open-edx-at-scale"'
    )
  })

  it('leaves out lastmod when WordPress gives no modified date', async () => {
    server.use(...serveSiteData({ portfolio: [{ ...PROJECT, modified: undefined }] }))

    const { posts } = await prerenderSite({
      template: TEMPLATE,
      routes: [],
      dataOrigin: ORIGIN,
    })

    expect(posts).toEqual([{ path: '/portfolio/open-edx-at-scale' }])
  })

  it('renders the 404 page, which is never indexed', async () => {
    const { notFound } = await prerenderSite({
      template: TEMPLATE,
      routes: [],
      dataOrigin: ORIGIN,
    })

    expect(notFound).toContain('name="robots" content="noindex"')
    expect(notFound).toContain('404 Page Not Found')
    expect(notFound).not.toContain('rel="canonical"')
  })

  it("fetches the site's /data/ files from the data origin", async () => {
    const urls: string[] = []
    server.use(
      http.get('*/data/github.json', ({ request }) => {
        urls.push(request.url)
        return HttpResponse.json([makeRepository()])
      })
    )

    await prerenderSite({
      template: TEMPLATE,
      routes: [],
      dataOrigin: 'https://example.test',
    })

    expect(urls).toEqual(['https://example.test/data/github.json'])
  })

  it('reports the data sources that failed to load', async () => {
    server.use(...serveSiteData({ portfolio: [PROJECT], videos: 503, clients: 500 }))

    const { errors } = await prerenderSite({
      template: TEMPLATE,
      routes: ['/'],
      dataOrigin: ORIGIN,
    })

    expect(errors).toEqual(['getVideos: Error 503', 'getClients: Error 500'])
  })

  it("leaves no cache timer behind, which would keep the build's Node process running", async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')

    await prerenderSite({ template: TEMPLATE, routes: ['/'], dataOrigin: ORIGIN })

    // RTK Query's timers that drop unused data, an hour or more.
    const cacheTimers = setTimeoutSpy.mock.results
      .filter((_, i) => (setTimeoutSpy.mock.calls[i]?.[1] ?? 0) >= 60 * 60 * 1000)
      .map((result) => result.value as unknown)
    expect(cacheTimers.length).toBeGreaterThan(0)
    const cleared = clearTimeoutSpy.mock.calls.map(([id]) => id as unknown)
    for (const timer of cacheTimers) expect(cleared).toContain(timer)
  })

  it('refuses a template without its placeholders, e.g. an already prerendered page', async () => {
    await expect(
      prerenderSite({
        template: TEMPLATE.replace(HEAD_PLACEHOLDER, ''),
        routes: ['/'],
        dataOrigin: ORIGIN,
      })
    ).rejects.toThrow('the template has no <!--app-head-->')
  })
})
