import { combineReducers } from 'redux'

import Click from './Click'
import Aux from './Aux'

import { State } from '../../types'

export default combineReducers<State>({
  Click,
  Aux,
})
