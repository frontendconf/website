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
                Venue
              </h2>
            </div>
            <div className="venue__venue">
              <div className="venue__sub-title-container">
                <h3>
                  Alte Papierfabrik, Zurich
                </h3>
              </div>
              <div className="venue__text">
                <p>
                  Etiam at risus et justo dignissim congue  lorem Etiam at risus et justo. The event takes place in the Alte Papierfabrik congue lorem Etiam at risus.
                  Learn more
                </p>
              </div>
            </div>
            <div className="venue__zurich">
              <div className="venue__sub-title-container">
                <h3>
                  Visit Zurich
                </h3>
              </div>
              <div className="venue__text">
                <p>
                  Etiam at risus et justo dignissim congue  lorem Etiam at risus et justo. The event takes place in the Alte Papierfabrik congue lorem Etiam at risus.
                  Learn more
                </p>
              </div>
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
  // speakers: PropTypes.array
}

export default Venue
