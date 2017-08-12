import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

class InternalLink extends Component {
  getLinkConfig () {
    let href = this.props.href
    let slug = this.props.href

    // TODO: Simplify
    if (!this.props.href) {
      href = '/?page='
      slug = '/'

      if (this.props.slug) {
        href += this.props.slug
        slug += this.props.slug
      } else {
        href +=
          this.props.page +
          (this.props.detail ? '&detail=' + this.props.detail : null)
        slug +=
          this.props.page + (this.props.detail ? '/' + this.props.detail : null)
      }
    }

    return {
      slug,
      href
    }
  }

  render () {
    const linkConfig = this.getLinkConfig()

    return (
      <Link href={linkConfig.href} as={linkConfig.slug}>
        <a className={this.props.classes}>
          {this.props.children || this.props.title}
        </a>
      </Link>
    )
  }
}

InternalLink.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  slug: PropTypes.string,
  page: PropTypes.string,
  detail: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.node
}

export default InternalLink
