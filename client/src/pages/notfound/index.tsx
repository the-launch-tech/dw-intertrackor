import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Container from 'react-bootstrap/Container'

export type NotFoundProps = RouteComponentProps & {
  staticContext?: any
}

export const NotFound: React.FC<NotFoundProps> = ({ staticContext }) => {
  staticContext.status = 404
  return (
    <React.Fragment>
      <Container fluid>
        <h1>Oops, nothing here!</h1>
      </Container>
    </React.Fragment>
  )
}
