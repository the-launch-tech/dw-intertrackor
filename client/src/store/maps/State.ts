import { State } from '../../types'

export default {
  Main: (state: State) => ({
    loading: state.Aux.loading,
  }),
  Reports: (state: State) => ({
    clickWindows: state.Click.clickWindows,
  }),
  Loader: (state: State) => ({
    loading: state.Aux.loading,
  }),
  Modal: (state: State) => ({
    modal: state.Aux.modal,
  }),
}
