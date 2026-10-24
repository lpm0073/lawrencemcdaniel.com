/**
 * Vite configuration of the prerender bundle: src/prerender/render.tsx, which
 * renders the site's pages to html, built for Node into build-ssr/render.js.
 * `yarn build` builds it after the site, then runs src/prerender/prerender.ts,
 * which loads it.
 *
 * Every dependency is bundled (ssr.noExternal), because several of them, e.g.
 * react-bootstrap, publish ES modules that Node itself can't import.
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  ssr: {
    noExternal: true,
  },
  build: {
    ssr: 'src/prerender/render.tsx',
    outDir: 'build-ssr',
    emptyOutDir: true,
    rollupOptions: {
      output: { entryFileNames: 'render.js' },
    },
  },
})
