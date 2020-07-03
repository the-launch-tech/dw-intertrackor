import * as React from 'react'
import * as Helmet from 'react-helmet'
import { line as d3Line, Line } from 'd3-shape'

export type NavigationItem = {
  label: string
  path: string
}

export type ModalOptions = {
  active: boolean
  Component?: any
  onClose?: (event: React.MouseEvent) => void
}

export type Context = {
  notFound?: boolean
  url?: string
  status?: number
  data?: any
}

export type HtmlOptions = {
  body: string
  data: object
}

export namespace D3TimeSeries {
  export type Coord = { x: number; y: number }

  export type Datum<D> = D

  export type TimeSeriesProps<D> = {
    data: Datum<D>[]
    selectX: (datum: Datum<D>) => any
    selectY: (datum: Datum<D>) => any
    widthRef: string
  }

  export type Dimensions = { height: number; width: number }

  export type Transform = { transform: string }
}
