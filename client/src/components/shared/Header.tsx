import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import logo from '../../assets/images/logo.png'

import { NavigationItem } from '../../types'

export type HeaderProps = any

const Header: React.FC<HeaderProps> = ({ location }): JSX.Element => {
  const items: NavigationItem[] = [
    { label: 'InterTracktor', path: '/' },
    { label: 'Reports', path: '/reports' },
  ]

  return (
    <header className="header">
      <Navbar>
        <Nav className="mr-auto">
          <Link to="/" className="menu-item-logo">
            <img src={logo} alt="Datawheel Logo" title="Datawheel Logo" className="menu-logo" />
          </Link>
        </Nav>
        <Nav className="ml-auto">
          {items.map(
            (item: NavigationItem, i: number): JSX.Element => (
              <Link
                key={i}
                to={item.path}
                className={`menu-item-anchor ${
                  item.path === location.pathname ? 'menu-item-active' : ''
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </Nav>
      </Navbar>
    </header>
  )
}

export const ConnectedHeader = withRouter(Header)
