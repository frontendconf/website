import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Venue extends Component {
  render () {
    return <section className="venue">
      <div className="venue__container">
        <div className="venue__image"></div>
        <div className="venue__inner">
          <div className="venue__content">
            <div className="venue__head">
              <h2>
                {this.props.title}
              </h2>
            </div>
            <div className="venue__venue">
              <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
            </div>
          </div>
        </div>
      </div>
      <div className="venue__col-6">
      </div>
    </section>
  }
}

Venue.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  photo: PropTypes.object
}

export default Venue
