import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'
import Person from './person'

class Workshops extends Component {
  render () {
    return <section className="workshops section">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Workshops
            </h2>
          </div>
          {this.props.workshops.map((item, i) => {
            return <div className="col-6" key={i}>
              <Person {...item} />
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Workshops.propTypes = {
  workshops: PropTypes.array
}

export default Workshops
