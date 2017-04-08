import React, { Component } from 'react'
import Link from 'next/link'
import config from '../config'

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
              <nav className="navigation">
                <ul className="navigation__list">
                  {this.props.menu.map((item, i) => {
                    const href = '/?page=' + item.slug

                    return <li className="navigation__element" key={i}>
                      <Link href={href} as={item.slug}>
                        <a className={item.isActive ? 'navigation__link navigation__link--active' : 'navigation__link'}>
                          {item.title}
                        </a>
                      </Link>
                    </li>
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  }
}

Header.propTypes = {
  menu: React.PropTypes.array
}

export default Header

