import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Workshop extends Component {
  render () {
    const twitter = this.props.twitter ? <a href={'https://twitter.com/' + this.props.twitter}>{'@' + this.props.twitter}</a> : null

    return <section className="workshop section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h1>
              {this.props.title}
            </h1>

            <h2>
              {this.props.lead}
            </h2>

            <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
          </div>
        </div>
      </div>
    </section>
  }
}

Workshop.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  body: PropTypes.string,
  name: PropTypes.string,
  biography: PropTypes.string,
  photo: PropTypes.string,
  twitter: PropTypes.string
}

export default Workshop
