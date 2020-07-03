import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'

import Maps from '../../store/maps'

export type Props = ReturnType<typeof Maps.state.Reports> &
  ReturnType<typeof Maps.dispatch.Reports> &
  RouteComponentProps

export const handleExport = (Component: React.FC<Props>) => {
  return connect(
    Maps.state.Reports,
    Maps.dispatch.Reports
  )(Component)
}
