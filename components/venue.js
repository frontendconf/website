import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import InternalLink from './link'

class Venue extends Component {
  render () {
    const title = this.props.link ? (
      <InternalLink slug={this.props.link} title={this.props.title} />
    ) : (
      this.props.title
    )

    return (
      <section className='venue'>
        <div className='venue__container'>
          <LazyLoad offset={200}>
            <div className='venue__image' />
          </LazyLoad>
          <div
            className={
              this.props.isVenue && this.props.map
                ? 'venue__inner venue__inner--map'
                : 'venue__inner'
            }
          >
            {this.props.isVenue && this.props.map ? (
              <div
                className='venue__map'
                dangerouslySetInnerHTML={{ __html: this.props.map }}
              />
            ) : (
              <div className='venue__content'>
                <div className='venue__head'>
                  <h2>{title}</h2>
                </div>
                <div className='venue__venue'>
                  <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

Venue.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  photo: PropTypes.object,
  link: PropTypes.string,
  map: PropTypes.string,
  isVenue: PropTypes.bool
}

export default Venue
