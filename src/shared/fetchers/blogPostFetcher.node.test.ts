// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { http, HttpResponse } from 'msw'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../../../test/server.ts'
import {
  blogApiHeaders,
  fetchBlogCategories,
  fetchBlogPosts,
  main,
} from './blogPostFetcher.ts'

const CATEGORIES = 'https://blog.lawrencemcdaniel.com/wp-json/wp/v2/categories'
const POSTS = 'https://blog.lawrencemcdaniel.com/wp-json/wp/v2/posts'

const categories = [
  { id: 1, name: 'AWS', slug: 'aws', count: 3 },
  { id: 2, name: 'React', slug: 'reactjs', count: 1 },
]

const post = {
  id: 5909,
  modified_gmt: '2023-10-24T15:52:53',
  slug: 'chatgpt',
  status: 'publish',
  type: 'post',
  link: 'https://blog.lawrencemcdaniel.com/chatgpt/',
  excerpt: { rendered: '<p>Build it.</p>', protected: false },
  author: 3,
  featured_media: 5981,
  categories: [1, 2, 99],
  tags: [7],
  content: { rendered: 'not copied' },
  yoast_head_json: {
    title: 'Title',
    description: 'Description',
    canonical: 'https://blog.lawrencemcdaniel.com/chatgpt/',
    og_locale: 'en_US',
    og_type: 'article',
    og_title: 'OG Title',
    og_description: 'OG Description',
    og_url: 'https://blog.lawrencemcdaniel.com/chatgpt/',
    article_modified_time: '2023-10-24T15:52:53+00:00',
    og_image: [{ width: 1, height: 2, url: 'https://x/y.png', type: 'image/png' }],
    schema: 'not copied',
  },
  _links: {
    self: [{ href: 'not copied' }],
    'wp:featuredmedia': [{ embeddable: true, href: 'https://blog/media/5981' }],
  },
}

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('blogApiHeaders', () => {
  it('asks for json', () => {
    expect(blogApiHeaders()).toEqual({ Accept: 'application/json' })
  })
})

describe('fetchBlogCategories', () => {
  it('returns id, name and slug of each category', async () => {
    server.use(http.get(CATEGORIES, () => HttpResponse.json(categories)))

    expect(await fetchBlogCategories()).toEqual([
      { id: 1, name: 'AWS', slug: 'aws' },
      { id: 2, name: 'React', slug: 'reactjs' },
    ])
  })

  it('returns [] for an error status', async () => {
    server.use(http.get(CATEGORIES, () => new HttpResponse(null, { status: 500 })))

    expect(await fetchBlogCategories()).toEqual([])
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching Wordpress blog categories: Not Found'
    )
  })

  it('returns [] for a response that is not a list', async () => {
    server.use(http.get(CATEGORIES, () => HttpResponse.json({ code: 'oops' })))

    expect(await fetchBlogCategories()).toEqual([])
  })
})

describe('fetchBlogPosts', () => {
  it('keeps the listed fields and maps category ids to slugs', async () => {
    server.use(http.get(POSTS, () => HttpResponse.json([post])))

    const [result] = await fetchBlogPosts([
      { id: 1, name: 'AWS', slug: 'aws' },
      { id: 2, name: 'React', slug: 'reactjs' },
    ])

    expect(result.categories).toEqual(['aws', 'reactjs'])
    expect(result.tags).toEqual([7])
    expect(result._links).toEqual([{ embeddable: true, href: 'https://blog/media/5981' }])
    expect(result.yoast_head_json).not.toHaveProperty('schema')
    expect(result.yoast_head_json.og_title).toBe('OG Title')
    expect(result).not.toHaveProperty('content')
  })

  it('tolerates a post without yoast data or links', async () => {
    const { yoast_head_json: _y, _links: _l, ...bare } = post
    server.use(http.get(POSTS, () => HttpResponse.json([bare])))

    const [result] = await fetchBlogPosts([])

    expect(result.categories).toEqual([])
    expect(result.yoast_head_json.title).toBeUndefined()
    expect(result._links).toBeUndefined()
  })

  it('returns [] for an error status or a network error', async () => {
    server.use(http.get(POSTS, () => new HttpResponse(null, { status: 404 })))
    expect(await fetchBlogPosts([])).toEqual([])

    server.use(http.get(POSTS, () => HttpResponse.error()))
    expect(await fetchBlogPosts([])).toEqual([])
  })
})

describe('main', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'blog-fetcher-test-'))
  })
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('writes the articles', async () => {
    server.use(
      http.get(CATEGORIES, () => HttpResponse.json(categories)),
      http.get(POSTS, () => HttpResponse.json([post]))
    )
    const outputPath = join(dir, 'blog.json')

    await main(outputPath)

    const written = JSON.parse(readFileSync(outputPath, 'utf8')) as { id: number }[]
    expect(written.map((article) => article.id)).toEqual([5909])
  })

  it('exits 1 when there are no articles', async () => {
    server.use(
      http.get(CATEGORIES, () => HttpResponse.json([])),
      http.get(POSTS, () => HttpResponse.json([]))
    )
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`exit ${code}`)
    })

    await expect(main(join(dir, 'blog.json'))).rejects.toThrow('exit 1')
  })
})
