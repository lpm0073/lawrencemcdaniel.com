// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { http, HttpResponse } from 'msw'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../../../test/server.ts'
import {
  BLOG_SOURCES,
  blogApiHeaders,
  fetchBlogCategories,
  fetchBlogPosts,
  main,
  ogImage,
} from './blogPostFetcher.ts'

const CATEGORIES = 'https://blog.lawrencemcdaniel.com/wp-json/wp/v2/categories'
const POSTS = 'https://blog.lawrencemcdaniel.com/wp-json/wp/v2/posts'
const SMARTER_CATEGORIES = 'https://blog.smarter.sh/wp-json/wp/v2/categories'
const SMARTER_POSTS = 'https://blog.smarter.sh/wp-json/wp/v2/posts'

const smarterCategories = [
  { id: 4, name: 'Announcements', slug: 'announcements' },
  { id: 6, name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
]

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

  it('leaves out the posts of an excluded category', async () => {
    const story = {
      ...post,
      id: 1,
      link: 'https://blog.smarter.sh/story/',
      categories: [6],
    }
    const release = {
      ...post,
      id: 2,
      link: 'https://blog.smarter.sh/v1/',
      categories: [4, 6],
    }
    server.use(http.get(SMARTER_POSTS, () => HttpResponse.json([story, release])))

    const result = await fetchBlogPosts(smarterCategories, SMARTER_POSTS, [
      'announcements',
    ])

    expect(result.map((article) => article.id)).toEqual([1])
    expect(result[0].categories).toEqual(['artificial-intelligence'])
  })

  it('uses the featured image when yoast has no og_image', async () => {
    const featured = {
      ...post,
      yoast_head_json: { ...post.yoast_head_json, og_image: undefined },
      _embedded: {
        'wp:featuredmedia': [
          {
            source_url: 'https://blog/featured.png',
            mime_type: 'image/png',
            media_details: { width: 800, height: 400 },
          },
        ],
      },
    }
    server.use(http.get(POSTS, () => HttpResponse.json([featured])))

    const [result] = await fetchBlogPosts([])

    expect(result.yoast_head_json.og_image).toEqual([
      { width: 800, height: 400, url: 'https://blog/featured.png', type: 'image/png' },
    ])
  })

  it('returns [] for an error status or a network error', async () => {
    server.use(http.get(POSTS, () => new HttpResponse(null, { status: 404 })))
    expect(await fetchBlogPosts([])).toEqual([])

    server.use(http.get(POSTS, () => HttpResponse.error()))
    expect(await fetchBlogPosts([])).toEqual([])
  })
})

describe('ogImage', () => {
  const base = { ...post, yoast_head_json: { ...post.yoast_head_json, og_image: [] } }

  it('prefers the yoast og_image', () => {
    expect(ogImage(post)).toEqual(post.yoast_head_json.og_image)
  })

  it('keeps yoast when there is no featured image either', () => {
    expect(ogImage(base)).toEqual([])
    expect(ogImage({ ...base, _embedded: { 'wp:featuredmedia': [{}] } })).toEqual([])
  })

  it('gives a featured image without sizes a size of 0', () => {
    const media = { source_url: 'https://blog/f.jpg' }
    expect(ogImage({ ...base, _embedded: { 'wp:featuredmedia': [media] } })).toEqual([
      { width: 0, height: 0, url: 'https://blog/f.jpg', type: undefined },
    ])
  })
})

describe('BLOG_SOURCES', () => {
  it('lists this blog, and the Smarter blog without its release announcements', () => {
    expect(BLOG_SOURCES.map((source) => source.name)).toEqual([
      'blog.lawrencemcdaniel.com',
      'blog.smarter.sh',
    ])
    expect(BLOG_SOURCES[1].postsUrl).toContain(
      'https://blog.smarter.sh/wp-json/wp/v2/posts'
    )
    expect(BLOG_SOURCES[1].excludeCategories).toEqual(['announcements'])
    expect(BLOG_SOURCES[1].addCategories).toEqual(['smarter'])
    expect(BLOG_SOURCES[0].addCategories).toEqual([])
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

  it('writes the articles of every blog', async () => {
    const story = {
      ...post,
      id: 372,
      link: 'https://blog.smarter.sh/story/',
      categories: [6],
    }
    const release = {
      ...post,
      id: 366,
      link: 'https://blog.smarter.sh/v1/',
      categories: [4],
    }
    server.use(
      http.get(CATEGORIES, () => HttpResponse.json(categories)),
      http.get(POSTS, () => HttpResponse.json([post])),
      http.get(SMARTER_CATEGORIES, () => HttpResponse.json(smarterCategories)),
      http.get(SMARTER_POSTS, () => HttpResponse.json([story, release]))
    )
    const outputPath = join(dir, 'blog.json')

    await main(outputPath)

    const written = JSON.parse(readFileSync(outputPath, 'utf8')) as {
      id: number
      categories: string[]
    }[]
    expect(written.map((article) => article.id)).toEqual([5909, 372])
    // every Smarter post gets the 'smarter' category; this blog's posts get none
    expect(written[0].categories).toEqual(['aws', 'reactjs'])
    expect(written[1].categories).toEqual(['artificial-intelligence', 'smarter'])
  })

  it('exits 1, writing nothing, when one blog has no articles', async () => {
    server.use(
      http.get(CATEGORIES, () => HttpResponse.json(categories)),
      http.get(POSTS, () => HttpResponse.json([post])),
      http.get(SMARTER_CATEGORIES, () => HttpResponse.json(smarterCategories)),
      http.get(SMARTER_POSTS, () => new HttpResponse(null, { status: 500 }))
    )
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`exit ${code}`)
    })

    await expect(main(join(dir, 'blog.json'))).rejects.toThrow('exit 1')
    expect(console.error).toHaveBeenCalledWith('No articles found on blog.smarter.sh.')
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
