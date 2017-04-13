import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Workshop extends Component {
  render () {
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
  body: PropTypes.string
}

export default Workshop
