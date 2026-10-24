/**
 * Types for the data the site loads: WordPress REST API posts and media
 * (api.lawrencemcdaniel.com), and the JSON files in public/data/ that the
 * fetchers in src/shared/fetchers/ write.
 *
 * They are inferred from the runtime schemas in src/schemas.ts, which the API
 * layer (src/redux/api.ts) validates every response with. To change a type,
 * change its schema.
 */
import type { z } from 'zod'

import type {
  ArticleSchema,
  RepositoryLanguageSchema,
  RepositorySchema,
  VideoSchema,
  VideoThumbnailSchema,
  WPImageSizeSchema,
  WPMediaSchema,
  WPPostSchema,
  WPRenderedSchema,
  WPTagSchema,
} from './schemas.ts'

export type WPRendered = z.infer<typeof WPRenderedSchema>
export type WPImageSize = z.infer<typeof WPImageSizeSchema>
export type WPMedia = z.infer<typeof WPMediaSchema>
export type WPTag = z.infer<typeof WPTagSchema>

export type WPPost = z.infer<typeof WPPostSchema> & {
  /** Tag names, added by the getSpecialties endpoint. */
  skills?: (string | null)[]
}

/** Anything wpGetFeaturedImage() can find an image url in. */
export type WPImageSource = Partial<Pick<WPPost, '_embedded'>> & {
  source_url?: string
}

/** A blog post in public/data/blog.lawrencemcdaniel.com.json. */
export type Article = z.infer<typeof ArticleSchema> & {
  /** Skill slugs, added by the getArticles endpoint. */
  skills: string[]
}

export type RepositoryLanguage = z.infer<typeof RepositoryLanguageSchema>

/** A GitHub repository in public/data/github.json. */
export type Repository = z.infer<typeof RepositorySchema>

export type VideoThumbnail = z.infer<typeof VideoThumbnailSchema>

/** A YouTube video in public/data/youtube.json. */
export type Video = z.infer<typeof VideoSchema> & {
  /** Skill slugs, added by the getVideos endpoint. */
  skills: string[]
}
