import axios, {
  AxiosResponse,
  AxiosError,
  AxiosStatic,
  AxiosRequestConfig,
  AxiosInstance,
} from 'axios'

import { SERVER_URL, CLIENT_URL } from './constants'

const Http: AxiosStatic = axios

Http.defaults.baseURL = SERVER_URL
Http.defaults.headers.common['Content-Type'] = 'application/json'

export default Http
