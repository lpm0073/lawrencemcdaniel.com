/**
 * renderWithProviders(ui, options): Testing Library's render(), inside the
 * providers that the site's components expect: a Redux store and a router.
 *
 *   const { store, user } = renderWithProviders(<ClientGrid />, {
 *     preloadedState: { clients: { isLoading: false, errMess: null, logos: [makePost()] } },
 *     route: '/clients',
 *   })
 *
 * - preloadedState: a Partial<RootState>; slices left out get their reducers' defaults.
 * - store: pass your own ConfigureStore(...) instead of preloadedState, e.g. to rerender
 *   with the same store.
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
