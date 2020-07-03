import * as React from 'react'
import * as ReactDOM from 'react-dom'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { BrowserRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'

import getStore from './store'
import routes from './routes'
import Http from './Http'

import './assets/scss/_main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

export interface WindowWithState extends Window {
  INITIAL_STATE?: any
}

const win: WindowWithState = window

const store = getStore(win.INITIAL_STATE, Http)

const app: Element | null = document.getElementById('app')
if (!!app) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>{renderRoutes(routes)}</Switch>
      </BrowserRouter>
    </Provider>,
    app
  )
}
