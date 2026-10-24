---
name: lawrencemcdaniel-development
description: Start here for any change to the lawrencemcdaniel.com React site - a new or changed page, route, header menu item, component, Redux data source, WordPress API call, fetcher, service worker cache, the build-time prerender, or build setting. Gives the rules, the architecture (Vite, strict TypeScript, RTK Query with zod-validated responses, react-router, every page prerendered to html and hydrated, Workbox via vite-plugin-pwa), the checklists for adding a page and a data source, how to verify a change, and an index of the narrower lawrencemcdaniel-* skills.
---

# lawrencemcdaniel.com Development

## Rules

1. **Never deploy.** Don't run `make build`, `make update`,
   `gh workflow run`, or any `aws` command. `make build` runs `make update`,
   which syncs `public/data/` to the production S3 bucket and invalidates
   CloudFront. Only `.github/workflows/deploy.yml` deploys the site, on every
   merge to `main`. Use `yarn build` or `make site` to check
   that the site builds.
2. **Never run git write commands.** See `lawrencemcdaniel-git-commits`.
3. **Pattern first.** Before writing something new, find the nearest existing
   example and copy its shape: a page in `src/pages/`, an endpoint in
   `src/redux/api.ts`. Newer code that is
   consistent with the rest of the codebase wins over this skill.
4. **Strict TypeScript, current style.** No `any`; data types come from the
   schemas in `src/schemas.ts` (see `lawrencemcdaniel-code-quality`). Read data
   with the hooks in `src/redux/hooks.ts`, never `connect()`. No new state
   library, no CSS framework other than Bootstrap 5 / React Bootstrap. Don't
   refactor class components into hooks unless asked.
5. **Test and verify before you report.** New code comes with tests, and
   coverage stays above 95% (`lawrencemcdaniel-react-testing`). Run
   `make test` and `yarn build`, and, for anything visible, look at the page
   in the running dev server.

## Architecture

```
src/main.tsx   Redux <Provider>, <Online>/<Offline> wrappers → <App cls="online|offline">;
               hydrates a prerendered page, after seeding the store with its data
src/App.tsx    <Head/> (site-wide Helmet), <BrowserRouter> (<StaticRouter> in the
               prerender, App's location prop), trailing-slash redirect,
               <Header/>, service-worker update alerts, <SiteRoutes/>, <Footer/>
src/components/Routes.tsx
               every route, with no props; dispatches prefetchSiteData() once, so
               every page's data (and images) load when the app starts
src/pages/<page>/Component.tsx
               reads its data with the hooks in src/redux/hooks.ts;
               <PageMeta> (canonical, description, preview image), <Helmet> (JSON-LD)
               + <main className="site-page ...">
src/prerender/ the last step of `yarn build`: renders every page to html, with its
               data, into build/ (see src/prerender/README.md)
```

- **Every page is prerendered.** `yarn build` ends with `yarn prerender`, which
  renders each route, each portfolio project and the 404 page in Node, with the
  live data, into `build/<path>/index.html`. Crawlers and link previews read
  that html; the browser hydrates it. So code that runs during render must work
  in Node (no `window`, `document` or `DOMParser`: use
  `src/shared/htmlFragments.ts`), and a page's first render must not depend on
  chance or the clock (shuffle after mounting). A hydration mismatch shows as
  "Minified React error #418" in the console of `yarn preview`. The build needs
  the network, and fails if a data source fails. `src/redux/README.md` explains
  the data side.

- **Data flow.** All of the site's data comes from one RTK Query API,
  `src/redux/api.ts` (`siteApi`), with one endpoint per source. Every
  endpoint fetches with `validatedQuery()`, which validates the response with
  its zod schema from `src/schemas.ts`; a response that doesn't match fails
  the query with an error naming the field, instead of reaching the page as
  blank fields. The WordPress endpoints then prefetch their featured images
  (`imagePreFetcher()`, CDN images only). Components read data with the hooks
  in `src/redux/hooks.ts` (`useSpecialties()`, `useClients()`, ...), which
  return `{ isLoading, errMess, data }`, `data` empty until loaded. Pages
  render `<Loading/>` while `isLoading`, and show `errMess`.
- **Types come from the schemas.** `src/types.ts` infers every data type from
  `src/schemas.ts`. To read a new field, declare it in the schema first:
  parsing drops undeclared fields.
- **Query data is frozen.** Never mutate it (in-place `sort`, `push`, property
  assignment): copy first. Mutating throws at runtime.
- **UI state** that must outlive a page is the only other Redux state:
  `src/redux/uiSlice.ts` remembers which entry animations have played (so they
  play once per session) and the logo cube's faces.
- **Sources.** WordPress posts by category id, from `APP_CONFIG.apis` in
  `src/shared/constants.ts`, and the static JSON files in `public/data/`
  (`github.json`, `youtube.json`, `blog.lawrencemcdaniel.com.json`).
