import { describe, expect, it } from 'vitest'

import { makeArticle, makeMedia, makePost } from '../../test/fixtures'
import { articleHost, articleTitle } from './articleTitle'
import { getCategories } from './categories'
import { getSemanticVersion } from './getSemanticVersion'
import { shuffleArray } from './shuffle'
import { convertToSlug } from './slug'
import { titleCase } from './titleCase'
import { wpGetFeaturedImage } from './wpGetFeaturedImage'

describe('wpGetFeaturedImage', () => {
  it('prefers the requested size', () => {
    expect(wpGetFeaturedImage(makePost(), 'medium')).toBe(
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'
    )
  })

  it('falls back to the original image, then to the object itself', () => {
    const noSizes = makePost({
      _embedded: { 'wp:featuredmedia': [makeMedia({ media_details: {} })] },
    })
    expect(wpGetFeaturedImage(noSizes, 'thumbnail')).toBe(
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo.webp'
    )
    expect(wpGetFeaturedImage({ source_url: 'https://example.com/a.png' })).toBe(
      'https://example.com/a.png'
    )
  })

  it('returns null when there is no image', () => {
    expect(wpGetFeaturedImage(makePost({ _embedded: undefined }))).toBeNull()
    expect(wpGetFeaturedImage(null)).toBeNull()
  })
})

describe('articleHost', () => {
  it("gives the article's blog, or nothing for a bad link", () => {
    expect(articleHost(makeArticle({ link: 'https://blog.smarter.sh/x/' }))).toBe(
      'blog.smarter.sh'
    )
    expect(articleHost(makeArticle({ link: 'not a url' }))).toBe('')
  })
})

describe('articleTitle', () => {
  it("decodes the title and drops its blog's name", () => {
    const titled = (title: string) => makeArticle({ yoast_head_json: { title } })
    expect(articleTitle(titled('MySQL &amp; Nginx - The Smarter Project'))).toBe(
      'MySQL & Nginx'
    )
    expect(articleTitle(titled('ChatGPT Full Stack - Blog'))).toBe('ChatGPT Full Stack')
    expect(articleTitle(titled('A - B'))).toBe('A - B')
    expect(articleTitle(makeArticle({ yoast_head_json: undefined }))).toBe('')
  })
})

describe('getCategories', () => {
  it('maps tags to the site skill pages', () => {
    expect(getCategories(['docker']).sort()).toEqual(['cloud', 'full-stack'])
    expect(getCategories('openai')).toEqual(['data-science'])
    expect(getCategories(['react', 'reactjs'])).toEqual(['react'])
  })

  it("maps blog.smarter.sh's categories", () => {
    expect(getCategories(['artificial-intelligence'])).toEqual(['data-science'])
    expect(getCategories(['system-management'])).toEqual(['cloud'])
    expect(getCategories(['how-to'])).toEqual([])
    expect(getCategories(['smarter'])).toEqual(['full-stack'])
  })

  it('returns nothing for missing or unknown tags', () => {
    expect(getCategories(undefined)).toEqual([])
    expect(getCategories(['cooking'])).toEqual([])
  })
})

describe('string helpers', () => {
  it('converts text to a slug', () => {
    expect(convertToSlug('Open edX Consulting!')).toBe('open-edx-consulting')
  })

  it('title-cases text', () => {
    expect(titleCase('full STACK developer')).toBe('Full Stack Developer')
  })

  it('strips prerelease suffixes from the version', () => {
    expect(getSemanticVersion()).toMatch(/^\d+\.\d+\.\d+$/)
  })
})

describe('shuffleArray', () => {
  it('returns a shuffled copy with the same elements', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(original)
    expect(shuffled).not.toBe(original)
    expect([...shuffled].sort()).toEqual(original)
    expect(original).toEqual([1, 2, 3, 4, 5])
  })
})

describe('getCategories, tag by tag', () => {
  it.each([
    ['full-stack', ['full-stack']],
    ['full stack', ['full-stack']],
    ['wordpress', ['full-stack']],
    ['data science', ['data-science']],
    ['gpt-4', ['data-science']],
    ['chatgpt', ['data-science']],
    ['edx', ['openedx']],
    ['open edx', ['openedx']],
    ['pypi', ['full-stack']],
    ['django', ['full-stack']],
    ['ci/cd', ['full-stack']],
    ['dev-ops', ['full-stack']],
    ['devops', ['full-stack']],
    ['12-factor', ['full-stack']],
    ['react.js', ['react']],
    ['amazon web services', ['cloud']],
    ['kubernetes', ['cloud']],
    ['terraform', ['cloud']],
    ['serverless', ['cloud']],
    ['microservices', ['cloud']],
  ])('%s', (tag, skills) => {
    expect(getCategories([tag])).toEqual(skills)
  })

  it('ignores tags of the wrong type', () => {
    expect(getCategories(42 as unknown as string)).toEqual([])
  })
})
