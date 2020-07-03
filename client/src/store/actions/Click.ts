import { ClickTypes } from '../types'

import { Action, Data, ClickWindow } from '../../types'

export function createWindow(clickWindow: Data<ClickWindow> | null): Action {
  return {
    type: ClickTypes.CREATE_WINDOW,
    payload: clickWindow,
  }
}

export function storeWindows(clickWindows: Data<ClickWindow>[]): Action {
  return {
    type: ClickTypes.STORE_WINDOWS,
    payload: clickWindows,
  }
}
