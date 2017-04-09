import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import config from '../config'
import Menu from './menu'

class Header extends Component {
  render () {
    return <header className="header">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <div className="header__left">
              <Link href="/">
                <a className="header__link-home">
                  <img className="header__logo" src={config.CDN + '/assets/images/fec-logo.svg'} alt="Logo" />
                </a>
              </Link>

              <button type="button" className="header__hamburger">
                <span className="header__hamburger-bar"></span>
              </button>
            </div>

            <div className="header__right">
              <Menu items={this.props.menu} />
            </div>
          </div>
        </div>
      </div>
    </header>
  }
}

Header.propTypes = {
  menu: PropTypes.array
}

export default Header

