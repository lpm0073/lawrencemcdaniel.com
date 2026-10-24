import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  register,
  resetForTests,
  UPDATE_CHECK_MINUTES,
  type ServiceWorkerCallbacks,
} from './serviceWorkerRegistration'

type Listener = (event: { isUpdate?: boolean }) => void

/** A stand-in for workbox-window's Workbox, whose events the tests fire. */
const fake = vi.hoisted(() => {
  const state = {
    instances: [] as {
      url: string
      listeners: Map<string, ((event: { isUpdate?: boolean }) => void)[]>
      register: ReturnType<typeof vi.fn>
      update: ReturnType<typeof vi.fn>
      messageSkipWaiting: ReturnType<typeof vi.fn>
    }[],
    registerFails: false,
  }
  return state
})

vi.mock('workbox-window', () => ({
  Workbox: class {
    url: string
    listeners = new Map<string, Listener[]>()
    register = vi.fn(async () =>
      fake.registerFails ? Promise.reject(new Error('no')) : undefined
    )
    update = vi.fn(async () => undefined)
    messageSkipWaiting = vi.fn()
    constructor(url: string) {
      this.url = url
      fake.instances.push(this)
    }
    addEventListener(type: string, listener: Listener) {
      this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener])
    }
  },
}))

/** Fire a Workbox event, as the browser's service worker life cycle would. */
function fire(type: string, event: { isUpdate?: boolean } = {}) {
  const wb = fake.instances[0]
  for (const listener of wb.listeners.get(type) ?? []) listener(event)
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubEnv('PROD', true)
  fake.instances.length = 0
  fake.registerFails = false
  resetForTests()
  Object.defineProperty(navigator, 'serviceWorker', { value: {}, configurable: true })
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllEnvs()
})

describe('register', () => {
  it('does nothing outside a production build', () => {
    vi.stubEnv('PROD', false)
    expect(register()).toBeUndefined()
    expect(fake.instances).toHaveLength(0)
  })

  it('registers the service worker once, and reports to the latest callbacks', () => {
    const first = { onOfflineReady: vi.fn() }
    const second = { onOfflineReady: vi.fn() }
    register(first)
    register(second)

    expect(fake.instances).toHaveLength(1)
    expect(fake.instances[0].url).toBe('/service-worker.js')
    expect(fake.instances[0].register).toHaveBeenCalledTimes(1)

    fire('installed', { isUpdate: false })
    expect(first.onOfflineReady).not.toHaveBeenCalled()
    expect(second.onOfflineReady).toHaveBeenCalledTimes(1)
  })

  it('reports offline-ready only for the first install', () => {
    const callbacks = { onOfflineReady: vi.fn() }
    register(callbacks)
    fire('installed', { isUpdate: true })
    expect(callbacks.onOfflineReady).not.toHaveBeenCalled()
  })

  it('hands a waiting update an activate function that sends SKIP_WAITING', () => {
    let activate: (() => void) | undefined
    const callbacks: ServiceWorkerCallbacks = {
      onUpdateReady: (fn) => {
        activate = fn
      },
    }
    register(callbacks)

    fire('waiting')
    expect(fake.instances[0].messageSkipWaiting).not.toHaveBeenCalled()
    activate?.()
    expect(fake.instances[0].messageSkipWaiting).toHaveBeenCalledTimes(1)
  })

  it('reports an update only once the new worker controls the page', () => {
    const callbacks = { onUpdated: vi.fn() }
    register(callbacks)

    // the first install also takes control (clientsClaim), which isn't an update.
    fire('controlling', { isUpdate: false })
    expect(callbacks.onUpdated).not.toHaveBeenCalled()
    fire('controlling', { isUpdate: true })
    expect(callbacks.onUpdated).toHaveBeenCalledTimes(1)
  })

  it('works without callbacks', () => {
    register()
    expect(() => {
      fire('installed', { isUpdate: false })
      fire('waiting')
      fire('controlling', { isUpdate: true })
    }).not.toThrow()
  })

  it('checks for a new release now and then, only from a visible tab that is online', () => {
    register()
    const wb = fake.instances[0]
    const period = UPDATE_CHECK_MINUTES * 60 * 1000

    vi.advanceTimersByTime(period)
    expect(wb.update).toHaveBeenCalledTimes(1)

    const online = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    vi.advanceTimersByTime(period)
    expect(wb.update).toHaveBeenCalledTimes(1)
    online.mockRestore()

    const hidden = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
    vi.advanceTimersByTime(period)
    expect(wb.update).toHaveBeenCalledTimes(1)
    hidden.mockRestore()
  })

  it('logs a failed registration', async () => {
    fake.registerFails = true
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    register()
    await vi.waitFor(() =>
      expect(error).toHaveBeenCalledWith(
        'Error during service worker registration:',
        expect.any(Error)
      )
    )
    error.mockRestore()
  })
})
