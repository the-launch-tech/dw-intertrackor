import { AxiosResponse, AxiosStatic } from 'axios'

import errorResponse from './utils/errorResponse'

import { Create, Find, Data, Click, ClickWindow } from './types'

export default class HttpService {
  public static async find<M>(Http: AxiosStatic, options: Find): Promise<Data<M>[]> {
    try {
      const { data }: AxiosResponse<Data<M>[]> = await Http.get(`/${options.prefix}`)
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }

  public static async create<M, B>(Http: AxiosStatic, options: Create<B>): Promise<Data<M>> {
    try {
      const { data }: AxiosResponse<Data<M>> = await Http.post(`/${options.prefix}`, options.body)
      return data
    } catch (err) {
      throw errorResponse(err)
    }
  }
}
