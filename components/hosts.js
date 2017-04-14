import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './person'

class Hosts extends Component {
  render () {
    return <section className="hosts section">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Hosts
            </h2>
          </div>
          {this.props.hosts.map((item, i) => {
            return <div className="col-6" key={i}>
              <Person {...item} />
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Hosts.propTypes = {
  hosts: PropTypes.array
}

export default Hosts
