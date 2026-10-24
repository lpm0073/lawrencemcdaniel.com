/**
 * UI state that must outlive a page: which entry animations have already
 * played this session, so that they play only on a page's first visit, and
 * the logo cube's state, so that it keeps its faces between visits.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/** The logo cube's own component state (see src/components/logocube). */
export type LogoCubeSnapshot = Record<string, unknown>

/** The pages and components whose entry animation plays once per session. */
export type EntryAnimation = 'aboutPage' | 'clientGrid'

export interface UiState {
  entryAnimationsPlayed: Record<EntryAnimation, boolean>
  logoCube: LogoCubeSnapshot | null
}

const initialState: UiState = {
  entryAnimationsPlayed: { aboutPage: false, clientGrid: false },
  logoCube: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    entryAnimationPlayed(state, action: PayloadAction<EntryAnimation>) {
      state.entryAnimationsPlayed[action.payload] = true
    },
    logoCubeSaved(state, action: PayloadAction<LogoCubeSnapshot>) {
      state.logoCube = action.payload
    },
  },
})

export const { entryAnimationPlayed, logoCubeSaved } = uiSlice.actions
