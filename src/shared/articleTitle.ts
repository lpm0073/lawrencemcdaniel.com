import type { Article } from '../types'
import { decodeEntities } from './htmlFragments'

/** The blog names that Yoast appends to every title, e.g. "Title - Blog". */
const BLOG_TITLE_SUFFIX = / - (Blog|The Smarter Project)$/

/** The host of the article's blog, e.g. 'blog.smarter.sh', or '' for a malformed link. */
export function articleHost(article: Article): string {
  try {
    return new URL(article.link).host
  } catch {
    return ''
  }
}

/** The article's title, decoded, without its blog's name. */
export function articleTitle(article: Article): string {
  return decodeEntities(article.yoast_head_json?.title ?? '').replace(
    BLOG_TITLE_SUFFIX,
    ''
  )
}
