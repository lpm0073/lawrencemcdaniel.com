/**
 * Vite configuration for lawrencemcdaniel.com.
 *
 * - React, with the production build written to build/ (which `make release`
 *   uploads to S3), and hashed js/css under build/static/ so they never mix
 *   with the images in public/assets/.
 * - The Workbox service worker in src/service-worker.ts, built by
 *   vite-plugin-pwa's injectManifest strategy, which fills in
 *   self.__WB_MANIFEST with the build's precache list. The app registers it
 *   itself (src/serviceWorkerRegistration.ts), and public/manifest.json is the
 *   web app manifest, so the plugin injects neither.
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        // the build's js, css and html, and the fonts that its css references,
        // as create-react-app's Workbox build did. The service worker adds the
        // images in public/ itself.
        globPatterns: ['*.html', 'static/**/*.{js,css,woff,woff2,ttf,eot,svg}'],
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
