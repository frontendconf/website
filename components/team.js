import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './person'

class Team extends Component {
  render () {
    return <section className="speakers section--bottom">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Board members
            </h2>
          </div>
          {this.props.team.map((item, i) => {
            return <div className="col-xs-6 col-3" key={i}>
              <Person {...item} />
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Team.propTypes = {
  team: PropTypes.array
}

export default Team
