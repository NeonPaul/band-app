import { combineReducers } from 'redux'
import createBand from './create-band'
import band from './band'

export default combineReducers({
  createBand,
  band
})
