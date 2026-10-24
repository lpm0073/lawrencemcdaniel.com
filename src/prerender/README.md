# src/prerender

The last step of `yarn build`: every page of the site, rendered to html with
its data, written into `build/`.

## The problem

The site is a React app. Without this step, every url returns the same empty
html file, and the page exists only after its JavaScript has run and its data
has loaded. Google runs JavaScript, late and not always. Nothing else does:
WhatsApp, Facebook, LinkedIn, Slack and X build their link previews from the
html alone, and so do Bing and the AI crawlers (GPTBot, ClaudeBot,
PerplexityBot). They all saw a page with no title, no description, no preview
image and no content.

## What it does

`yarn build` runs `vite build`, then `yarn prerender`:

1. `vite build -c vite.prerender.config.ts` bundles `render.tsx` for Node into
   `build-ssr/render.js`, with all of its dependencies.
2. `node src/prerender/prerender.ts` loads that bundle and calls
   `prerenderSite()`, which:
   - loads every data source once, as the browser does (`/data/` files from the
     live site, because `public/data/` is git-ignored and missing in CI),
   - renders each route of `src/components/sitemap/generator.ts`, the unlisted
     ones, every portfolio project and the 404 page, with
     `react-dom/server`, and collects each page's head tags with
     `Helmet.renderStatic()`,
   - puts them into `build/index.html` at `<!--app-head-->` and `<!--app-html-->`,
     and embeds the data the page showed (`snapshot.ts`).
3. `prerender.ts` writes `build/index.html`, `build/<path>/index.html`,
   `build/404.html` and `build/sitemap.xml`, which also lists the portfolio
   projects.

If a data source fails to load, the build fails and writes no page, rather
than publish pages that show search engines an error or a spinner.

In the browser, `src/main.tsx` finds the embedded data, seeds the store with
it and hydrates the page (see `src/redux/README.md`, problem 4).

## Files

| File           | Runs in    | What it does                                          |
| -------------- | ---------- | ----------------------------------------------------- |
| `render.tsx`   | the bundle | loads the data and renders the pages                  |
| `snapshot.ts`  | both       | embeds a page's data, and reads it back in `main.tsx` |
| `prerender.ts` | Node       | runs the bundle and writes the files                  |
| `types.ts`     | both       | the interface between `prerender.ts` and the bundle   |

## Keeping pages prerenderable

- Code that runs during render must not touch `window`, `document` or
  `DOMParser`. Read post html with `src/shared/htmlFragments.ts`.
- A page's first render must be the same in Node and in the browser: no
  shuffling, `Math.random()` or time zones in render (see `src/redux/README.md`).
- Head tags go through `<Helmet>` and `src/components/PageMeta.tsx`, never
  through effects, so that they are in the html.

To check a page, run `yarn build`, then `yarn preview` in the background, and
look at what a crawler gets:
`curl -s localhost:3000/smarter | grep -o '<title[^<]*'`.
