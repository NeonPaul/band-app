import { types } from '../actions/band'

var defaultState = {
  songs: []
}

export default function reduce (state = defaultState, action) {
  switch (action.type) {
    case types.SONG_ADDED:
      return Object.assign(
        {},
        state,
        {
          songs: [action.song].concat(state.songs)
        }
      )
    case types.BAND_DATA:
      return Object.assign({ loaded: true }, action.payload)
    default:
      return state
  }
}
