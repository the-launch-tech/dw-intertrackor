import { ClickTypes } from '../types/index'
import merge from '../merge'
import initialState from '../initialState'

import { State, Action, ClickWindow } from '../../types'

const { log, error } = console

export default (state: State['Click'] = initialState.Click, action: Action) => {
  switch (action.type) {
    case ClickTypes.CREATE_WINDOW:
      return createWindow(state, action.payload)
    case ClickTypes.STORE_WINDOWS:
      return storeWindows(state, action.payload)
    default:
      return state
  }
}

const createWindow = (state: State['Click'], payload: Action['payload']): State['Click'] => {
  return merge<State['Click']>(state, { clickWindows: [...state.clickWindows, payload] })
}

const storeWindows = (state: State['Click'], payload: Action['payload']): State['Click'] => {
  return merge<State['Click']>(state, { clickWindows: payload })
}
