import * as React from 'react'
import * as d3 from 'd3'
import { extent as d3ArrayExtent } from 'd3-array'
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
  ScaleLinear,
  ScaleTime,
} from 'd3-scale'
import { line as d3Line, CurveGeneratorLineOnly } from 'd3-shape'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft, Axis } from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import { D3TimeSeries } from '../../types'

export function TimeSeries<D>({
  data,
  selectX,
  selectY,
  widthRef,
}: D3TimeSeries.TimeSeriesProps<D>): React.ReactElement {
  const [width, setWidth] = React.useState<number>(500)
  const [height, setHeight] = React.useState<number>(300)

  React.useEffect(() => widthRefFn(), [])

  function onResize(ref: any): void {
    setWidth(ref.clientWidth - 60)
    setHeight(ref.clientHeight - 60)
    console.log('outer width', width)
  }

  function widthRefFn(): void {
    const body = document.getElementById(widthRef)
    onResize(body)
    window.removeEventListener('resize', (): void => onResize(body))
    window.addEventListener('resize', (): void => onResize(body))
  }

  const minMaxX = d3ArrayExtent(data, selectX)
  const minMaxY = d3ArrayExtent(data, selectY)

  if (!minMaxX.length || !minMaxY.length) {
    return <React.Fragment />
  }

  const xScale: any = d3ScaleTime()
    .domain(minMaxX as number[])
    .range([0, width])

  const yScale: any = d3ScaleLinear()
    .domain(minMaxY as number[])
    .range([height, 0])

  const xAxis: any = d3AxisBottom(xScale)
    .scale(xScale)
    .ticks(data.length / 2)

  const yAxis: any = d3AxisLeft(yScale)
    .scale(yScale)
    .ticks(3)

  const selectScaledX = (datum: any): any => xScale(selectX(datum))

  const selectScaledY = (datum: any): any => yScale(selectY(datum))

  const sparkLine: d3.Line<[number, number]> = d3
    .line()
    .x(selectScaledX)
    .y(selectScaledY)
    .curve(d3.curveCatmullRom.alpha(0.8))

  const linePath: string | null = sparkLine(data as any)

  const circlePoints: D3TimeSeries.Coord[] = data.map(
    (datum: any): D3TimeSeries.Coord => ({
      x: selectScaledX(datum),
      y: selectScaledY(datum),
    })
  )

  return (
    <svg
      id="timeseries-container"
      className="timeseries-container"
      height={height + 60}
      width={width + 60}
    >
      <g className="timeseries-contentContainer" style={{ transform: `translate(30px, 30px)` }}>
        <rect
          className="timeseries-contentContainerBackgroundRect"
          height={height}
          width={width}
          x={0}
          y={0}
        />
        <g
          className="timeseries-xAxis"
          ref={(node: SVGElement | null): void => {
            d3Select(node).call(xAxis)
          }}
          style={{ transform: `translateY(${height}px)` }}
        />
        <g
          className="timeseries-yAxis"
          ref={(node: SVGElement | null): void => {
            d3Select(node).call(yAxis)
          }}
        />
        <g className="timeseries-line">
          <path d={linePath as string} />
        </g>
        <g className="timeseries-scatter">
          {circlePoints.map(
            (circlePoint: { x: number; y: number }): JSX.Element => (
              <circle
                cx={circlePoint.x}
                cy={circlePoint.y}
                key={`${circlePoint.x},${circlePoint.y}`}
                r={4}
              />
            )
          )}
        </g>
      </g>
    </svg>
  )
}
