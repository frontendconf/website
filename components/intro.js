import React, { Component } from 'react'

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
                <a href="javascript:void(0);" className="btn">
                  Call for papers
                </a>
                <a href="javascript:void(0);" className="btn">
                  Become a sponsor
                </a>
              </div>

              <div className="intro__bottom-right">
                <form className="form" action="/">
                  <label className="form__label form__label--hidden" htmlFor="email">E-Mail</label>
                  <input className="form__input" id="email" type="email" placeholder="NEWSLETTER" />
                  <button className="btn btn--dark">Sign up</button>
                </form>
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
  location: React.PropTypes.string
}

export default Intro

