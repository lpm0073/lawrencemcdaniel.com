import { http, HttpResponse } from 'msw'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '../test/server'
import { register, unregister } from './serviceWorkerRegistration'
import { serviceWorkerRegistrationEnhancements } from './serviceWorkerRegistrationEnhancements'
import { APP_CONFIG } from './shared/constants'

/** A ServiceWorker whose state the test changes, firing 'statechange' as a browser does. */
class FakeWorker extends EventTarget {
  state: ServiceWorkerState = 'installing'
  onstatechange: (() => void) | null = null

  setState(state: ServiceWorkerState) {
    this.state = state
    this.onstatechange?.()
    this.dispatchEvent(new Event('statechange'))
  }
}

/** A ServiceWorkerRegistration with a worker that is being installed. */
class FakeRegistration extends EventTarget {
  installing: FakeWorker | null = null
  waiting: FakeWorker | null = null
  active: FakeWorker | null = null
  onupdatefound: (() => void) | null = null
  update = vi.fn()
  unregister = vi.fn(async () => true)

  /** Start installing a new worker, as the browser does when it finds an update. */
  findUpdate(): FakeWorker {
    const worker = new FakeWorker()
    this.installing = worker
    this.onupdatefound?.()
    this.dispatchEvent(new Event('updatefound'))
    return worker
  }
}

let registration: FakeRegistration
let container: {
  controller: object | null
  register: ReturnType<typeof vi.fn>
  ready: Promise<FakeRegistration>
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout'] })
  vi.stubEnv('PROD', true)
  registration = new FakeRegistration()
  container = {
    controller: null,
    register: vi.fn(async () => registration),
    ready: Promise.resolve(registration),
  }
  Object.defineProperty(navigator, 'serviceWorker', {
    value: container,
    configurable: true,
  })
})

afterEach(() => {
  APP_CONFIG.debug = false
  vi.useRealTimers()
  vi.unstubAllEnvs()
  Reflect.deleteProperty(navigator, 'serviceWorker')
})

/** register(), then the page's load event, then let the promises settle. */
async function registerAndLoad(config?: Parameters<typeof register>[0]) {
  register(config)
  window.dispatchEvent(new Event('load'))
  await vi.waitFor(() => expect(container.register).toHaveBeenCalled())
  await Promise.resolve()
}

const javascript = () =>
  new HttpResponse('self.addEventListener()', {
    headers: { 'Content-Type': 'application/javascript' },
  })

describe('register', () => {
  it('does nothing outside a production build', () => {
    vi.stubEnv('PROD', false)
    register()
    window.dispatchEvent(new Event('load'))
    expect(container.register).not.toHaveBeenCalled()
  })

  it('checks, then registers, the service worker on localhost', async () => {
    server.use(http.get('*/service-worker.js', javascript))

    await registerAndLoad()

    expect(container.register).toHaveBeenCalledWith('/service-worker.js')
    // and polls for updates.
    expect(registration.update).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(15 * 60 * 1000)
    expect(registration.update).toHaveBeenCalledTimes(2)
  })

  it('calls onUpdate when a new version is installed over an old one', async () => {
    server.use(http.get('*/service-worker.js', javascript))
    const onUpdate = vi.fn()
    const onSuccess = vi.fn()
    await registerAndLoad({ onUpdate, onSuccess })
    container.controller = {}

    registration.findUpdate().setState('installed')

    expect(onUpdate).toHaveBeenCalledWith(registration)
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('calls onSuccess on the first install, and onActivated once active', async () => {
    server.use(http.get('*/service-worker.js', javascript))
    const onSuccess = vi.fn()
    const onActivated = vi.fn()
    await registerAndLoad({ onSuccess, onActivated })

    const worker = registration.findUpdate()
    worker.setState('installed')
    expect(onSuccess).toHaveBeenCalledWith(registration)
    expect(onActivated).not.toHaveBeenCalled()

    worker.setState('activated')
    expect(onActivated).toHaveBeenCalledWith(registration)
  })

  it('unregisters and reloads when the service worker is missing', async () => {
    server.use(
      http.get('*/service-worker.js', () => new HttpResponse(null, { status: 404 }))
    )
    const reload = vi.fn()
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      reload,
    })

    register()
    window.dispatchEvent(new Event('load'))

    await vi.waitFor(() => expect(reload).toHaveBeenCalled())
    expect(registration.unregister).toHaveBeenCalled()
    expect(container.register).not.toHaveBeenCalled()
  })

  it('logs an error when registration fails', async () => {
    server.use(http.get('*/service-worker.js', javascript))
    container.register.mockRejectedValueOnce(new Error('denied'))
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    register()
    window.dispatchEvent(new Event('load'))

    await vi.waitFor(() =>
      expect(error).toHaveBeenCalledWith(
        'Error during service worker registration:',
        expect.any(Error)
      )
    )
  })

  it('keeps running offline', async () => {
    server.use(http.get('*/service-worker.js', () => HttpResponse.error()))
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    register()
    window.dispatchEvent(new Event('load'))

    await vi.waitFor(() =>
      expect(log).toHaveBeenCalledWith(
        'No internet connection found. App is running in offline mode.'
      )
    )
  })
})

describe('unregister', () => {
  it('unregisters the active service worker', async () => {
    unregister()
    await vi.waitFor(() => expect(registration.unregister).toHaveBeenCalled())
  })
})

describe('edge cases', () => {
  it('logs each step in debug mode', async () => {
    APP_CONFIG.debug = true
    server.use(http.get('*/service-worker.js', javascript))
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    registration.active = new FakeWorker()
    registration.waiting = new FakeWorker()

    await registerAndLoad({ onActivated: vi.fn() })
    const worker = registration.findUpdate()
    worker.setState('installed')
    container.controller = {}
    registration.findUpdate().setState('installed')
    worker.setState('activated')
    await Promise.resolve()

    for (const message of [
      'service worker is registered',
      'service worker automatically checking for updates.',
      'activeWorker found',
      'newWaiting created',
      'updatefound event listener fired.',
      'invoking the onActivated callback.',
    ]) {
      expect(log).toHaveBeenCalledWith(message)
    }
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining('Content is cached for offline use.')
    )
    expect(log).toHaveBeenCalledWith(expect.stringContaining('New content is available'))
  })

  it('ignores an update that has no installing worker', async () => {
    server.use(http.get('*/service-worker.js', javascript))
    const onUpdate = vi.fn()
    await registerAndLoad({ onUpdate })

    registration.installing = null
    registration.onupdatefound?.()
    registration.dispatchEvent(new Event('updatefound'))

    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('warns about a registration that cannot check for updates', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const noUpdate = Object.assign(new FakeRegistration(), { update: undefined })

    serviceWorkerRegistrationEnhancements(
      undefined,
      noUpdate as unknown as ServiceWorkerRegistration
    )

    expect(log).toHaveBeenCalledWith(
      expect.stringContaining('registration has no update() function'),
      noUpdate
    )
  })

  it('logs a failure to unregister', async () => {
    container.ready = Promise.reject(new Error('no registration'))
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    unregister()

    await vi.waitFor(() => expect(error).toHaveBeenCalledWith('no registration'))
  })
})
