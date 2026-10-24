---
name: lawrencemcdaniel-seo
description: Use when adding or changing a page's search metadata on lawrencemcdaniel.com - react-helmet tags (title, canonical link, meta description, og tags), Google Structured Data / JSON-LD built from src/shared/seo/gsd*.ts (gsdGraph, gsdPersonLawrence, gsdArticle, gsdSkills, FAQ, services), the site-wide defaults in src/components/Head.tsx, the trailing-slash redirect, or public/sitemap.xml and its generator. Covers the patterns to copy and how to validate the output.
---

# lawrencemcdaniel.com SEO

Search visibility is the main reason the site exists, so every public page
carries the same three things: a canonical link, a description, and a JSON-LD
graph. `src/shared/seo/README.md` lists what each `gsd*.ts` file describes.

## Site-wide defaults

`src/components/Head.tsx` sets the base title, default description and keywords
(from `gsdGraph.ts`), the manifest, icons and other `<meta>` tags. A page's own
`<Helmet>` overrides any of them.

`App.tsx` strips trailing slashes (`TrailingSlashRedirect`) because Google Search
Console reported "Alternate page with proper canonical tag". Canonical urls
therefore never end in `/`, except the home page.

## A page's Helmet block

Copy the shape from an existing page, e.g. `src/pages/react/Component.tsx`:

```tsx
const slug = '...'               // used by gsdGraph / gsdArticle to build @id urls
const webpageName = '...'
const webpageDescription = '...'
const primaryImageUrl = 'https://cdn.lawrencemcdaniel.com/...'
const person = { ...gsdPersonLawrenceMcDaniel, ...{ hasOccupation: hasOccupation } }
// a flat JsonLd[]: spread the builders that return lists, e.g. ...gsdSoftwareRepoList()
const graphExtraData = [person, gsdArticle(slug, webpageDescription), ...]

<Helmet>
  <link rel="canonical" href={APP_CONFIG.urls.site + '/<route>'} />
  <meta name="description" content="..." />
  <meta property="og:description" content="..." />
  <script type="application/ld+json">
    {JSON.stringify(gsdGraph(slug, webpageName, webpageDescription, primaryImageUrl,
                             pageType, relatedLink, graphExtraData))}
  </script>
</Helmet>
```

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
(keyed by path; use computed keys such as `[urlCloud]` for the skill pages).
Add every new public route to both, then run `yarn sitemap`, which rewrites
`public/sitemap.xml` (tracked in git). Don't list redirects (`/full-bio`) or
`/portfolio/:id` detail pages unless the generator is extended to enumerate
them. `public/robots.txt` points crawlers at the sitemap.

## Validating

1. In tests: `test/pageHead.ts` reads react-helmet's head. `waitForCanonical(href)`
   checks the canonical link and returns the JSON-LD `@graph`; assert on the
   nodes that matter (see any `src/pages/*/Component.test.tsx`).
2. By hand: `yarn start` in the background, open the page, and paste the
   `application/ld+json` script's contents into https://validator.schema.org/
   or https://json-ld.org/playground/. After a deploy, the user can run
   https://search.google.com/test/rich-results on the live url.
3. Check that the canonical link matches the route exactly.
4. Data that the JSON-LD reads from WordPress ACF fields (`post.acf.*`) only
   appears if the field group is exposed in the REST API; check with a GET of
   `https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=<id>&_fields=id,acf`.
   Education posts (category 44) return `acf: []` today.
