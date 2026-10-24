/**
 * Runtime schemas (zod) for the data the site loads: the WordPress REST API
 * (api.lawrencemcdaniel.com) and the JSON files in public/data/ that the
 * fetchers in src/shared/fetchers/ write. src/types.ts derives the site's
 * TypeScript types from them, so the types and the checks can't drift apart.
 *
 * The RTK Query endpoints in src/redux/api.ts validate every response with
 * these. A response that doesn't match fails its query with an error that
 * names the field, instead of reaching the pages as blank fields.
 *
 * - Only the fields the site reads are declared, and parsing drops the rest,
 *   so a type never claims more than its schema checked. Reading an
 *   undeclared field is a type error: declare it here first.
 * - Each schema was checked against the live API and data files.
 */
import { z } from 'zod'

/** A WordPress field that holds rendered HTML, e.g. post.title.rendered. */
export const WPRenderedSchema = z.object({
  rendered: z.string(),
  protected: z.boolean().optional(),
})

export const WPImageSizeSchema = z.object({
  file: z.string().optional(),
  width: z.number(),
  height: z.number(),
  mime_type: z.string().optional(),
  source_url: z.string(),
})

/** A WordPress media item, e.g. post._embedded['wp:featuredmedia'][0]. */
export const WPMediaSchema = z.object({
  id: z.number(),
  slug: z.string().optional(),
  link: z.string().optional(),
  modified: z.string().optional(),
  alt_text: z.string().optional(),
  caption: WPRenderedSchema.optional(),
  title: WPRenderedSchema.optional(),
  description: WPRenderedSchema.optional(),
  media_type: z.string().optional(),
  mime_type: z.string().optional(),
  media_details: z
    .object({
      width: z.number().optional(),
      height: z.number().optional(),
      file: z.string().optional(),
      sizes: z.record(z.string(), WPImageSizeSchema.optional()).optional(),
    })
    .optional(),
  source_url: z.string(),
})

/**
 * Advanced Custom Fields. WordPress sends an empty array, not an object, for a
 * post that has none, so that becomes {}, and null for a field without a
 * value, which becomes undefined. Field names are lower case, e.g.
 * acf.applicationcategory on a specialty, acf.institution on a course.
 */
export const WPAcfSchema = z.preprocess(
  (value) => (Array.isArray(value) && value.length === 0 ? {} : value),
  // a field without a value is null, which becomes undefined: pages treat both as missing.
  z.record(
    z.string(),
    z
      .string()
      .nullable()
      .optional()
      .transform((value) => value ?? undefined)
  )
)

/** A WordPress post, as returned by /wp-json/wp/v2/posts?_embed. */
export const WPPostSchema = z.object({
  id: z.number(),
  date: z.string().optional(),
  modified: z.string().optional(),
  slug: z.string(),
  link: z.string().optional(),
  title: WPRenderedSchema,
  content: WPRenderedSchema,
  excerpt: WPRenderedSchema,
  categories: z.array(z.number()),
  tags: z.array(z.number()),
  featured_media: z.number().optional(),
  // a featured image that WordPress can't return is an error object, not media.
  _embedded: z
    .object({
      'wp:featuredmedia': z.array(z.union([WPMediaSchema, z.object({})])).optional(),
    })
    .optional(),
  acf: WPAcfSchema.optional(),
})

export const WPTagSchema = z.object({
  id: z.number(),
  name: z.string(),
})

/** A blog post in public/data/blog.lawrencemcdaniel.com.json. */
export const ArticleSchema = z.object({
  id: z.number(),
  modified_gmt: z.string().optional(),
  slug: z.string(),
  link: z.string(),
  excerpt: WPRenderedSchema,
  title: WPRenderedSchema.optional(),
  categories: z.array(z.string()),
  // WordPress tag ids, from the blog's own API.
  tags: z.array(z.union([z.number(), z.string()])),
  featured_media: z.number().optional(),
  yoast_head_json: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      og_title: z.string().optional(),
      og_description: z.string().optional(),
      og_image: z
        .array(
          z.object({
            width: z.number(),
            height: z.number(),
            url: z.string(),
            type: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
})

export const RepositoryLanguageSchema = z.object({
  name: z.string(),
  bytes: z.number(),
  // the fetcher writes a string such as "98.5", and 0 for a repository without code.
  percentage: z.union([z.string(), z.number()]),
})

/** A GitHub repository in public/data/github.json. */
export const RepositorySchema = z.object({
  name: z.string(),
  html_url: z.string(),
  private: z.boolean().optional(),
  description: z.string().nullable(),
  visibility: z.string().optional(),
  forks: z.number(),
  open_issues: z.number(),
  watchers: z.number(),
  stargazers_count: z.number(),
  topics: z.array(z.string()),
  skills: z.array(z.string()),
  last_commit_date: z.string().nullable(),
  total_commits: z.number().nullable(),
  languages: z.array(RepositoryLanguageSchema),
  readme: z.object({ content: z.string() }).nullable().optional(),
})

export const VideoThumbnailSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

/** A YouTube video in public/data/youtube.json. */
export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  thumbnails: z.record(z.string(), VideoThumbnailSchema.optional()),
  tags: z.array(z.string()),
  duration: z.string(),
  viewCount: z.number(),
  likeCount: z.number(),
  commentCount: z.number(),
  url: z.string(),
})
