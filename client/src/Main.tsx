import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { RouteConfigComponentProps } from 'react-router-config'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Container from 'react-bootstrap/Container'

import { mainRoutes } from './routes'
import { ConnectedHeader as Header } from './components/shared/Header'
import { Footer } from './components/shared/Footer'
import { ConnectedModal as Modal } from './components/shared/Modal'
import { ConnectedLoader as Loader } from './components/shared/Loader'
import Maps from './store/maps'

export type MainProps = ReturnType<typeof Maps.state.Main> &
  ReturnType<typeof Maps.dispatch.Main> &
  RouteComponentProps &
  RouteConfigComponentProps

const Main: React.FC<MainProps> = ({ location, loading }): JSX.Element => {
  React.useEffect(() => {
    loading(true)
    setTimeout(() => loading(false), 700)
  }, [location.pathname])

  return (
    <Container fluid className="p-0 relative vh-100">
      <Modal />
      <Loader />
      <Header />
      <Container fluid className="p-4 main-container">
        <Switch>{renderRoutes(mainRoutes)}</Switch>
      </Container>
      <Footer />
    </Container>
  )
}

export const ConnectedMain = connect(
  Maps.state.Main,
  Maps.dispatch.Main
)(withRouter(Main))
