import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { siteHandlers } from '../test/handlers'
import { server } from '../test/server'
import App from './App'
import { ConfigureStore } from './redux/configureStore'
import type { ServiceWorkerConfig } from './serviceWorkerRegistration'
import { APP_CONFIG } from './shared/constants'

const registration = vi.hoisted(() => ({
  register: vi.fn<(config?: ServiceWorkerConfig) => void>(),
}))
vi.mock('./serviceWorkerRegistration', () => registration)

// the Matrix rain on the 404 page draws on a canvas, which jsdom lacks.
vi.mock('react-mdr', () => ({
  MatrixRainingLetters: () => <canvas aria-label="Matrix rain" />,
}))

/** Render the whole app, as main.tsx does, at a path. */
function renderApp(path = '/', cls: 'online' | 'offline' = 'online') {
  window.history.pushState({}, '', path)
  const store = ConfigureStore()
  const utils = render(
    <Provider store={store}>
      <App cls={cls} />
    </Provider>
  )
  return { ...utils, store }
}

beforeEach(() => {
  server.use(...siteHandlers)
  // react-multi-carousel renders no slides until its container has a width.
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1024)
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllEnvs()
  APP_CONFIG.debug = false
  window.history.pushState({}, '', '/')
})

describe('App', () => {
  it('renders the header, the page and the footer', async () => {
    const { container } = renderApp('/contact')

    expect(
      screen.getByRole('navigation', { name: 'Main Navigation' })
    ).toBeInTheDocument()
    expect(await screen.findByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    // the online/offline class is on the layout's wrapper div, which has no role.
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstElementChild).toHaveClass('container-fluid', 'online')
  })

  it('marks the layout offline when there is no network', () => {
    const { container } = renderApp('/contact', 'offline')
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstElementChild).toHaveClass('offline')
  })

  it('loads every data source when it starts', async () => {
    const { store } = renderApp('/contact')

    await vi.waitFor(() => {
      // every endpoint of src/redux/api.ts, loaded.
      const queries = Object.values(store.getState().api.queries)
      expect(queries.map((query) => query?.endpointName).sort()).toEqual([
        'getArticles',
        'getClients',
        'getEducation',
        'getPortfolio',
        'getProjectImages',
        'getRecommendations',
        'getRepositories',
        'getSpecialties',
        'getVideos',
      ])
      expect(queries.every((query) => query?.status === 'fulfilled')).toBe(true)
    })
  })

  it('drops a trailing slash from the url', async () => {
    renderApp('/contact/')
    await vi.waitFor(() => expect(window.location.pathname).toBe('/contact'))
  })

  it('shows the 404 page for an unknown url', async () => {
    renderApp('/no-such-page')
    expect(await screen.findByLabelText('Matrix rain')).toBeInTheDocument()
  })

  it('makes every cookie SameSite=None and Secure', () => {
    document.cookie = 'flavor=vanilla'
    const set = vi.spyOn(document, 'cookie', 'set')
    renderApp('/contact')
    expect(set).toHaveBeenCalledWith(expect.stringMatching(/^flavor=vanilla;.*secure/i))
  })

  it("doesn't register the service worker outside a production build", () => {
    renderApp('/contact')
    expect(registration.register).not.toHaveBeenCalled()
  })
})

describe('App service worker alerts', () => {
  /** Render a production build, and return the callbacks it gave register(). */
  function startProductionBuild(): ServiceWorkerConfig {
    vi.stubEnv('PROD', true)
    renderApp('/contact')
    expect(registration.register).toHaveBeenCalledTimes(1)
    const config = registration.register.mock.calls[0][0]
    if (!config) throw new Error('register() was called without callbacks')
    return config
  }

  it('announces an update, then tells the waiting worker to take over', () => {
    vi.useFakeTimers()
    const config = startProductionBuild()
    const waiting = { postMessage: vi.fn() }

    act(() => config.onUpdate?.({ waiting } as unknown as ServiceWorkerRegistration))
    expect(
      screen.getByText(/New content is available and will be automatically installed/)
    ).toBeInTheDocument()

    // the alert closes itself after 5 seconds, and lets the update proceed.
    act(() => vi.advanceTimersByTime(5000))
    expect(waiting.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' })
    vi.useRealTimers()
  })

  it('announces a successful install', () => {
    const config = startProductionBuild()

    act(() =>
      config.onSuccess?.({ active: null } as unknown as ServiceWorkerRegistration)
    )

    expect(screen.getByText(/successfully updated itself/)).toBeInTheDocument()
  })

  it('warns when an update arrives without a registration', () => {
    const config = startProductionBuild()

    act(() => config.onUpdate?.(undefined as unknown as ServiceWorkerRegistration))

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('onSWUpdateAvailable() was called without')
    )
    expect(screen.queryByText(/New content is available/)).not.toBeInTheDocument()
  })

  it('logs its life cycle in debug mode', () => {
    APP_CONFIG.debug = true
    const config = startProductionBuild()
    act(() =>
      config.onSuccess?.({ active: null } as unknown as ServiceWorkerRegistration)
    )

    for (const message of [
      'App.componentDidMount()',
      'App.render()',
      'App.onSWInstallSuccess()',
    ]) {
      expect(console.log).toHaveBeenCalledWith(message)
    }
  })
})
