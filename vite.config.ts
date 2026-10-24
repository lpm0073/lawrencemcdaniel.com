/**
 * Vite configuration for lawrencemcdaniel.com.
 *
 * - React, with the production build written to build/ (which the deploy
 *   uploads to S3), and hashed js/css under build/static/ so they never mix
 *   with the images in public/assets/.
 * - The Workbox service worker in src/service-worker.ts, built by
 *   vite-plugin-pwa's injectManifest strategy, which fills in
 *   self.__WB_MANIFEST with the build's precache list. The app registers it
 *   itself with workbox-window (src/serviceWorkerRegistration.ts), and public/manifest.json is the
 *   web app manifest, so the plugin injects neither.
 * - `yarn build` then prerenders every page into build/ (src/prerender/), and
 *   `yarn preview` serves those pages as production does (prerenderedPages).
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * `yarn preview` serves each prerendered page (build/<path>/index.html, see
 * src/prerender/) at /<path>, as S3 and CloudFront do.
 *
 * Without it, Vite answers /smarter with its fallback, index.html, which is
 * the prerendered home page. React would then hydrate the home page's html at
 * /smarter, fail (React error #418) and render the page again from scratch,
 * which production never does, and `curl localhost:3000/smarter` would show
 * the home page's title and link preview instead of the page's own.
 */
function prerenderedPages(): Plugin {
  return {
    name: 'prerendered-pages',
    configurePreviewServer(server) {
      server.middlewares.use((request, _response, next) => {
        const [path = '/', query] = (request.url ?? '/').split('?')
        const page = join('build', path, 'index.html')
        if (path !== '/' && !path.endsWith('/') && existsSync(page)) {
          request.url = path + '/index.html' + (query === undefined ? '' : '?' + query)
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    prerenderedPages(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        // the build's js, css and html, and the fonts that browsers use: every
        // browser that runs a service worker reads woff2, and fetches the
        // css's legacy formats (eot, svg, ttf: 775 KB of Font Awesome) never,
        // so precaching them only costs every visitor the download. Fonts with
        // no woff2 (react-multi-carousel's revicons) are fetched when used.
        // The service worker adds the images in public/assets/ itself.
        // The web app manifest and its icons are listed here, not there, so
        // that each gets a content hash and updates when it changes; an entry
        // with no revision is cached once and never fetched again. The sitemap,
        // robots.txt and package.json aren't precached: crawlers don't run the
        // service worker, and the app never fetches them.
        globPatterns: [
          '*.html',
          '{manifest.json,favicon.jpg,favicon-offline.jpg,logo192.jpg,logo512.jpg}',
          'static/**/*.{js,css,woff2}',
        ],
      },
    }),
  ],
  build: {
    outDir: 'build',
    assetsDir: 'static',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})
