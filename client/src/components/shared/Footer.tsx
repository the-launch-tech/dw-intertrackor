import * as React from 'react'
import { Link } from 'react-router-dom'

export type FooterProps = {}

export const Footer: React.FC<FooterProps> = ({ children }): JSX.Element => {
  return (
    <footer className="page-footer font-small blue">
      <div className="footer-copyright text-center py-1">
        ©2020 Intertracktor |{' '}
        <a href="https://thelaunch.tech" target="_blank">
          Daniel Griffiths
        </a>
      </div>
    </footer>
  )
}
