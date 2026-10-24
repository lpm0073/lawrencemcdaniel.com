/*
 WordPress Api blog post downloader utility. Creates a list of json objects of blog post metadata by category,
 from every blog in BLOG_SOURCES: blog.lawrencemcdaniel.com, and blog.smarter.sh without its release
 announcements. A post without a Yoast og_image gets its featured image instead.

 example output:
   {
    "id": 5909,
    "modified_gmt": "2023-10-24T15:52:53",
    "slug": "chatgpt-full-stack-using-react-aws-serverless",
    "status": "publish",
    "type": "post",
    "link": "https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/",
    "excerpt": {
      "rendered": "<p>Build a custom ChatGPT web app in no time with this open source ready-for-production React + AWS Serverless scaffolding. This completely free, public GitHub repository includes Vite, Terraform, AWS API Gateway and AWS Lambda.</p>\n",
      "protected": false
    },
    "author": 3,
    "featured_media": 5981,
    "categories": [
      "aws",
      "reactjs"
    ],
    "tags": [],
    "yoast_head_json": {
      "title": "ChatGPT Full Stack Using React + AWS Serverless - Blog",
      "description": "Build a custom ChatGPT web app in no time with this open source ready-for-production React + AWS Serverless scaffolding.",
      "canonical": "https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/",
      "og_locale": "en_US",
      "og_type": "article",
      "og_title": "OpenAI API With AWS Lambda",
      "og_description": "A production-ready codebase implementing a REST API backed by OpenAI using AWS API Gateway, Lambda, and the OpenAI Python library.",
      "og_url": "https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/",
      "article_modified_time": "2023-10-24T15:52:53+00:00",
      "og_image": [
        {
          "width": 1508,
          "height": 820,
          "url": "https://blog.lawrencemcdaniel.com/wp-content/uploads/2023/09/openai-aws.png",
          "type": "image/png"
        }
      ]
    },
    "_links": [
      {
        "embeddable": true,
        "href": "https://blog.lawrencemcdaniel.com/wp-json/wp/v2/media/5981"
      }
    ]
  }
*/

import { writeFileSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

import { APP_CONFIG } from '../constants.ts'
import type { WPRendered } from '../../types.ts'

/** The fields this script reads from a /wp-json/wp/v2/categories item. */
interface WPBlogCategory {
  id: number
  name: string
  slug: string
}

interface YoastImage {
  width: number
  height: number
  url: string
  type?: string
}

interface YoastHeadJson {
  title?: string
  description?: string
  canonical?: string
  og_locale?: string
  og_type?: string
  og_title?: string
  og_description?: string
  og_url?: string
  article_modified_time?: string
  og_image?: YoastImage[]
}

interface WPLink {
  embeddable?: boolean
  href: string
}

/** The fields this script reads from a post's embedded wp:featuredmedia item. */
interface WPEmbeddedMedia {
  source_url?: string
  mime_type?: string
  media_details?: { width?: number; height?: number }
}

/** The fields this script reads from a /wp-json/wp/v2/posts item. */
interface WPBlogPost {
  id: number
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  excerpt: WPRendered
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  yoast_head_json?: YoastHeadJson
  _links?: Record<string, WPLink[] | undefined>
  _embedded?: { 'wp:featuredmedia'?: WPEmbeddedMedia[] }
}

/** A WordPress blog whose posts are listed as articles on this site. */
export interface BlogSource {
  /** for log messages, e.g. 'blog.smarter.sh' */
  name: string
  /** the blog's /wp-json/wp/v2/posts url */
  postsUrl: string
  /** the blog's /wp-json/wp/v2/categories url */
  categoriesUrl: string
  /** slugs of the categories whose posts are left out */
  excludeCategories: string[]
  /** category slugs added to every post, which src/shared/categories.ts maps to skills */
  addCategories: string[]
}

/** The blogs whose articles the site lists, in order. */
export const BLOG_SOURCES: BlogSource[] = [
  {
    name: 'blog.lawrencemcdaniel.com',
    postsUrl: APP_CONFIG.apis.blog_posts,
    categoriesUrl: APP_CONFIG.apis.blog_categories,
    excludeCategories: [],
    addCategories: [],
  },
  {
    // The Smarter Project's blog, without its release announcements.
    name: 'blog.smarter.sh',
    postsUrl: APP_CONFIG.apis.smarter_blog_posts,
    categoriesUrl: APP_CONFIG.apis.smarter_blog_categories,
    excludeCategories: ['announcements'],
    // Smarter is a Django and React platform, so every article is a full stack one.
    addCategories: ['smarter'],
  },
]

/**
 * One item of public/data/blog.lawrencemcdaniel.com.json, which holds every
 * blog's articles despite its name. Unlike Article in
 * src/types.ts, tags are still WordPress tag ids, and skills is added later
 * by the browser.
 */
interface BlogPostOutput {
  id: number
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  excerpt: WPRendered
  author: number
  featured_media: number
  categories: string[]
  tags: number[]
  yoast_head_json: YoastHeadJson
  _links: WPLink[] | undefined
}

/** Throws (caught by the caller's try/catch) unless the api returned a list. */
export function assertArray<T>(data: unknown, concept: string): asserts data is T[] {
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected response for ${concept}: not an array`)
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUTPUT_PATH = join(__dirname, '../../../public/data/blog.lawrencemcdaniel.com.json')

export function blogApiHeaders(): Record<string, string> {
  const headers = {
    Accept: 'application/json',
  }

  return headers
}

export async function fetchBlogCategories(
  url: string = APP_CONFIG.apis.blog_categories
): Promise<WPBlogCategory[]> {
  const concept = 'Wordpress blog categories'
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: blogApiHeaders(),
    })
    if (response.ok) {
      const repos: unknown = await response.json()
      assertArray<WPBlogCategory>(repos, concept)
      console.log(`Fetched ${repos.length} blog categories`)
      return repos.map((category) => {
        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
        }
      })
    } else {
      console.error(`Error fetching ${concept}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching ${concept}:`, error)
  }
  console.error(`Error fetching ${concept}: Not Found`)
  return []
}

/**
 * The post's Yoast og_image, or else its embedded featured image, so that every
 * article that has an image shows one.
 */
export function ogImage(post: WPBlogPost): YoastImage[] | undefined {
  if (post.yoast_head_json?.og_image?.length) return post.yoast_head_json.og_image
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (!media?.source_url) return post.yoast_head_json?.og_image
  return [
    {
      width: media.media_details?.width ?? 0,
      height: media.media_details?.height ?? 0,
      url: media.source_url,
      type: media.mime_type,
    },
  ]
}

export async function fetchBlogPosts(
  categories: WPBlogCategory[],
  url: string = APP_CONFIG.apis.blog_posts,
  excludeCategories: string[] = []
): Promise<BlogPostOutput[]> {
  const concept = 'Wordpress blog posts'

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: blogApiHeaders(),
    })
    if (response.ok) {
      const repos: unknown = await response.json()
      assertArray<WPBlogPost>(repos, concept)
      const excludedIds = categories
        .filter((category) => excludeCategories.includes(category.slug))
        .map((category) => category.id)
      return repos
        .filter((post) => !post.categories.some((id) => excludedIds.includes(id)))
        .map((post): BlogPostOutput => {
          return {
            id: post.id,
            modified_gmt: post.modified_gmt,
            slug: post.slug,
            status: post.status,
            type: post.type,
            link: post.link,
            excerpt: post.excerpt,
            author: post.author,
            featured_media: post.featured_media,
            categories: post.categories
              .map((categoryId) => {
                const category = categories.find((cat) => cat.id === categoryId)
                return category ? category.slug : null
              })
              .filter((slug): slug is string => Boolean(slug)),
            tags: post.tags,
            yoast_head_json: {
              title: post.yoast_head_json?.title,
              description: post.yoast_head_json?.description,
              canonical: post.yoast_head_json?.canonical,
              og_locale: post.yoast_head_json?.og_locale,
              og_type: post.yoast_head_json?.og_type,
              og_title: post.yoast_head_json?.og_title,
              og_description: post.yoast_head_json?.og_description,
              og_url: post.yoast_head_json?.og_url,
              article_modified_time: post.yoast_head_json?.article_modified_time,
              og_image: ogImage(post),
            },
            _links: post._links?.['wp:featuredmedia'],
          }
        })
    } else {
      console.error(`Error fetching ${concept}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching ${concept}:`, error)
  }
  console.error(`Error fetching ${concept}: Not Found`)
  return []
}

/**
 * Fetches every post of every blog in sources and writes them to outputPath
 * (public/data/blog.lawrencemcdaniel.com.json). Exits 1, writing nothing, when a
 * blog returns no articles, so that a failing blog never empties the site's list.
 */
export async function main(
  outputPath: string = OUTPUT_PATH,
  sources: BlogSource[] = BLOG_SOURCES
): Promise<void> {
  const articles: BlogPostOutput[] = []
  for (const source of sources) {
    const categories = await fetchBlogCategories(source.categoriesUrl)
    const posts = await fetchBlogPosts(
      categories,
      source.postsUrl,
      source.excludeCategories
    )
    if (posts.length === 0) {
      console.error(`No articles found on ${source.name}.`)
      process.exit(1)
    }
    console.log(`Found ${posts.length} articles on ${source.name}.`)
    articles.push(
      ...posts.map((post) => ({
        ...post,
        categories: [...post.categories, ...source.addCategories],
      }))
    )
  }

  console.log(`Found ${articles.length} articles.`)
  writeFileSync(outputPath, JSON.stringify(articles), 'utf8')
  console.log(`Articles written to ${outputPath}`)
}

// Run main() only when Node runs this file directly (node <file>.ts), not when a test imports it.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main()
