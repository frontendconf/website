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
    const newsletter = this.props.newsletter ? <Newsletter /> : null
    const classes = 'intro ' + this.props.modifiers.map((modifier) => 'intro--' + modifier).join(' ')

    return <section className={classes}>
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <div className="intro__top-content">
              <h1 className="intro__title">{this.props.title}</h1>
              <div className="intro__content">
                <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="intro__bottom-content">
        <div className="grid">
          <div className="grid__inner">
            <div className="col-12">
              <div className="intro__bottom-left">
                {this.props.ctas.map((cta, i) => {
                  return <InternalLink {...cta} classes="btn" />
                })}
              </div>

              <div className="intro__bottom-right">
                {newsletter}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

Lead.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  ctas: PropTypes.array,
  newsletter: PropTypes.bool,
  modifiers: PropTypes.array
}

export default Lead

