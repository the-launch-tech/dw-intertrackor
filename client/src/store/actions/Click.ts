import { ClickTypes } from '../types'

import { Action, Data, ClickWindow, CamelModifiedClickWindow } from '../../types'

export function createWindow(clickWindow: Data<CamelModifiedClickWindow> | null): Action {
  return {
    type: ClickTypes.CREATE_WINDOW,
    payload: clickWindow,
  }
}

export function storeWindows(clickWindows: Data<CamelModifiedClickWindow>[]): Action {
  return {
    type: ClickTypes.STORE_WINDOWS,
    payload: clickWindows,
  }
}
