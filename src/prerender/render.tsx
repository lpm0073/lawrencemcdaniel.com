/**
 * The site, rendered to html at build time: the entry point of the bundle
 * that vite.prerender.config.ts builds, which prerender.ts runs in Node.
 *
 * Every page is rendered with its data, so that crawlers and link previews
 * (WhatsApp, Facebook, LinkedIn, Slack, X, search engines, AI crawlers), none
 * of which run the site's JavaScript, read the page's own title, description,
 * preview image, structured data and content. Each page embeds the data it
 * shows (snapshot.ts), and main.tsx seeds the store with it, so that React
 * hydrates the html instead of replacing it.
 */
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'

import App from '../App'
import {
  prefetchSiteData,
  queryErrorMessage,
  SITE_ENDPOINTS,
  siteApi,
  type SiteDataSnapshot,
  type SiteEndpoint,
} from '../redux/api'
import { setDataOrigin } from '../redux/cachedBaseQuery'
import { ConfigureStore, type AppStore } from '../redux/configureStore'
import { RenderedEndpoints } from '../redux/renderedEndpoints'
import { snapshotScript } from './snapshot'
import type { Prerender, PrerenderedPost } from './types'

/** Where index.html takes the page's head tags. */
export const HEAD_PLACEHOLDER = '<!--app-head-->'
/** Where index.html takes the page's html, inside <div id="root">. */
export const HTML_PLACEHOLDER = '<!--app-html-->'
/** A path that no route matches, which renders the 404 page. */
export const NOT_FOUND_PATH = '/404'

/** Load every data source into store. Returns the ones that failed, as sentences. */
export async function loadSiteData(store: AppStore): Promise<string[]> {
  store.dispatch(prefetchSiteData())
  await Promise.all(store.dispatch(siteApi.util.getRunningQueriesThunk()))
  const state = store.getState()
  return SITE_ENDPOINTS.flatMap((endpoint) => {
    const message = queryErrorMessage(siteApi.endpoints[endpoint].select()(state).error)
    return message ? [`${endpoint}: ${message}`] : []
  })
}

/** The portfolio's detail pages, one per project. */
export function portfolioPosts(store: AppStore): PrerenderedPost[] {
  const posts = siteApi.endpoints.getPortfolio.select()(store.getState()).data ?? []
  return posts.map((post) => ({
    path: '/portfolio/' + post.slug,
    ...(post.modified ? { lastmod: post.modified } : {}),
  }))
}

/** The data of endpoints, from store. */
function snapshotOf(
  store: AppStore,
  endpoints: ReadonlySet<SiteEndpoint>
): SiteDataSnapshot {
  const state = store.getState()
  return Object.fromEntries(
    [...endpoints].flatMap((endpoint) => {
      const data = siteApi.endpoints[endpoint].select()(state).data
      return data === undefined ? [] : [[endpoint, data]]
    })
  ) as SiteDataSnapshot
}

/** The html document of the page at path, rendered with store's data. */
export function renderPage(template: string, path: string, store: AppStore): string {
  const endpoints = new Set<SiteEndpoint>()
  const html = renderToString(
    <RenderedEndpoints.Provider value={endpoints}>
      <Provider store={store}>
        <App cls="online" location={path} />
      </Provider>
    </RenderedEndpoints.Provider>
  )
  // also resets Helmet's state for the next page.
  const head = Helmet.renderStatic()
  const headTags = [head.title, head.meta, head.link, head.script]
    .map((tags) => tags.toString())
    .join('')

  // replacer functions, so that a "$" in the content is never a replacement pattern.
  return template
    .replace(HEAD_PLACEHOLDER, () => headTags)
    .replace(HTML_PLACEHOLDER, () => html)
    .replace('</body>', () => snapshotScript(snapshotOf(store, endpoints)) + '</body>')
}

/** Render every page of the site: routes, the portfolio's detail pages and the 404 page. */
export const prerenderSite: Prerender = async ({ template, routes, dataOrigin }) => {
  for (const placeholder of [HEAD_PLACEHOLDER, HTML_PLACEHOLDER, '</body>']) {
    if (!template.includes(placeholder)) {
      throw new Error(`prerenderSite(): the template has no ${placeholder}`)
    }
  }
  setDataOrigin(dataOrigin)
  const store = ConfigureStore()
  const errors = await loadSiteData(store)
  const posts = portfolioPosts(store)
  const paths = [...routes, ...posts.map((post) => post.path)]

  const result = {
    pages: paths.map((path) => ({ path, html: renderPage(template, path, store) })),
    posts,
    notFound: renderPage(template, NOT_FOUND_PATH, store),
    errors,
  }
  // The data was prefetched, so nothing subscribes to it, and RTK Query holds a
  // timer per endpoint to drop it after keepUnusedDataFor (24 hours). Those
  // timers keep Node running long after the pages are written; resetting the
  // api's state clears them.
  store.dispatch(siteApi.util.resetApiState())
  return result
}
