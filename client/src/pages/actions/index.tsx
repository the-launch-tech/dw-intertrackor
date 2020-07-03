import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import { Props, handleExport } from './config'
import { TimeSeries } from '../../components/charts/TimeSeries'

import { ClickWindow, Click } from '../../types'

export type ActionsProps = Props

let mounted = false

const Actions: React.FC<Props> = ({ history, createClickWindow }): JSX.Element => {
  const windowSize = 2
  const [clicked, setClicked] = React.useState<boolean>(false)
  const [pristine, setPristine] = React.useState<boolean>(true)
  const [lastStartTime, setLastStartTime] = React.useState<number>(Date.now())
  const [tempClickWindows, setTempClickWindows] = React.useState<
    { windowStartTime: number; totalClicks: number }[]
  >([])
  const [tempClicks, setTempClicks] = React.useState<Click[]>([])
  const [speed, setSpeed] = React.useState<string>('4500ms')
  const tempClickWindowsRef = React.useRef<{ windowStartTime: number; totalClicks: number }[]>(
    tempClickWindows
  )
  const tempClicksRef = React.useRef<{ click_time: number }[]>([])
  const lastStartTimeRef = React.useRef<number>(lastStartTime)
  const speedRef = React.useRef<string>(speed)

  const delay = ['0ms', '2000ms', '4000ms']
  const color = ['#f56537', '#367693', '#a0bfa9']

  React.useEffect(() => {
    mounted = true
    return () => {
      mounted = false
    }
  })

  React.useEffect(() => {
    updateRefs()
    if (pristine) {
      setPristine(false)
      onClicksChange()
    }
  }, [tempClicks])

  React.useEffect(() => updateRefs(), [lastStartTime])

  function onClicksChange(): void {
    setLastStartTime(Date.now())
    const newInterval = () => {
      if (!mounted) return
      setTimeout(() => {
        if (!mounted) return
        createClickWindow({
          body: {
            total_clicks: tempClicksRef.current.length.toString(),
            window_end_time: Date.now().toString(),
            window_start_time: lastStartTimeRef.current.toString(),
          },
        }).catch(console.error)
        setSpeed(calculateProperties(tempClicksRef.current.length))
        setTempClickWindows(prev => [
          ...prev,
          { windowStartTime: lastStartTimeRef.current, totalClicks: tempClicksRef.current.length },
        ])
        setTempClicks([])
        setLastStartTime(Date.now())
        if (mounted) newInterval()
      }, windowSize * 1000)
    }
    if (mounted) {
      newInterval()
    }
  }

  function onButtonClick(event: React.MouseEvent): void {
    event.preventDefault()
    setTempClicks(prev => [...prev, { click_time: Date.now() }])
    if (!clicked) {
      setClicked(true)
    }
  }

  /**
   * @note This should be refactored into a nice algorithm....
   */
  function calculateProperties(windowContaining: number): string {
    if (windowContaining < 1) {
      return `10000ms`
    } else if (windowContaining < 2) {
      return `4000ms`
    } else if (windowContaining < 3) {
      return `3000ms`
    } else if (windowContaining < 5) {
      return `2250ms`
    } else if (windowContaining < 8) {
      return `1600ms`
    } else if (windowContaining < 13) {
      return `1000ms`
    }
    return `500ms`
  }

  function updateRefs() {
    tempClickWindowsRef.current = tempClickWindows
    tempClicksRef.current = tempClicks
    lastStartTimeRef.current = lastStartTime
    speedRef.current = speed
  }

  return (
    <React.Fragment>
      {!clicked && (
        <Alert className="alert font-weight-bolder" variant="success" onClick={onButtonClick}>
          Clickthe Intertracktor Interactor and get dizzy! Let's track your interactions.
        </Alert>
      )}
      <Container fluid className="h-100">
        <Container fluid className="h-100">
          <Row className="h-100 align-items-center">
            <Col className="h-100 d-flex justify-content-center align-items-center">
              <div className="custom-button-wrapper">
                <div
                  className="custom-button-obj"
                  style={{ animationDuration: speed, animationDelay: delay[0], color: color[0] }}
                ></div>
                <div
                  className="custom-button-obj custom-button-obj--2"
                  style={{ animationDuration: speed, animationDelay: delay[1], color: color[1] }}
                ></div>
                <div
                  className="custom-button-obj custom-button-obj--3"
                  style={{ animationDuration: speed, animationDelay: delay[2], color: color[2] }}
                ></div>
                <svg viewBox="0 0 431.7 422.6" onClick={onButtonClick}>
                  <path
                    d="M1.1 77.8c101.7-101.7 266.5-101.7 368.2 0 81.3 81.3 81.3 213.2 0 294.5-65.1 65.1-170.6 65.1-235.6 0-52.1-52.1-52.1-136.5 0-188.5 41.6-41.6 109.2-41.6 150.8 0 33.3 33.3 33.3 87.3 0 120.6-26.7 26.7-69.9 26.7-96.5 0-21.3-21.3-21.3-55.9 0-77.2 17.1-17.1 44.7-17.1 61.8 0 13.6 13.6 13.6 35.8 0 49.4-10.9 10.9-28.6 10.9-39.5 0-8.7-8.7-8.7-22.9 0-31.6 7-7 18.3-7 25.3 0"
                    fill="none"
                    stroke="#b6b6b6"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </Col>
            <Col className="h-75">
              <Card className="h-100 live-chart-card">
                <Card.Header className="font-weight-bolder">Live Intertracktor Tracker</Card.Header>
                <Card.Body id="live-chart-card-body">
                  <TimeSeries<{ windowStartTime: number; totalClicks: number }>
                    data={
                      tempClickWindows.length > 10
                        ? tempClickWindows.slice(tempClickWindows.length - 10)
                        : tempClickWindows
                    }
                    selectX={datum => new Date(datum.windowStartTime)}
                    selectY={datum => datum.totalClicks}
                    widthRef={'live-chart-card-body'}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  )
}

export const ConnectedActions = handleExport(Actions)
