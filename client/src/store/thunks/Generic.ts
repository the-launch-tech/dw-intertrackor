import { AxiosStatic } from 'axios'
import { ThunkDispatch } from 'redux-thunk'

import HttpService from '../../HttpService'

import { State, WrappedThunkActionCreator, WrappedThunkDispatch, Data } from '../../types'

export async function create<R, B, C>(dispatch: WrappedThunkDispatch<never>, ...rest: any[]) {
  const createThunk: WrappedThunkActionCreator<Data<R>> = (
    prefix: string,
    body: B,
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>> => {
    try {
      const response: Data<R> = await HttpService.create<R, B>(Http, { prefix, body })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(createThunk(...rest))
}

export async function find<R, C>(dispatch: WrappedThunkDispatch<never>, ...rest: any[]) {
  const findThunk: WrappedThunkActionCreator<Data<R>[]> = (prefix: string, callback?: C) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>[]> => {
    try {
      const response: Data<R>[] = await HttpService.find<R>(Http, {
        prefix,
      })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(findThunk(...rest))
}
