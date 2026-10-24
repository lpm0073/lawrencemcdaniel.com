/**
 * Registers the service worker (src/service-worker.ts) with workbox-window, and
 * tells the app about its life cycle, so that it can show the visitor a notice:
 *
 * - onOfflineReady: the first install finished, so the site now works offline.
 * - onUpdateReady: a new release is installed and waiting. The app calls
 *   activate() to let it take over. Until then the open page keeps the release
 *   it loaded with, so it never mixes the two.
 * - onUpdated: the new release has taken over this page. A reload shows it.
 *
 * register() may run more than once: main.tsx mounts a new App when the
 * connection drops or returns. The worker is registered once, and its events go
 * to the callbacks of the latest call.
 *
 * It runs only in production builds; check it with `yarn build && yarn preview`.
 */
import { Workbox } from 'workbox-window'

/** How often an open page asks the server for a new release. */
export const UPDATE_CHECK_MINUTES = 60

export interface ServiceWorkerCallbacks {
  onOfflineReady?: () => void
  onUpdateReady?: (activate: () => void) => void
  onUpdated?: () => void
}

let workbox: Workbox | undefined
let callbacks: ServiceWorkerCallbacks = {}

export function register(newCallbacks: ServiceWorkerCallbacks = {}): Workbox | undefined {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return undefined
  callbacks = newCallbacks
  if (workbox) return workbox

  const wb = new Workbox(import.meta.env.BASE_URL + 'service-worker.js')
  workbox = wb

  wb.addEventListener('installed', (event) => {
    if (!event.isUpdate) callbacks.onOfflineReady?.()
  })
  wb.addEventListener('waiting', () => {
    callbacks.onUpdateReady?.(() => wb.messageSkipWaiting())
  })
  wb.addEventListener('controlling', (event) => {
    if (event.isUpdate) callbacks.onUpdated?.()
  })

  wb.register().catch((error: unknown) => {
    console.error('Error during service worker registration:', error)
  })

  // a visitor can keep the site open for days: look for a new release now and
  // then, but not from a hidden tab or without a connection.
  window.setInterval(
    () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        wb.update().catch(() => undefined)
      }
    },
    UPDATE_CHECK_MINUTES * 60 * 1000
  )

  return wb
}

/** Forget the registration, so that tests start from scratch. */
export function resetForTests() {
  workbox = undefined
  callbacks = {}
}
