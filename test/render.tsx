/**
 * renderWithProviders(ui, options): Testing Library's render(), inside the
 * providers that the site's components expect: a Redux store and a router.
 *
 *   server.use(...serveSiteData({ clients: [makePost()] }))   // see test/handlers.ts
 *   const { store, user } = renderWithProviders(<ClientGrid />, { route: '/clients' })
 *
 * Components load their data themselves, so give them data by serving it
 * (test/handlers.ts), not by preloading the store.
 *
 * - preloadedState: a Partial<RootState>, e.g. { ui: ... }.
 * - store: pass your own ConfigureStore(...), e.g. to remount with the same store,
 *   and so the same data and the same ui state.
 * - route: the MemoryRouter's initial location, '/' by default.
 * Returns render()'s result plus the store and a userEvent instance (user).
 */
import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import {
  ConfigureStore,
  type AppStore,
  type RootState,
} from '../src/redux/configureStore'

export interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  route?: string
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = ConfigureStore(preloadedState),
    route = '/',
    ...options
  }: RenderWithProvidersOptions = {}
) {
  const user = userEvent.setup()
  const utils = render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    ),
    ...options,
  })
  return { ...utils, store, user }
}
