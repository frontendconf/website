import React, { Component } from 'react'

class Header extends Component {
  render () {
    return <header className="header">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <div className="header__left">
              <a href="/" className="header__link-home">
                <img className="header__logo" src={process.env.CDN + '/assets/images/fec-logo.svg'} alt="Logo" />
              </a>

              <a href="/" className="header__tickets">
                Tickets
              </a>

              <button className="header__hamburger">
                <span className="header__hamburger-bar"></span>
              </button>
            </div>

            <div className="header__right">
              <nav className="navigation">
                <ul className="navigation__list">
                  {this.props.menu.map((item, i) => {
                    return <li className="navigation__element" key={i}>
                      <a href={item.slug} className={item.isActive ? 'navigation__link navigation__link--active' : 'navigation__link'}>
                        {item.title}
                      </a>
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

