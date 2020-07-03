require('dotenv').config()

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as express from 'express'
import * as path from 'path'
import * as url from 'url'
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import Http from './Http'
import html from './html'
import routes from './routes'
import getStore from './store'
import HttpService from './HttpService'
import { GenericThunk } from './store/thunks'
import { ClickAction } from './store/actions'

import { Context, Model, ClickWindow } from './types'

const app: express.Application = require('express')()
const http = require('http').createServer(app)

app.use(express.static('dist'))

app.get('*', async (req, res) => {
  try {
    const HttpStatic = Http

    const store = getStore({}, HttpStatic)

    try {
      await GenericThunk.find<ClickWindow, (clickResponse: Model<ClickWindow>[]) => void>(
        store.dispatch,
        'click-windows',
        (clickResponse: Model<ClickWindow>[]): void => {
          store.dispatch(ClickAction.storeWindows(clickResponse))
        }
      )
    } catch (e) {
    } finally {
      const branch = matchRoutes(routes, url.parse(req.url).pathname || '')

      const context: Context = {}

      const content = html({
        body: ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        ),
        data: store.getState(),
      })

      if (context.notFound || context.status === 404) {
        res.status(404)
      }

      if (context.url) {
        return res.redirect(301, context.url)
      }

      res.send(content)
    }
  } catch (err) {
    throw err
  }
})

http.listen(process.env.PORT, () => {
  console.log('SSR REACT STARTED: Served Client On ' + process.env.PORT)
})
