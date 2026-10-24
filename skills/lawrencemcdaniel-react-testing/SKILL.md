---
name: lawrencemcdaniel-react-testing
description: Use when writing, fixing or running tests for the lawrencemcdaniel.com React site, or raising its coverage - Vitest with React Testing Library and jest-dom in jsdom, MSW for the WordPress and public/data requests, the in-memory Cache API in test/setup.ts, the fixtures, renderWithProviders and serveSiteData helpers in test/, testing the RTK Query endpoints and schema validation, components that load their own data, Helmet/JSON-LD, carousels, canvases and the service worker registration, and the Node-script tests (*.node.test.ts). Covers the commands, the conventions, the coverage target and the pitfalls.
---

# lawrencemcdaniel.com Testing

The stack follows the Smarter React workspace (smarter-sh/smarter,
`smarter/react/`): **Vitest** with **React Testing Library**, `user-event` and
jest-dom, in jsdom, and **MSW 2** for the network. Coverage must stay **above
95%** (statements and lines); CI uploads it to Codecov.

## Commands

```console
yarn test                                       # every test, once
yarn coverage                                   # with coverage: text summary + coverage/index.html
npx vitest run src/redux                        # one folder
npx vitest run -t "loads the repositories"      # one test by name
yarn test:watch                                 # watch mode: never returns, background only
```

## The setup (read before writing a test)

| File               | What it gives you                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `vitest.config.ts` | jsdom at http://localhost:3000/, `src/**/*.test.{ts,tsx}`, `NODE_ENV=test`, `TZ=UTC`, 15 s per test, coverage of all of `src/`                                                             |
| `test/setup.ts`    | jest-dom matchers; the MSW server with `onUnhandledRequest: 'error'`; relative `fetch()` and `new Request()` urls; an in-memory `window.caches` (jsdom has none), cleared after each test  |
| `test/server.ts`   | The MSW server. Add handlers with `server.use(...)`; they reset after each test                                                                                                            |
| `test/handlers.ts` | `serveSiteData({ specialties: [...], videos: 503, ... })`: MSW handlers serving those records (or an HTTP error), and one default record for the rest; `siteHandlers` serves only defaults |
| `test/fixtures.ts` | `makePost`, `makeMedia`, `makeArticle`, `makeRepository`, `makeVideo`, each taking overrides                                                                                               |
| `test/render.tsx`  | `renderWithProviders(ui, { preloadedState?, store?, route? })`: a Redux `<Provider>` and a `<MemoryRouter>`; returns render()'s result plus `store` and `user`                             |
| `test/pageHead.ts` | `helmetHead()`, `jsonLdGraph()`, `waitForCanonical(href)`, `metaContent(name)`: read react-helmet's head (canonical link, meta tags, JSON-LD) via `Helmet.peek()`                          |

## Conventions

- `Component.test.tsx` next to the component. Import `describe`, `it`,
  `expect`, `vi` from `vitest` (globals are off).
- Query the way a user perceives the page: `getByRole`, `findByRole`,
  `getByLabelText`, `getByText`. Every page title is a `heading` of level 1.
  Avoid test ids and class selectors; where there's no accessible
  alternative (a CSS background image, the layout's online/offline class), use
  a narrow `// eslint-disable-next-line testing-library/no-node-access`.
- Interact with `user` from `renderWithProviders` (or `userEvent.setup()`), not
  `fireEvent`.
- Mock the network with MSW, never by mocking `fetch`. Within one
  `server.use(a, b)`, the first matching handler wins; a later `server.use`
  takes precedence.
- **Give components data by serving it**, as the real API would:
  `server.use(...serveSiteData({ clients: [makePost()] }))`. Components load
  their own data (`src/redux/hooks.ts`), so don't preload the store with it.
  Serving it also runs the schemas. Data arrives asynchronously: use `findBy*`.
  Test errors by serving a status (`clients: 503`) and asserting the visible
  `errMess` ("Error 503"). Remount with the same `store` to test what a
  session remembers (entry animations, the logo cube).
- Anything that renders `SiteRoutes` or `App` loads every endpoint on mount:
  serve `siteHandlers`, and **wait until the data has loaded** before the test ends (see
  `renderRoute()` in `src/components/Routes.test.tsx`), or a request outlives
  the test and fails with "intercepted a request without a matching request
  handler".
- Assert on outcomes the user sees, not internal state.

## Patterns that already work here

- **Endpoints**: `const result = await store.dispatch(siteApi.endpoints.getX.initiate())`,
  then assert on `result.data` or `queryErrorMessage(result.error)`. See
  `src/redux/api.test.tsx`, which also tests schema failures.
- **Carousels** (react-multi-carousel) render no slides until the container
  has a width: `vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)`.
  Off-screen slides are `aria-hidden`, so query with `{ hidden: true }`.
- **Canvases** (skill columns, logo cube): jsdom has no 2D context. Stub
  `HTMLCanvasElement.prototype.getContext` with `vi.spyOn`.
- **react-mdr** (the Matrix rain on /react-mdr and the 404 page):
  `vi.mock('react-mdr', () => ({ MatrixRainingLetters: () => <canvas aria-label="Matrix rain" /> }))`.
- **Timers** (logo cube, update alerts): `vi.useFakeTimers()`, and advance them
  in small steps, each in its own `act()`; one big `act()` batches every update.
- **The service worker registration**: `vi.stubEnv('PROD', true)` and a fake
  `navigator.serviceWorker`; see `src/serviceWorkerRegistration.test.ts`. `App`
  tests mock `./serviceWorkerRegistration` and call the callbacks it was given.
- **Debug logging**: set `APP_CONFIG.debug = true` in the test and reset it in
  `afterEach`.

## Node-script tests

The fetchers, the sitemap generator, `dotenv.ts` and `updateVersion.ts` run in
Node. Their tests are `*.node.test.ts`, start with
`// @vitest-environment node`, and are type-checked by `tsconfig.node.json`
(not `tsconfig.app.json`). Each script exports a `main()` that runs only when
Node runs the file directly, so tests import it safely. Write to a temp
directory, never to `public/` or the real `package.json`, mock `../dotenv.ts`
so the real `.env` is never read, and spy on `process.exit`.

## Pitfalls

- **"Tests N passed" can hide a failing file.** When a file fails to load,
  Vitest still reports the other tests. Check the **"Test Files"** line.
- **Don't pipe test output straight into `grep`.** Save it to a file with
  `NO_COLOR=1`, then read the summary lines before reporting a result.
- **`NODE_ENV=production` in your shell** makes React load its production
  build and tests fail with "act is not supported". `vitest.config.ts` forces
  `test`; keep it.
- **Coverage includes `.md` files if you pass `--coverage.include='src/shared/seo/**'`**,
  which breaks the report. Use `seo/\*.ts`.
- **Query data is frozen.** A test (or component) that sorts or modifies it in
  place throws "Cannot assign to read only property": copy it first.
