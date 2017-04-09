import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

class InternalLink extends Component {
  render () {
    const href = '/?page=' + this.props.slug

    return <Link href={href} as={this.props.slug}>
      <a className={this.props.classes}>
        {this.props.title}
      </a>
    </Link>
  }
}

InternalLink.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  classes: PropTypes.string
}

export default InternalLink

