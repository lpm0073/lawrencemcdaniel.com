---
name: lawrencemcdaniel-development
description: Start here for any change to the lawrencemcdaniel.com React site - a new or changed page, route, header menu item, component, Redux data source, WordPress API call, fetcher, service worker cache, or build setting. Gives the rules, the architecture (Vite, strict TypeScript, Redux thunks with the Cache API, react-router, Workbox via vite-plugin-pwa), the checklists for adding a page and a data source, how to verify a change, and an index of the narrower lawrencemcdaniel-* skills.
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
   example and copy its shape: a page in `src/pages/`, a reducer in
   `src/redux/`, a thunk in `src/redux/actions/`. Newer code that is
   consistent with the rest of the codebase wins over this skill.
4. **Strict TypeScript, current style.** No `any`; types in `src/types.ts`
   and the reducers (see `lawrencemcdaniel-code-quality`). No new state
   library, no CSS framework other than Bootstrap 5 / React Bootstrap. Don't
   refactor class components into hooks unless asked.
5. **Test and verify before you report.** New code comes with tests, and
   coverage stays above 95% (`lawrencemcdaniel-react-testing`). Run
   `make test` and `yarn build`, and, for anything visible, look at the page
   in the running dev server.

## Architecture

```
src/main.tsx   Redux <Provider>, <Online>/<Offline> wrappers → <App cls="online|offline">
src/App.tsx    <Head/> (site-wide Helmet), <BrowserRouter>, trailing-slash redirect,
               <Header/>, service-worker update alerts, <SiteRoutes/>, <Footer/>
src/components/Routes.tsx
               connect()s the whole store, dispatches every fetch* thunk once in
               componentDidMount, and passes slices to pages as props
src/pages/<page>/Component.tsx
               <Helmet> (canonical, description, JSON-LD) + <main className="site-page ...">
```

- **Data flow.** Each data source has a reducer (`src/redux/<name>.ts`, which exports its state type), action
  types (`src/redux/ActionTypes.ts`, `ADD_X` / `X_LOADING` / `X_FAILED`) and a
  thunk (`src/redux/actions/<name>Actions.ts`). Thunks call `cachedFetchJson()`
  (`src/shared/fetchers/cachedFetch.ts`), which reads the browser Cache API
  first (`APP_CONFIG.caching.names.api`), otherwise fetches and caches the
  response. The WordPress thunks then cache each post's featured image with
  `imagePreFetcher()`; that is how the site prefetches the whole API. Reducer state is
  `{ isLoading, errMess, items, ... }`. Pages render `<Loading/>` while
  `isLoading`, and handle `errMess`.
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
- **Some components gate re-renders** to protect entry animations
  (`shouldComponentUpdate` in `Routes.tsx`, `isSet` flags in the
  `homePage`, `clientGrid`, `coursesGrid`, `aboutPage`, `logoCube` reducers).
  If a page stops updating, look there first.

## Adding a page

1. `src/pages/<name>/Component.tsx`, `styles.css` and `Component.test.tsx`, copied from a similar
   page (e.g. `src/pages/react/`). Wrap content in
   `<main className="site-page <name>-page" aria-label="...">`, and use
   `RenderPageTitle` for the heading.
2. A route in `src/components/Routes.tsx`, and a case in `Routes.test.tsx`. If the slug is a skill page, add it to
   `APP_CONFIG.skills` and use `'/' + APP_CONFIG.skills.<key>` everywhere.
3. A menu item in `src/components/header/Component.tsx`, if it should be in the
   nav (`Nav.Link as={NavLink}`, matching its neighbours).
4. The route in `src/components/sitemap/generator.ts` (`routes` and
   `priorities`), then `yarn sitemap`.
5. SEO: canonical link, description, `og:description` and the JSON-LD graph.
   Load `lawrencemcdaniel-seo`.

## Adding a data source

1. The url in `APP_CONFIG.apis`.
2. Three action types in `ActionTypes.ts`.
3. A reducer, registered in `combineReducers` in `src/redux/configureStore.ts`
   with a comment naming its source.
4. Its types in `src/types.ts`, and a thunk copied from
   `src/redux/actions/repositoriesActions.ts` (`cachedFetchJson()`), dispatched from `SiteRoutes.componentDidMount` and
   added to `mapDispatchToProps` and `propTypes`.
5. If the data should work offline, check that `src/service-worker.ts` has a
   runtime route that covers its host.

## Verifying a change

```console
make test                                    # Prettier, ESLint, tsc, Vitest with coverage
yarn build                                   # must end with the PWA precache summary
```

For a visible change, start `yarn start` with `run_in_background: true`, poll
`curl -s -o /dev/null -w '%{http_code}' localhost:3000/<route>` for 200, then
look at the page (a browser tool if one is available). Stop the server when
you're done. The service worker is off in development, so cache and offline
behaviour can only be checked in a production build (`npx serve -s build`).

## Skill index

| Skill                            | Use it when                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `lawrencemcdaniel-seo`           | A page's Helmet tags, JSON-LD structured data, or the sitemap     |
| `lawrencemcdaniel-react-testing` | Writing or running Vitest / React Testing Library tests, coverage |
| `lawrencemcdaniel-code-quality`  | Before finishing: TypeScript, ESLint, Prettier, pre-commit        |
| `lawrencemcdaniel-git-commits`   | You've been asked to write a commit message                       |
