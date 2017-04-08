import React, { Component } from 'react'
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
                  {/*this.props.location*/}
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
                {this.props.teasers.map((teaser, i) => {
                  return <a href={teaser.fields.link.fields.slug} className="btn" key={i}>
                    {teaser.fields.link.fields.title}
                  </a>
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
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  startDate: React.PropTypes.string,
  endDate: React.PropTypes.string,
  location: React.PropTypes.object,
  teasers: React.PropTypes.array
}

export default Intro

