// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { main, priorities, routes } from './generator.ts'

describe('sitemap generator', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sitemap-test-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('writes every route with its priority', async () => {
    const outputPath = join(dir, 'sitemap.xml')

    await main(outputPath)

    const xml = readFileSync(outputPath, 'utf8')
    expect(routes).toHaveLength(16)
    for (const route of routes) {
      expect(xml).toContain(`<loc>https://lawrencemcdaniel.com${route}</loc>`)
    }
    expect(xml).toContain('<loc>https://lawrencemcdaniel.com/</loc><lastmod>')
    expect(xml).toMatch(
      /<loc>https:\/\/lawrencemcdaniel.com\/<\/loc>.*?<priority>1.0<\/priority>/
    )
    expect(xml).toMatch(
      /<loc>https:\/\/lawrencemcdaniel.com\/qr<\/loc>.*?<priority>0.5<\/priority>/
    )
    expect(xml).toContain('<changefreq>monthly</changefreq>')
    expect(priorities['/consulting']).toBe(0.9)
    // the skill pages, whose paths come from APP_CONFIG.skills.
    for (const page of ['/cloud', '/data-science', '/full-stack', '/openedx', '/react']) {
      expect(priorities[page]).toBe(0.8)
    }
  })

  it('rejects when the file cannot be written', async () => {
    await expect(main(join(dir, 'missing', 'sitemap.xml'))).rejects.toThrow()
  })
})
