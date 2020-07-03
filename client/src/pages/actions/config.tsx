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

/**
 * @note This should be refactored into a nice algorithm....
 */
export function calculateProperties(
  windowContaining: number
): { speed: string; delays: string[]; colors: string[] } {
  if (windowContaining < 1) {
    return {
      speed: `10000ms`,
      delays: ['0ms', '2000ms', '4000ms'],
      colors: ['#f56537', '#367693', '#a0bfa9'],
    }
  } else if (windowContaining < 2) {
    return {
      speed: `4000ms`,
      delays: ['0ms', '1500ms', '2700ms'],
      colors: ['#367693', '#a0bfa9', '#f56537'],
    }
  } else if (windowContaining < 3) {
    return {
      speed: `3000ms`,
      delays: ['0ms', '1250ms', '2400ms'],
      colors: ['#a0bfa9', '#f56537', '#367693'],
    }
  } else if (windowContaining < 5) {
    return {
      speed: `2250ms`,
      delays: ['0ms', '1000ms', '2000ms'],
      colors: ['#f56537', '#367693', '#a0bfa9'],
    }
  } else if (windowContaining < 8) {
    return {
      speed: `1600ms`,
      delays: ['0ms', '700ms', '1650ms'],
      colors: ['#367693', '#a0bfa9', '#f56537'],
    }
  } else if (windowContaining < 13) {
    return {
      speed: `1000ms`,
      delays: ['0ms', '500ms', '1150ms'],
      colors: ['#a0bfa9', '#f56537', '#367693'],
    }
  }
  return {
    speed: `500ms`,
    delays: ['0ms', '240ms', '450ms'],
    colors: ['#f56537', '#367693', '#a0bfa9'],
  }
}
