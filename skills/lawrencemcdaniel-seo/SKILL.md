---
name: lawrencemcdaniel-seo
description: Use when adding or changing a page's search or link-preview metadata on lawrencemcdaniel.com - PageMeta (canonical link, description, og and twitter tags, preview image), react-helmet titles, Google Structured Data / JSON-LD built from src/shared/seo/gsd*.ts (gsdGraph, gsdPersonLawrence, gsdArticle, gsdSkills, FAQ, services), the site-wide defaults in src/components/Head.tsx, the prerendered html that crawlers and WhatsApp/Facebook/LinkedIn previews read (src/prerender/), the sitemap, the redirects and 404s (cloudfront/), or why a link preview shows no image. Covers the patterns to copy and how to validate the output.
---

# lawrencemcdaniel.com SEO

Search visibility is the main reason the site exists, so every public page
carries the same things: a canonical link, a description, a preview image and
a JSON-LD graph. `src/shared/seo/README.md` lists what each `gsd*.ts` file
describes.

## Crawlers read the prerendered html

Link previews (WhatsApp, Facebook, LinkedIn, Slack, X), Bing and the AI
crawlers don't run JavaScript. They read the html that the build prerenders
for each page (`src/prerender/README.md`). So a page's head tags must come
from `<Helmet>` or `PageMeta` during render, never from an effect or after
data loads, and must not depend on the browser. Check them in the build, not
in the dev server:

```console
yarn build                                   # prerenders every page; needs the network
yarn preview                                 # in the background
curl -s localhost:3000/<route> | grep -oE '<title[^<]*|<meta[^>]*(og:|twitter:|description)[^>]*>|<link[^>]*canonical[^>]*>'
```

## Site-wide defaults

`src/components/Head.tsx` sets the base title, default description, keywords
(from `gsdGraph.ts`), the default preview image, the manifest, icons and other
`<meta>` tags. A page's own tags override any of them. There is no default
canonical link: each page names its own, and the 404 page has none.

## A page's head

Copy the shape from an existing page, e.g. `src/pages/smarter/Component.tsx`:

```tsx
const slug = 'smarter'           // the route without its "/": gsdGraph builds the page's url from it
const webpageName = '...'
const description = '...'
const primaryImageUrl = 'https://cdn.lawrencemcdaniel.com/...'
const person = { ...gsdPersonLawrenceMcDaniel, ...{ hasOccupation: hasOccupation } }
// a flat JsonLd[]: spread the builders that return lists, e.g. ...gsdSoftwareRepoList()
const graphExtraData = [person, gsdArticle(slug, description), ...]

<PageMeta path="/smarter" description={description} image={APP_CONFIG.static.images.share.smarter} />
<Helmet>
  <meta name="keywords" content="..." />
  <script type="application/ld+json">
    {JSON.stringify(gsdGraph(slug, webpageName, description, primaryImageUrl,
                             pageType, relatedLink, graphExtraData))}
  </script>
</Helmet>
<RenderPageTitle ... />          // the page's <title>, og:title and twitter:title
```

- `PageMeta` (`src/components/PageMeta.tsx`) writes the canonical link, `og:url`,
  the description as `description`, `og:description` and `twitter:description`,
  and the preview image as `og:image` (with its size and alt text) and
  `twitter:image`. Don't write those tags by hand in a page's `<Helmet>`.
- The canonical url has no trailing slash (`src/shared/pageUrl.ts`), and the
  JSON-LD's `url`s match it. `slug` must be the route itself: a slug that
  differs from the route makes the structured data name a page that doesn't exist.
- Preview images are listed in `APP_CONFIG.static.images.share`, served from
  `public/assets/images/share/`. WhatsApp shows no image over about 300 KB, so
  they are 1200x630 JPEGs of 90 to 130 KB. Make one with `sips` (resample, then
  crop or pad to 1200x630), look at it, and add it there with its size and alt
  text. Without one, a page gets Lawrence's portrait.
- A page whose title depends on its data (`src/pages/portfolioDetail/`) puts a
  second `<Helmet>` with its `<title>`, `og:title` and `twitter:title` after
  `RenderPageTitle`, because the last Helmet rendered wins.
- Build urls from `APP_CONFIG.urls` and `APP_CONFIG.skills`, never as literals,
  so the route, the canonical link and the sitemap can't drift apart.
- Put entities that other objects reference (the Person, the business) in
  `gsdPersonLawrence.ts` / `gsdLocalBusiness.ts` and refer to them by `@id`
  (`APP_CONFIG.schema.me`), rather than repeating their fields on each page.
- Keep the visible content and the structured data consistent. Google's
  guidelines penalise markup that describes content the page doesn't show.
- Images in JSON-LD should be absolute CDN urls.

## Sitemap

`src/components/sitemap/generator.ts` lists `routes` and their `priorities`
(keyed by path; use computed keys such as `[urlCloud]` for the skill pages),
and `unlistedRoutes`: pages that are prerendered but left out of the sitemap
(`/qr`, `/image-tagging`). Add every new public route to `routes` and
`priorities`, then run `yarn sitemap`, which rewrites `public/sitemap.xml`
(tracked in git, used by the dev server). The build writes the deployed
`build/sitemap.xml` itself, with every portfolio project added, and their
WordPress `modified` dates as `lastmod`. The routes have no `lastmod`, since
the date they last changed isn't known. Don't list redirects (`/full-bio`).
`public/robots.txt` points crawlers at the sitemap.

## Redirects, 404s and duplicate urls

A CloudFront Function (`cloudfront/viewer-request.js`) sends 301s from `www.`
to the bare domain, from a trailing slash to none, and from moved pages
(`/full-bio`) to their new url. Urls that match no file get `404.html` with a
404 status. `cloudfront/README.md` has the one-time commands that set this up,
which only the user runs. The client-side `TrailingSlashRedirect` in `App.tsx`
stays for the dev server.

## Validating

1. In tests: `test/pageHead.ts` reads react-helmet's head. `waitForCanonical(href)`
   checks the canonical link and returns the JSON-LD `@graph`; `metaContent(name)`
   reads a meta tag. Assert on the nodes that matter (see any
   `src/pages/*/Component.test.tsx`). `src/prerender/render.test.tsx` checks the
   prerendered html itself.
2. By hand: the `curl` above, on the build. Paste the `application/ld+json`
   script's contents into https://validator.schema.org/ or
   https://json-ld.org/playground/. After a deploy, the user can run
   https://search.google.com/test/rich-results on the live url, and refresh a
   link preview with https://developers.facebook.com/tools/debug/ (WhatsApp
   uses the same cache).
3. Check that the canonical link matches the route exactly.
4. Data that the JSON-LD reads from WordPress ACF fields (`post.acf.*`) only
   appears if the field group is exposed in the REST API; check with a GET of
   `https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=<id>&_fields=id,acf`.
   Education posts (category 44) return `acf: []` today.
