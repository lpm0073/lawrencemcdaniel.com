# CLAUDE.md

Guidance for Claude Code (and other coding agents) working in this repository.

lawrencemcdaniel.com is Lawrence McDaniel's personal web site: a React 19
single-page app in strict TypeScript, built with Vite, with Redux for state,
react-router 7, React Bootstrap, and a Workbox service worker (built by
vite-plugin-pwa) that makes it a progressive web app. Most content comes from
WordPress REST APIs (api.lawrencemcdaniel.com, blog.lawrencemcdaniel.com) and
from JSON files in `public/data/` that the Node scripts in
`src/shared/fetchers/` regenerate. The build prerenders every page to html
with its data (`src/prerender/`), so that search engines and link previews,
which don't run JavaScript, see each page's content and tags; the browser then
hydrates it. The production build is hosted on AWS S3 behind CloudFront, and
every merge to `main` is tested and deployed by GitHub Actions.

The tooling follows the Smarter project's React workspace
(smarter-sh/smarter, `smarter/react/`): Vite, TypeScript, Vitest with React
Testing Library and MSW, ESLint flat config with typescript-eslint, Prettier.

Detailed know-how lives in the Agent Skills under `skills/` (symlinked to
`.claude/skills`). **Load `lawrencemcdaniel-development` first for any change.**
Its table says which narrower skill covers each kind of work. This file holds
only what applies to nearly every task.

## Hard rules

1. **Never run git write commands.** "Write a git commit" means print the
   command as text. Never run `git commit`, `git add`, `git reset`, `git push`
   or anything else that changes the index or history. Format and authorship
   are in `lawrencemcdaniel-git-commits`.
2. **Never deploy or write to production.** Don't run `make build`,
   `make update`, `gh workflow run`, or the `aws` CLI. `make build` calls
   `make update`, which uploads `public/data/` to the production S3 bucket and
   invalidates the CloudFront cache. Only `.github/workflows/deploy.yml`
   deploys the site, on every merge to `main`.
   To check that the site builds, run `yarn build` (or `make site`), which
   only writes the git-ignored `build/` folder.
3. **`yarn start` never returns.** It is the dev server on
   http://localhost:3000. Start it only with `run_in_background: true`, then
   poll `curl -s -o /dev/null -w '%{http_code}' localhost:3000/` for a 200.
   The same goes for `yarn preview` and `yarn test:watch`.
4. **`.env` holds live API keys** (`PAT` for GitHub, `YT` for YouTube, and the
   GitHub CLI's tokens), read by the fetchers. Never print, copy or commit its
   values. Tests must never read it or call the real APIs.
5. **This repository is public.** No API keys, tokens, account IDs or private
   data in code, docs or skills.
6. **Check before you finish.** `make test` (Prettier, ESLint, TypeScript,
   Vitest with coverage) must pass, as CI requires. Run the tests yourself;
   never ask the user to. See `lawrencemcdaniel-code-quality` and
   `lawrencemcdaniel-react-testing`.
7. **Strict TypeScript.** No `any`, no `@ts-ignore`, no unchecked non-null
   assertions. Data types are inferred from the zod schemas in
   `src/schemas.ts`; read data with the hooks in `src/redux/hooks.ts`. Match the existing code: class components stay classes,
   Prettier's settings are in `package.json` (no semicolons, single quotes, 90
   columns). Don't reformat code you weren't asked to change.
8. **Coverage stays above 95%** (statements and lines). New code comes with
   tests.

## Repository map

| Path                                 | Contents                                                                   |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `index.html`, `src/main.tsx`         | The page shell, Redux store, online/offline wrapper                        |
| `src/App.tsx`                        | Layout, service worker update alerts, trailing-slash redirect              |
| `src/components/`                    | Shared components; `Routes.tsx` holds every route and kicks off data loads |
| `src/pages/<page>/`                  | One folder per page: `Component.tsx`, `styles.css`, `Component.test.tsx`   |
| `src/redux/`                         | `api.ts` (RTK Query, every data source), `hooks.ts`, `uiSlice.ts`, store   |
| `src/prerender/`                     | The build's last step: every page rendered to html, with its data          |
| `src/schemas.ts`, `src/types.ts`     | zod schemas of the API's and `public/data/` records, and their types       |
| `src/shared/constants.ts`            | `APP_CONFIG`: API urls, cache names, skill slugs, site urls                |
| `src/shared/seo/`                    | Google Structured Data (JSON-LD) builders, `gsd*.ts`                       |
| `src/components/PageMeta.tsx`        | A page's canonical link, description and link-preview tags                 |
| `src/shared/fetchers/`               | `cachedFetch.ts` for the thunks; Node scripts that write `public/data/`    |
| `src/components/sitemap/`            | `generator.ts`, which writes `public/sitemap.xml` (`yarn sitemap`)         |
| `src/service-worker.ts`              | Workbox precaching and runtime caching routes                              |
| `test/`                              | Vitest setup, MSW server and handlers, fixtures, render helpers            |
| `vite.config.ts`, `vitest.config.ts` | Build (output in `build/`, assets in `build/static/`) and test config      |
| `vite.prerender.config.ts`           | The prerender's bundle, for Node, in `build-ssr/`                          |
| `cloudfront/`                        | The CloudFront Function (redirects) and the distribution's one-time setup  |
| `tsconfig.{app,sw,node}.json`        | Browser code, the service worker, and code that Node runs                  |
| `skills/`                            | Agent Skills for developing this repository                                |
| `.github/workflows/`                 | `test.yml` (PRs), `deploy.yml` (main), weekly data update, version bumps   |

## Commands

```console
yarn start           # dev server, http://localhost:3000 (background only)
yarn test            # Vitest, once
yarn coverage        # Vitest with coverage, report in coverage/
yarn lint            # ESLint (eslint.config.js)
yarn typecheck       # tsc -b, all three tsconfig projects
yarn format          # Prettier
yarn build           # typecheck, production build into build/, then prerender every
                     # page (fetches the live data; no upload)
yarn preview         # serve build/ as CloudFront does, with the service worker (background only)
yarn sitemap         # regenerate public/sitemap.xml
make test            # everything CI checks
```

## Branches and releases

Work happens on `alpha` and `next`. Merging to `main` runs `deploy.yml`:
the tests, then semantic-release (a GitHub release and `CHANGELOG.md` from the
conventional-commit messages), then the build and deploy to S3/CloudFront.
Never write a `chore(release)` commit.
