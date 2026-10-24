# src/redux

The site's state: every piece of data that the pages show, and the little UI
state that has to outlive a page. This folder exists to solve five problems.

## The problems

**1. WordPress is slow, and nothing caches it.** Most of the content comes from
the WordPress REST API at api.lawrencemcdaniel.com: specialties, clients,
recommendations, education, the portfolio. A request takes 1 to 3 seconds, and
took up to 12 before the queries asked for only the fields the site reads
(`POST_FIELDS` in `src/shared/constants.ts`). WP Rocket caches WordPress's
pages, not its REST API, so every request is computed from scratch. Several
pages show the same data, and a visitor shouldn't wait for it on every page.

_So_ all of the data goes through one RTK Query API (`api.ts`, `siteApi`), with
one endpoint per source. Each is fetched once per session and shared by every
page. `prefetchSiteData()` starts loading all of them when the app starts, so a
page's data is usually loaded before the page is visited.

**2. A response that changes shape shouldn't blank the page silently.** The data
comes from WordPress posts, ACF fields and JSON files that scripts write. When
one changes, a page used to render empty fields with no error anywhere.

_So_ every response is validated with its zod schema (`src/schemas.ts`) before it
reaches the store (`validatedQuery()`). One that doesn't match fails its query
with an error that names the field. The types in `src/types.ts` are inferred
from the same schemas, so the code can't read a field that isn't validated.

**3. Returning visitors shouldn't wait for WordPress at all.**

_So_ `cachedBaseQuery.ts` keeps every response in the browser's Cache API and
answers from that cache at once, then fetches the url again in the background
to refresh the cache for the next visit (stale-while-revalidate). The cache's
name includes the site's version, so each release starts empty.

**4. First-time visitors, search engines and link previews have no cache, and
the last two don't run JavaScript.** WhatsApp, Facebook, LinkedIn, Bing and the
AI crawlers read a page's html and nothing else.

_So_ the build renders every page to html with its data (`src/prerender/`), and
embeds in each page the data it shows. The hooks record which endpoints a
render reads (`RenderedEndpoints` in `renderedEndpoints.ts`), and only those
are embedded. In the browser, `main.tsx` puts that data in the store before
the first render (`seedSiteData()`), so the first render matches the page's
html and React hydrates it instead of replacing it. Then `refreshSiteData()`
fetches the same data again: from the visitor's cache when they have one, from
the network when they don't. The build's copy may be weeks old, and this way
nobody keeps it for long. `getSpecialties` is the exception: its logos are
shuffled when it loads, so refreshing it would reorder every logo on the page
moments after it appears.

**5. Some UI state must survive leaving a page.** Entry animations should play
on a page's first visit only, and the logo cube should keep its faces.

_So_ `uiSlice.ts` holds that, and nothing else. It is the only Redux state that
isn't data.

## Files

| File                   | What it does                                                            |
| ---------------------- | ----------------------------------------------------------------------- |
| `api.ts`               | `siteApi`: the endpoints, validation, prefetch, seed and refresh        |
| `cachedBaseQuery.ts`   | the fetching, with the browser's Cache API (problem 3)                  |
| `hooks.ts`             | one hook per data source, `{ isLoading, errMess, data }`, for the pages |
| `renderedEndpoints.ts` | the context in which the prerender records what a page reads            |
| `uiSlice.ts`           | entry animations and the logo cube (problem 5)                          |
| `configureStore.ts`    | the store, with redux-logger in development                             |

## Rules

- Pages read data with the hooks in `hooks.ts`, never with `connect()` or
  the RTK Query hooks directly. That is how the prerender knows what a page shows.
- Query data is frozen. Copy it before sorting or changing it.
- A page's first render must not depend on chance or on the clock: no shuffling
  or `new Date()` in render. Shuffle in `componentDidMount` or an effect, as
  `src/pages/clients/recommendationsCarousel.tsx` does. Otherwise the browser's
  first render differs from the prerendered html, and React redraws the page.
- To read a new field, declare it in its schema first. Parsing drops fields
  that aren't declared.
