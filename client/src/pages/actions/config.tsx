import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'

import Maps from '../../store/maps'

export type Props = ReturnType<typeof Maps.dispatch.Actions> & RouteComponentProps

export const handleExport = (Component: React.FC<Props>) => {
  return connect(
    null,
    Maps.dispatch.Actions
  )(Component)
}
