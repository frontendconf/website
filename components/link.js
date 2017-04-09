import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

class InternalLink extends Component {
  render () {
    const href = '/?page=' + (this.props.slug || (this.props.page + (this.props.detail ? '&detail=' + this.props.detail : null)))
    const slug = '/' + (this.props.slug || (this.props.page + (this.props.detail ? '/' + this.props.detail : null)))

    return <Link href={href} as={slug}>
      <a className={this.props.classes}>
        {this.props.children || this.props.title}
      </a>
    </Link>
  }
}

InternalLink.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  page: PropTypes.string,
  detail: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.node
}

export default InternalLink

