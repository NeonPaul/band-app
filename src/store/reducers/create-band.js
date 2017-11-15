import { types } from '../actions/create-band'

var defaultState = {
  createdId: null
}

export default function reduce (state = defaultState, action) {
  switch (action.type) {
    case types.CREATE_BAND:
      return {
        createdId: action.createdId
      }
    default:
      return state
  }
}
