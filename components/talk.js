import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

import InternalLink from './link'

class Talk extends Component {
  render () {
    const date = dateFormatter.formatDate(this.props.date)

    return (
      <div className='talk'>
        <div className='grid__inner'>
          <div className='col-8'>
            <p className='talk__at'>
              Talk at FEC{this.props.year}
              {this.props.tags.map((tag, ii) => {
                return (
                  <InternalLink
                    page='talks'
                    detail='tag'
                    custom={tag}
                    title={`#${tag}`}
                    classes='talk__tag'
                    key={ii}
                  />
                )
              })}
            </p>
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

            {this.props.video
              ? <div
                className='talk__video'
                dangerouslySetInnerHTML={{
                  __html: this.props.video
                }}
              />
              : null}
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
  room: PropTypes.string,
  year: PropTypes.string,
  tags: PropTypes.array,
  video: PropTypes.string
}

export default Talk
