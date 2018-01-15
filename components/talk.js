import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

class Talk extends Component {
  render () {
    const date = dateFormatter.formatDate(this.props.date)

    return (
      <div className='talk'>
        <div className='grid__inner'>
          <div className='col-8'>
            <p className='talk__at'>Talk at FEC17</p>
            <h2 className='talk__title'>
              {this.props.title}
            </h2>
            <h4 className='talk__room'>
              {date} {this.props.fromTime} – {this.props.toTime},{' '}
              {this.props.room}
            </h4>
            <div
              className='talk__abstract'
              dangerouslySetInnerHTML={{ __html: this.props.abstract }}
            />
          </div>
        </div>
      </div>
    )
  }
}

Talk.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  date: PropTypes.string,
  fromTime: PropTypes.string,
  toTime: PropTypes.string,
  room: PropTypes.string
}

export default Talk
