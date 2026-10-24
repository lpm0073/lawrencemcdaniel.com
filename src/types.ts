/**
 * Types for the data the site loads: WordPress REST API posts and media
 * (api.lawrencemcdaniel.com), and the JSON files in public/data/ that the
 * fetchers in src/shared/fetchers/ write.
 *
 * Only the fields the site reads are declared. The APIs return more.
 */

/** A WordPress field that holds rendered HTML, e.g. post.title.rendered. */
export interface WPRendered {
  rendered: string
  protected?: boolean
}

export interface WPImageSize {
  file?: string
  width: number
  height: number
  mime_type?: string
  source_url: string
}

/** A WordPress media item, e.g. post._embedded['wp:featuredmedia'][0]. */
export interface WPMedia {
  id: number
  slug?: string
  link?: string
  modified?: string
  alt_text?: string
  caption?: WPRendered
  title?: WPRendered
  description?: WPRendered
  media_type?: string
  mime_type?: string
  media_details?: {
    width?: number
    height?: number
    file?: string
    sizes?: Record<string, WPImageSize | undefined>
  }
  source_url: string
}

/** A WordPress post, as returned by /wp-json/wp/v2/posts?_embed. */
export interface WPPost {
  id: number
  date?: string
  modified?: string
  slug: string
  link?: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  categories: number[]
  tags: number[]
  featured_media?: number
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[]
  }
  /** Advanced Custom Fields, e.g. acf.url on a specialty, acf.institution on a course. */
  acf?: Record<string, string | undefined>
  /** Tag names, added by fetchSpecialties(). */
  skills?: (string | null)[]
}

export interface WPTag {
  id: number
  name: string
}

/** Anything wpGetFeaturedImage() can find an image url in. */
export type WPImageSource = Partial<Pick<WPPost, '_embedded'>> & {
  source_url?: string
}

/** A blog post in public/data/blog.lawrencemcdaniel.com.json. */
export interface Article {
  id: number
  modified_gmt?: string
  slug: string
  link: string
  excerpt: WPRendered
  title?: WPRendered
  categories: string[]
  tags: string[]
  featured_media?: number
  yoast_head_json?: {
    title?: string
    description?: string
    og_title?: string
    og_description?: string
    og_image?: { width: number; height: number; url: string; type?: string }[]
    [key: string]: unknown
  }
  /** Skill slugs, added by fetchArticles(). */
  skills: string[]
}

export interface RepositoryLanguage {
  name: string
  bytes: number
  percentage: string
}

/** A GitHub repository in public/data/github.json. */
export interface Repository {
  name: string
  html_url: string
  private?: boolean
  description: string | null
  visibility?: string
  forks: number
  open_issues: number
  watchers: number
  stargazers_count: number
  topics: string[]
  skills: string[]
  last_commit_date: string
  total_commits: number
  languages: RepositoryLanguage[]
  readme?: { content: string; [key: string]: unknown }
}

export interface VideoThumbnail {
  url: string
  width: number
  height: number
}

/** A YouTube video in public/data/youtube.json. */
export interface Video {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnails: Record<string, VideoThumbnail | undefined>
  tags: string[]
  duration: string
  viewCount: number
  likeCount: number
  commentCount: number
  url: string
  /** Skill slugs, added by fetchVideos(). */
  skills: string[]
}
