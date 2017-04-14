import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './person'
import InternalLink from './link'

class Workshop extends Component {
  render () {
    const cta = this.props.cta ? <InternalLink {...this.props.cta} classes="btn" /> : null

    return <section className="workshop section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-8">
            <h1>
              {this.props.title}
            </h1>

            <h2>
              {this.props.lead}
            </h2>

            <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
          </div>

          <div className="col-4">
            <Person {...this.props.teacher} />

            {cta}
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
  teacher: PropTypes.object,
  cta: PropTypes.object
}

export default Workshop
