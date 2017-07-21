import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Talk extends Component {
  formatDate (date) {
    return new Date(date).toLocaleDateString('de', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  render () {
    const date = this.formatDate(this.props.fields.date)

    return <div className="talk">
      <div className="grid__inner">
        <div className="col-8">
          <p className="talk__at">Talk at FEC17</p>
          <h2 className="talk__title">{this.props.fields.title}</h2>
          <h4 className="talk__room">{date} {this.props.fields.fromTime} – {this.props.fields.toTime}, {this.props.fields.room}</h4>
          <p className="talk__abstract">{this.props.fields.abstract}</p>
        </div>
      </div>
    </div>
  }
}

Talk.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  date: PropTypes.string,
  fromTime: PropTypes.string,
  toTime: PropTypes.string
}

export default Talk
