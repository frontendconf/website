import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import InternalLink from './link'

class ScheduleItem extends Component {
  render () {
    const room = this.props.room
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const title = this.props.speaker ? (
      <InternalLink page='speakers' detail={this.props.speaker.fields.slug}>
        {this.props.speaker.fields.name}
      </InternalLink>
    ) : (
      this.props.title
    )
    const desc = this.props.speaker ? this.props.title : this.props.description
    const photo = this.props.speaker
      ? this.props.speaker.fields.photo.fields.file.url + '?w=60&h=60&fit=fill'
      : null
    const variant = this.props.showAbstractOnMobile
      ? 'schedule__item--details'
      : ''

    return (
      <div
        className={`col-xs-12 col-6 schedule__item schedule__${room} ${variant}`}
      >
        <div className='schedule__time'>
          <span className='schedule__from'>{this.props.fromTime} –</span>
          <span className='schedule__to'>{this.props.toTime}</span>
        </div>
        <div className='schedule__details'>
          {photo ? (
            <LazyLoad offset={200}>
              <img className='schedule__photo' src={photo} />
            </LazyLoad>
          ) : null}
          <h2 className='schedule__title'>{title}</h2>
          <p className='schedule__talk'>{desc}</p>
          <div
            className='schedule__abstract'
            dangerouslySetInnerHTML={{ __html: this.props.description }}
          />
        </div>
      </div>
    )
  }
}

ScheduleItem.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  date: PropTypes.string,
  fromTime: PropTypes.string,
  toTime: PropTypes.string,
  room: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  speaker: PropTypes.object,
  showAbstractOnMobile: PropTypes.bool
}

export default ScheduleItem
