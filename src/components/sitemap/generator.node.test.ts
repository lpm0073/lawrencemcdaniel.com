// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { main, priorities, routes, unlistedRoutes } from './generator.ts'

describe('sitemap generator', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sitemap-test-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('writes every route with its priority, and no lastmod', async () => {
    const outputPath = join(dir, 'sitemap.xml')

    await main(outputPath)

    const xml = readFileSync(outputPath, 'utf8')
    expect(routes).toHaveLength(16)
    for (const route of routes) {
      expect(xml).toContain(`<loc>https://lawrencemcdaniel.com${route}</loc>`)
    }
    // the date a route last changed isn't known, and the build's date would be a lie.
    expect(xml).not.toContain('<lastmod>')
    expect(xml).toMatch(
      /<loc>https:\/\/lawrencemcdaniel.com\/<\/loc>.*?<priority>1.0<\/priority>/
    )
    expect(xml).toMatch(
      /<loc>https:\/\/lawrencemcdaniel.com\/react-mdr<\/loc>.*?<priority>0.5<\/priority>/
    )
    expect(xml).toContain('<changefreq>monthly</changefreq>')
    expect(priorities['/consulting']).toBe(0.9)
    // the skill pages, whose paths come from APP_CONFIG.skills.
    for (const page of ['/cloud', '/data-science', '/full-stack', '/openedx', '/react']) {
      expect(priorities[page]).toBe(0.8)
    }
  })

  it('leaves the unlisted pages out', async () => {
    const outputPath = join(dir, 'sitemap.xml')

    await main(outputPath)

    const xml = readFileSync(outputPath, 'utf8')
    for (const route of unlistedRoutes) {
      expect(routes).not.toContain(route)
      expect(xml).not.toContain(`<loc>https://lawrencemcdaniel.com${route}</loc>`)
    }
  })

  it('adds the entries after the routes, with their lastmod when known', async () => {
    const outputPath = join(dir, 'sitemap.xml')

    await main(outputPath, [
      { url: '/portfolio/one', lastmod: '2024-05-06T07:08:09' },
      { url: '/portfolio/two', priority: 0.7 },
    ])

    const xml = readFileSync(outputPath, 'utf8')
    expect(xml).toMatch(
      /<loc>https:\/\/lawrencemcdaniel.com\/portfolio\/one<\/loc><lastmod>2024-05-06T07:08:09/
    )
    expect(xml).toMatch(
      /<loc>https:\/\/lawrencemcdaniel.com\/portfolio\/two<\/loc><changefreq>monthly<\/changefreq><priority>0.7/
    )
    expect(xml.indexOf('/smarter</loc>')).toBeLessThan(
      xml.indexOf('/portfolio/one</loc>')
    )
  })

  it('rejects when the file cannot be written', async () => {
    await expect(main(join(dir, 'missing', 'sitemap.xml'))).rejects.toThrow()
  })
})
