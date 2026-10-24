/**
 * Types shared by the reducers and thunks.
 *
 * Each data source has three actions: ADD_X (payload: the data), X_LOADING,
 * and X_FAILED (payload: the error message). FetchAction<...> is their union.
 * A reducer receives every action that is dispatched, so it takes an
 * UnknownAction and casts it to its own union; the switch on action.type then
 * narrows action.payload to the right type.
 */
export interface FetchState {
  isLoading: boolean
  errMess: string | null
}

export type FetchAction<
  Add extends string,
  Loading extends string,
  Failed extends string,
  T,
> = { type: Add; payload: T } | { type: Loading } | { type: Failed; payload: string }

/** State of a page whose entry animation should only run once. */
export interface IsSetState {
  isSet: boolean
}
