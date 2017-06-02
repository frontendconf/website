import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './person'
import InternalLink from './link'

class Speakers extends Component {
  render () {
    return <section className="speakers section--bottom">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Speakers
            </h2>
          </div>
          {this.props.speakers.map((item, i) => {
            return <div className="col-xs-6 col-3" key={i}>
              <Person {...item} />
            </div>
          })}
          {this.props.moreSpeakers ? <div className="col-xs-6 col-3">
            <InternalLink slug="speakers" classes="speakers__link">
              <span className="speakers__link-text">
                All speakers
              </span>
            </InternalLink>
          </div> : null}
        </div>
      </div>
    </section>
  }
}

Speakers.propTypes = {
  speakers: PropTypes.array,
  moreSpeakers: PropTypes.bool
}

export default Speakers
