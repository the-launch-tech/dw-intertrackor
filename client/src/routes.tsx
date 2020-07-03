import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

import { ConnectedMain as Main } from './Main'
import { ConnectedActions as Actions } from './pages/actions'
import { ConnectedReports as Reports } from './pages/reports/index'

import { NotFound } from './pages/notfound'

export const mainRoutes: RouteConfig[] = [
  {
    path: '/',
    component: Actions,
    exact: true,
  },
  {
    path: '/reports',
    component: Reports,
    exact: true,
  },
]

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    exact: false,
    routes: mainRoutes,
  },
  {
    path: '/404',
    component: NotFound,
    exact: true,
  },
  {
    path: '*',
    component: () => <Redirect to="/404" />,
    exact: false,
  },
]

export default routes