- **Fetchers** (`src/shared/fetchers/{githubRepo,blogPost,youtube}Fetcher.ts`) are Node scripts, not
  browser code. They regenerate `public/data/` using keys from `.env`. CI runs
  them weekly (`.github/workflows/updateDataStores.yml`). `public/data/` is
  git-ignored. Running a fetcher locally (`node src/shared/fetchers/githubRepoFetcher.ts`)
  is safe; it only writes local files, but it spends API quota, so ask first.
- **Cache names** include the package version (`versioned_cached()` in
  `constants.ts`), so each release starts with fresh caches.
  `src/service-worker.ts` precaches the build (vite-plugin-pwa injects the
  list; see `vite.config.ts`) and registers runtime routes. The service
  worker is registered only in production builds: check it with
  `yarn build && yarn preview`.
- **Offline.** The service worker fetches pages from the network first and keeps
  a copy of each one visited, caches the API's and `/data/`'s responses
  (stale-while-revalidate) and the CDN's images (cache-first). The header of
  `src/service-worker.ts` says why.

## Adding a page

1. `src/pages/<name>/Component.tsx`, `styles.css` and `Component.test.tsx`, copied from a similar
   page (e.g. `src/pages/react/`); read its data with the hooks. Wrap content in
   `<main className="site-page <name>-page" aria-label="...">`, and use
   `RenderPageTitle` for the heading.
2. A route in `src/components/Routes.tsx`, and a case in `Routes.test.tsx`. If the slug is a skill page, add it to
   `APP_CONFIG.skills` and use `'/' + APP_CONFIG.skills.<key>` everywhere.
3. A menu item in `src/components/header/Component.tsx`, if it should be in the
   nav (`Nav.Link as={NavLink}`, matching its neighbours).
4. The route in `src/components/sitemap/generator.ts` (`routes` and
   `priorities`), then `yarn sitemap`.
5. SEO: `<PageMeta>` (canonical link, description, preview image) and the
   JSON-LD graph. Load `lawrencemcdaniel-seo`.
6. `yarn build`, `yarn preview` in the background, and check the page's html
   with `curl localhost:3000/<route>` and its console for React error #418.

## Adding a data source

1. The url in `APP_CONFIG.apis`.
2. A schema in `src/schemas.ts` with only the fields the site reads, checked
   against the live response, and its type in `src/types.ts`.
3. An endpoint in `src/redux/api.ts` using `validatedQuery()` (copy
   `getRepositories`), added to `prefetchSiteData()`.
4. A hook in `src/redux/hooks.ts`, and handlers in `test/handlers.ts`
   (`serveSiteData`).
5. If the data should work offline, check that `src/service-worker.ts` has a
   runtime route that covers its host.

## Verifying a change

```console
make test                                    # Prettier, ESLint, tsc, Vitest with coverage
yarn build                                   # must end with "prerender: wrote N pages, 404.html and sitemap.xml"
```

For a visible change, start `yarn start` with `run_in_background: true`, poll
`curl -s -o /dev/null -w '%{http_code}' localhost:3000/<route>` for 200, then
look at the page (a browser tool if one is available). Stop the server when
you're done. The service worker is off in development, so cache and offline
behaviour, and the prerendered pages, can only be checked in a production build
(`yarn build`, then `yarn preview` in the background, which serves each page as
CloudFront does).

## Checking a deploy

The `gh` CLI on the host is often not logged in (`HTTP 401: Bad credentials`).
Don't ask the user to run `gh auth login`: the git-ignored `.env` holds
`GH_TOKEN` and `GITHUB_TOKEN`. Load one for the command, and never print it:

```console
export GH_TOKEN=$(grep -E '^GH_TOKEN=' .env | cut -d= -f2- | tr -d '"')
gh run list --workflow=deploy.yml -L 3
```

When a deploy succeeded but "the site is unchanged", check what is live before
suspecting the pipeline: `curl -sI https://lawrencemcdaniel.com/` (its
`last-modified` is the upload time), and the hashed bundle that `index.html`
names under `/static/`. Each page is its own S3 key (`smarter`, uploaded from
`build/smarter/index.html`), so `curl -s https://lawrencemcdaniel.com/<route> | grep -o '<title[^<]*'`
shows whether a page is live. Until the CloudFront error responses of
`cloudfront/README.md` are set up, unknown paths return the home page with a
200, so compare bodies, not status codes. If the live files are new,
the browser is showing the previous service worker's cache; a hard reload, or
closing every tab of the site, lets the new worker take over.

## Skill index

| Skill                            | Use it when                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `lawrencemcdaniel-seo`           | A page's Helmet tags, JSON-LD structured data, or the sitemap     |
| `lawrencemcdaniel-react-testing` | Writing or running Vitest / React Testing Library tests, coverage |
| `lawrencemcdaniel-code-quality`  | Before finishing: TypeScript, ESLint, Prettier, pre-commit        |
| `lawrencemcdaniel-git-commits`   | You've been asked to write a commit message                       |
