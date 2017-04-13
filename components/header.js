import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'
import config from '../config'
import Menu from './menu'

class Header extends Component {
  render () {
    return <header className="header">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <div className="header__left">
              <InternalLink href="/" classes="header__link-home">
                <img className="header__logo" src={config.CDN + '/assets/images/fec-logo.svg'} alt="Logo" />
              </InternalLink>

              {this.props.menuButtons.map((item, i) => {
                return <InternalLink {...item} classes="header__tickets" key={i} />
              })}

              <label htmlFor="right" className="toggle header__hamburger">
                <img className="header__hamburger-bar" src={config.CDN + '/assets/images/menu.svg'} alt="Menu" />
              </label>
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
  menu: PropTypes.array,
  menuButtons: PropTypes.array
}

export default Header

