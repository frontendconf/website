import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'
import Newsletter from './newsletter'

class Intro extends Component {
  formatDate (date) {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).split(' ').map((part) => part.replace(',', ''))
  }

  render () {
    const startDate = this.formatDate(this.props.startDate)
    const endDate = this.formatDate(this.props.endDate)

    return <section className="intro">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <div className="intro__top-content">
              <h1 className="intro__title">{this.props.title}</h1>
              <div className="intro__content">
                <p>
                  {this.props.subtitle}
                  <br />
                  {startDate[1]} {startDate[0]} - {endDate[1]} {endDate[0]} {endDate[2]}
                  <br />
                  {this.props.location}
                </p>
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
                  return <span key={i}>
                    <InternalLink {...cta} classes="btn" />
                    &nbsp;
                  </span>
                })}
              </div>

              <div className="intro__bottom-right">
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

Intro.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  location: PropTypes.string,
  ctas: PropTypes.array
}

export default Intro

