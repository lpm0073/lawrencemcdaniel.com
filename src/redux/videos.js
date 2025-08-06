import * as ActionTypes from './ActionTypes'

export const VideosRedux = (
  state = {
    isLoading: true,
    errMess: null,
    videos: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_VIDEOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        videos: action.payload,
      }

    case ActionTypes.VIDEOS_LOADING:
      return { ...state, isLoading: true, errMess: null, videos: [] }
    case ActionTypes.VIDEOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        videos: [],
      }

    default:
      return state
  }
}
