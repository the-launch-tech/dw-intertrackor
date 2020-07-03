import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

import Maps from '../../store/Maps'
import { TimeSeries } from '../../components/charts/TimeSeries'
import { Props, handleExport } from './config'

import { Click, Model, ClickWindow } from '../../types'

export type ReportsProps = Props &
  ReturnType<typeof Maps.state.Reports> &
  ReturnType<typeof Maps.dispatch.Reports>

const Reports: React.FC<Props> = ({
  history,
  clickWindows,
  findHistoricalClickWindows,
}): JSX.Element => {
  React.useEffect(() => {
    findHistoricalClickWindows().catch(console.error)
  }, [])

  const preparedClickData: { window_start_time: number; total_clicks: number }[] = React.useMemo<
    { window_start_time: number; total_clicks: number }[]
  >(() => {
    return clickWindows.map((clickWindow: Model<ClickWindow>): {
      window_start_time: number
      total_clicks: number
    } => ({
      window_start_time: clickWindow.window_start_time,
      total_clicks: clickWindow.total_clicks,
    }))
  }, [clickWindows])

  const total_clicks: number = React.useMemo<number>(() => {
    if (!clickWindows.length) {
      return -1
    }
    return clickWindows
      .map((clickWindow: Model<ClickWindow>): number => clickWindow.total_clicks)
      .reduce((a: number, b: number): number => a + b, 0)
  }, [clickWindows])

  const avgClicksPerWindow: number = React.useMemo<number>(() => {
    if (!clickWindows.length) {
      return -1
    }
    return clickWindows.length / total_clicks
  }, [clickWindows])

  const avgTimeBetweenClicks: number = React.useMemo<number>(() => {
    if (!clickWindows[clickWindows.length - 1] || !clickWindows[0].window_start_time) {
      return -1
    }
    return (
      total_clicks /
      Math.floor(
        (clickWindows[clickWindows.length - 1].window_end_time -
          clickWindows[0].window_start_time) /
          1000
      )
    )
  }, [clickWindows])

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center mb-3">
          <h2 className="p-3 w-100 text-center font-weight-bolder transform-uppercase color-white">
            Historical Data
          </h2>
        </Row>
        <Row className="mb-5">
          <Card className="w-100 report-data-card">
            <Card.Header className="transform-uppercase">Data Points</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Historical Clicks: <strong>{total_clicks}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                Average Clicks Per Window: <strong>{avgClicksPerWindow.toFixed(2)}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                Average Time Between Clicks: <strong>{avgTimeBetweenClicks.toFixed(2)}</strong>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Row>
        <Row>
          <Card className="w-100 h-100 report-chart-card">
            <Card.Header className="transform-uppercase">Session Chart</Card.Header>
            <Card.Body id="report-chart-body">
              <Card.Title className="font-weight-bold">Historical Click Windows</Card.Title>
              {preparedClickData.length ? (
                <TimeSeries<{ window_start_time: number; total_clicks: number }>
                  data={
                    preparedClickData.length > 40
                      ? preparedClickData.slice(preparedClickData.length - 40)
                      : preparedClickData
                  }
                  widthRef="report-chart-body"
                  selectX={datum => new Date(datum.window_start_time)}
                  selectY={datum => datum.total_clicks}
                />
              ) : (
                <div>No Click History Data</div>
              )}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export const ConnectedReports = handleExport(Reports)
