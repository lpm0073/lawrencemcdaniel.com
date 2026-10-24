/**
 * The interface between the build's prerender script (prerender.ts, which
 * Node runs) and the bundle of render.tsx that it loads. Both import these
 * types; neither imports the other's code.
 */

export interface PrerenderOptions {
  /** build/index.html, as Vite wrote it. */
  template: string
  /** the paths to render, e.g. '/' and '/smarter'. */
  routes: readonly string[]
  /** where the site's /data/ files are fetched from, e.g. https://lawrencemcdaniel.com */
  dataOrigin: string
}

export interface PrerenderedPage {
  /** the page's path, e.g. '/smarter'. */
  path: string
  /** the complete html document. */
  html: string
}

export interface PrerenderedPost {
  /** the post's page, e.g. '/portfolio/rest-api-for-open-edx'. */
  path: string
  /** when the post was last modified, ISO 8601, if WordPress says. */
  lastmod?: string
}

export interface PrerenderResult {
  /** every page, routes first, then the portfolio's detail pages. */
  pages: PrerenderedPage[]
  /** the portfolio's detail pages, for the sitemap. */
  posts: PrerenderedPost[]
  /** the page for urls that match no page, served with a 404 status. */
  notFound: string
  /** the data sources that failed to load, as sentences. Empty when all loaded. */
  errors: string[]
}

export type Prerender = (options: PrerenderOptions) => Promise<PrerenderResult>
