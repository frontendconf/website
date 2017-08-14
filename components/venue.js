import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import InternalLink from './link'

class Venue extends Component {
  render () {
    const title = this.props.link
      ? <InternalLink slug={this.props.link} title={this.props.title} />
      : this.props.title

    return (
      <section className='venue'>
        <div className='venue__container'>
          <LazyLoad offset={200}>
            <div className='venue__image' />
          </LazyLoad>
          <div className='venue__inner'>
            <div className='venue__content'>
              <div className='venue__head'>
                <h2>
                  {title}
                </h2>
              </div>
              <div className='venue__venue'>
                <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
              </div>
            </div>
          </div>
        </div>
        <div className='venue__col-6' />
      </section>
    )
  }
}

Venue.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  photo: PropTypes.object,
  link: PropTypes.string
}

export default Venue
