import { GenericThunk } from '../thunks'
import { ClickAction, AuxAction } from '../actions'

import {
  Model,
  State,
  Create,
  Data,
  WrappedThunkDispatch,
  ModalOptions,
  ClickWindow,
  ModifiedClickWindow,
  CamelModifiedClickWindow,
} from '../../types'

export default {
  Main: (dispatch: WrappedThunkDispatch<never>) => ({
    loading: (isLoading: boolean) => {
      return dispatch(AuxAction.loading(isLoading))
    },
  }),
  Reports: (dispatch: WrappedThunkDispatch<never>) => ({
    findHistoricalClickWindows: async () => {
      return await GenericThunk.find<CamelModifiedClickWindow, Function>(
        dispatch,
        'click-windows',
        (response: Model<CamelModifiedClickWindow>[]): void => {
          dispatch(ClickAction.storeWindows(response))
        }
      )
    },
  }),
  Actions: (dispatch: WrappedThunkDispatch<never>) => ({
    createClickWindow: async (options: Create<ModifiedClickWindow>) => {
      return await GenericThunk.create<CamelModifiedClickWindow, ModifiedClickWindow, never>(
        dispatch,
        'click-windows',
        options.body,
        (response: Model<CamelModifiedClickWindow>) => {
          dispatch(ClickAction.createWindow(response))
        }
      )
    },
  }),
}
