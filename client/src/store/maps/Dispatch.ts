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
} from '../../types'

export default {
  Main: (dispatch: WrappedThunkDispatch<never>) => ({
    loading: (isLoading: boolean) => {
      return dispatch(AuxAction.loading(isLoading))
    },
  }),
  Reports: (dispatch: WrappedThunkDispatch<never>) => ({
    findHistoricalClickWindows: async () => {
      return await GenericThunk.find<ClickWindow, Function>(
        dispatch,
        'click-windows',
        (response: Model<ClickWindow>[]): void => {
          dispatch(ClickAction.storeWindows(response))
        }
      )
    },
  }),
  Actions: (dispatch: WrappedThunkDispatch<never>) => ({
    createClickWindow: async (options: Create<ClickWindow>) => {
      return await GenericThunk.create<ClickWindow, ClickWindow, never>(
        dispatch,
        'click-windows',
        options.body,
        (response: Model<ClickWindow>) => {
          dispatch(ClickAction.createWindow(response))
        }
      )
    },
  }),
}
