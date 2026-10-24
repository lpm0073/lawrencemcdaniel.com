import { describe, expect, it, vi } from 'vitest'

import { makePost } from '../../test/fixtures'
import * as ActionTypes from './ActionTypes'
import { ConfigureStore, rootReducer } from './configureStore'
import { SpecialtiesRedux } from './specialties'
import { VideosRedux } from './videos'

describe('rootReducer', () => {
  it('starts every data source loading, and every page unset', () => {
    const state = rootReducer(undefined, { type: '@@INIT' })

    expect(state.articles).toEqual({ isLoading: true, errMess: null, articles: [] })
    expect(state.repositories.isLoading).toBe(true)
    expect(state.homePage.isSet).toBe(false)
    expect(state.logoCube).toEqual({ isSet: false, state: null })
  })

  it('ignores actions that no reducer handles', () => {
    const before = rootReducer(undefined, { type: '@@INIT' })
    expect(rootReducer(before, { type: 'SOMETHING_ELSE' })).toBe(before)
  })

  it('marks a page as set', () => {
    const state = rootReducer(undefined, { type: ActionTypes.SET_HOMEPAGE_STATE })
    expect(state.homePage.isSet).toBe(true)
    expect(state.aboutPage.isSet).toBe(false)
  })

  it('stores the logo cube component state', () => {
    const state = rootReducer(undefined, {
      type: ActionTypes.SET_LOGOCUBE_STATE,
      state: { face: 2 },
    })
    expect(state.logoCube).toEqual({ isSet: true, state: { face: 2 } })
  })
})

describe('fetch reducers', () => {
  it('stores the payload and stops loading on ADD', () => {
    const state = VideosRedux(undefined, { type: ActionTypes.ADD_VIDEOS, payload: [] })
    expect(state).toEqual({ isLoading: false, errMess: null, videos: [] })
  })

  it('stores the error message and clears the data on FAILED', () => {
    const state = VideosRedux(
      { isLoading: true, errMess: null, videos: [] },
      { type: ActionTypes.VIDEOS_FAILED, payload: 'Error 500: Server Error' }
    )
    expect(state).toEqual({
      isLoading: false,
      errMess: 'Error 500: Server Error',
      videos: [],
    })
  })

  it('clears the previous error on LOADING', () => {
    const state = VideosRedux(
      { isLoading: false, errMess: 'boom', videos: [] },
      { type: ActionTypes.VIDEOS_LOADING }
    )
    expect(state).toEqual({ isLoading: true, errMess: null, videos: [] })
  })
})

describe('SpecialtiesRedux', () => {
  it('extracts every logo, and the featured technologies', () => {
    const featured = makePost({ id: 1, categories: [43, 48] })
    const other = makePost({ id: 2, categories: [43], _embedded: undefined })

    const state = SpecialtiesRedux(undefined, {
      type: ActionTypes.ADD_SPECIALTIES,
      payload: [featured, other],
    })

    const mediumUrl =
      'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'
    expect(state.isLoading).toBe(false)
    expect(state.items).toHaveLength(2)
    expect([...state.logos].sort()).toEqual([mediumUrl, null].sort())
    expect(state.featured_logos).toEqual([mediumUrl])
  })
})

describe('every fetch reducer', () => {
  // [reducer, slice of RootState, the field that holds its data, its action types]
  const REDUCERS = [
    ['articles', 'articles', 'ARTICLES'],
    ['clients', 'logos', 'CLIENTS'],
    ['education', 'courses', 'EDUCATION'],
    ['portfolio', 'projects', 'PORTFOLIO'],
    ['project', 'images', 'PROJECT_IMAGES'],
    ['recommendations', 'items', 'RECOMMENDATIONS'],
    ['repositories', 'repos', 'REPOS'],
    ['specialties', 'items', 'SPECIALTIES'],
    ['videos', 'videos', 'VIDEOS'],
  ] as const

  const loaded = { type: '@@INIT' }

  it.each(REDUCERS)('%s: loads, fails, and reloads', (slice, field, name) => {
    const addType = name === 'REPOS' ? 'ADD_REPOS' : `ADD_${name}`
    let state = rootReducer(undefined, loaded)
    expect(state[slice].isLoading).toBe(true)

    state = rootReducer(state, { type: addType, payload: [] })
    expect(state[slice]).toMatchObject({ isLoading: false, errMess: null, [field]: [] })

    state = rootReducer(state, {
      type: `${name}_FAILED`,
      payload: 'Error 404: Not Found',
    })
    expect(state[slice]).toMatchObject({
      isLoading: false,
      errMess: 'Error 404: Not Found',
      [field]: [],
    })

    state = rootReducer(state, { type: `${name}_LOADING` })
    expect(state[slice]).toMatchObject({ isLoading: true, errMess: null, [field]: [] })
  })
})

describe('ConfigureStore', () => {
  it('logs every action in development', () => {
    vi.stubEnv('DEV', true)
    vi.stubEnv('MODE', 'development')
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const group = vi.spyOn(console, 'group').mockImplementation(() => {})
    vi.spyOn(console, 'groupCollapsed').mockImplementation(() => {})
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {})

    const store = ConfigureStore()
    store.dispatch({ type: ActionTypes.SET_HOMEPAGE_STATE })

    expect(store.getState().homePage.isSet).toBe(true)
    expect([...log.mock.calls, ...group.mock.calls].flat().join(' ')).toContain(
      ActionTypes.SET_HOMEPAGE_STATE
    )
    vi.unstubAllEnvs()
  })

  it("doesn't log in tests", () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    ConfigureStore().dispatch({ type: ActionTypes.SET_HOMEPAGE_STATE })
    expect(log).not.toHaveBeenCalled()
  })
})
