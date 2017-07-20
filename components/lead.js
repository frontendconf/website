import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'
import Newsletter from './newsletter'

class Lead extends Component {
  // formatDate (date) {
  //   return new Date(date).toLocaleString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //     year: 'numeric'
  //   }).split(' ').map((part) => part.replace(',', ''))
  // }

  render () {
    // const startDate = this.formatDate(this.props.startDate)
    // const endDate = this.formatDate(this.props.endDate)

    const body = this.props.menu.length ? <ul className="list">
      {this.props.menu.map((item, i) => {
        return <li key={i}>
          <InternalLink {...item} classes={item.isActive ? 'active' : null} />
        </li>
      })}
    </ul> : <div className={this.props.isHome ? 'intro__content' : 'intro__content--light'}>
      <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
    </div>

    const teaser = this.props.teaser ? <div className="col-12">
      <span className="intro__teaser">
        <div dangerouslySetInnerHTML={{ __html: this.props.teaser.body }} />
      </span>
    </div> : null

    const footerContent = this.props.ctas.length ? <div className="col-12">
      <div className="intro__bottom-left">
        {this.props.ctas.map((cta, i) => {
          return <InternalLink {...cta} classes="btn" key={i} />
        })}
      </div>

      <div className="intro__bottom-right">
        {this.props.isHome ? <Newsletter /> : null}
      </div>
    </div> : teaser

    const footer = footerContent ? <div className="intro__bottom-content">
      <div className="grid">
        <div className="grid__inner">
          {footerContent}
        </div>
      </div>
    </div> : null

    return <section className={this.props.isHome ? 'intro intro--bg-100' : 'intro intro--' + this.props.title.toLowerCase()}>
        <div className="intro__top-content">
        <div className="grid">
          <div className="grid__inner">
            <div className="col-12">
              <h1 className="intro__title">{this.props.title}</h1>
            </div>
            <div className={this.props.isHome ? 'col-12' : 'col-12 margin-top-large'}>
              {body}
            </div>
          </div>
        </div>
      </div>

      {footer}
    </section>
  }
}

Lead.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  menu: PropTypes.array,
  ctas: PropTypes.array,
  teaser: PropTypes.object,
  isHome: PropTypes.bool
}

export default Lead
