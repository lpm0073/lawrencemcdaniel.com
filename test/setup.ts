/**
 * Vitest setup. See vitest.config.ts.
 *
 * - Adds jest-dom's matchers, e.g. expect(element).toBeInTheDocument().
 * - Starts the MSW server (test/server.ts), which fails any test that makes an unmocked request.
 * - Resolves relative fetch() and new Request() URLs against the page, as browsers do. Node
 *   rejects them, and the app requests relative URLs, e.g. /data/github.json (RTK Query's
 *   fetchBaseQuery builds a Request itself).
 * - Gives the window an in-memory Cache API (window.caches), which jsdom lacks and the API's
 *   data cache (src/redux/cachedBaseQuery.ts) and the image prefetcher use.
 * - Gives waitFor() and findBy*() 5 seconds instead of 1, for slow CI runners.
 *
 * Tests of the Node scripts (*.node.test.ts) run in Vitest's node environment, which has no
 * window, so the browser-only parts are skipped there.
 */
import '@testing-library/jest-dom/vitest'

import { cleanup, configure } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { resetRefreshed } from '../src/redux/cachedBaseQuery'
import { server } from './server'

configure({ asyncUtilTimeout: 5000 })

const isBrowser = typeof window !== 'undefined'

const NodeRequest = globalThis.Request
if (isBrowser) {
  globalThis.Request = class extends NodeRequest {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      super(
        typeof input === 'string' ? new URL(input, window.location.href) : input,
        init
      )
    }
  }
}

const nodeFetch = globalThis.fetch
if (isBrowser)
  globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) =>
    nodeFetch(
      typeof input === 'string' ? new URL(input, window.location.href) : input,
      init
    )

/** A minimal, in-memory stand-in for the browser's CacheStorage. */
class MemoryCache {
  private entries = new Map<string, Response>()

  private key(request: RequestInfo | URL): string {
    return typeof request === 'string'
      ? request
      : request instanceof URL
        ? request.href
        : request.url
  }

  async match(request: RequestInfo | URL): Promise<Response | undefined> {
    return this.entries.get(this.key(request))?.clone()
  }

  async put(request: RequestInfo | URL, response: Response): Promise<void> {
    this.entries.set(this.key(request), response.clone())
  }

  async delete(request: RequestInfo | URL): Promise<boolean> {
    return this.entries.delete(this.key(request))
  }
}

class MemoryCacheStorage {
  private caches = new Map<string, MemoryCache>()

  async open(name: string): Promise<MemoryCache> {
    let cache = this.caches.get(name)
    if (!cache) {
      cache = new MemoryCache()
      this.caches.set(name, cache)
    }
    return cache
  }

  async keys(): Promise<string[]> {
    return [...this.caches.keys()]
  }

  async delete(name: string): Promise<boolean> {
    return this.caches.delete(name)
  }

  clear(): void {
    this.caches.clear()
  }
}

const memoryCaches = new MemoryCacheStorage()
if (isBrowser) {
  Object.defineProperty(globalThis, 'caches', { value: memoryCaches, configurable: true })
}

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => {
  cleanup()
  server.resetHandlers()
  memoryCaches.clear()
  // each test starts a new page load, as far as src/redux/cachedBaseQuery.ts knows.
  resetRefreshed()
  if (isBrowser) {
    window.sessionStorage.clear()
    window.localStorage.clear()
  }
})
afterAll(() => server.close())
