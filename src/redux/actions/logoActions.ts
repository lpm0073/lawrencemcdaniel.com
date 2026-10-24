import * as ActionTypes from '../ActionTypes'
import type { LogoCubeComponentState } from '../logoCube'

export const setLogoState = ({ state }: { state: LogoCubeComponentState }) => ({
  type: ActionTypes.SET_LOGOCUBE_STATE,
  state: state,
})
