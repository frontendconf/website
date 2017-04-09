import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

class Menu extends Component {
  render () {
    return <nav className="navigation">
      <ul className="navigation__list">
        {this.props.items.map((item, i) => {
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
  }
}

Menu.propTypes = {
  items: PropTypes.array
}

export default Menu

