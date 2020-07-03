import { AnyAction, ActionCreator, Action as A } from 'redux'
import { ThunkDispatch as TDispatch, ThunkAction } from 'redux-thunk'
import { AxiosStatic } from 'axios'

import { Model, ClickWindow } from './data'
import { ModalOptions } from './utils'

export type StateKeys = 'Click'

export type ClickState = {
  clickWindows: Model<ClickWindow>[]
}

export type AuxState = {
  modal: ModalOptions
  loading: boolean
}

export type State = {
  Click: ClickState
  Aux: AuxState
}

export type Payload<D> = D

export type Types = {
  [type: string]: string
}

export type ActionTypes = {
  [key in StateKeys]: Types
}

export interface Action extends AnyAction {
  type: string
  payload: any
}

export type WrappedThunkDispatch<E> = TDispatch<State, E, Action>

export type WrappedThunkActionCreator<R> = ActionCreator<
  ThunkAction<Promise<R>, State, AxiosStatic, Action>
>
