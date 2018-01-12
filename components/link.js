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
          (this.props.detail ? '&detail=' + this.props.detail : '') +
          (this.props.custom ? '&custom=' + this.props.custom : '')
        slug +=
          this.props.page +
          (this.props.detail ? '/' + this.props.detail : '') +
          (this.props.custom ? '/' + this.props.custom : '')
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
  custom: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.node
}

export default InternalLink
