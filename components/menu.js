import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class Menu extends Component {
  render () {
    return <nav className="navigation">
      <ul className="navigation__list">
        {this.props.items.map((item, i) => {
          const classes = item.isActive ? 'navigation__link navigation__link--active' : 'navigation__link'

          return <li className="navigation__element" key={i}>
            <InternalLink {...item} classes={classes} />
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

