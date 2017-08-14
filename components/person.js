import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import InternalLink from './link'

class Person extends Component {
  render () {
    const photo = <LazyLoad offset={200}>{this.props.detail
      ? <InternalLink {...this.props} classes='person__image-container'>
        <img
          className='person__image'
          src={this.props.photo}
          alt={this.props.name}
        />
      </InternalLink>
      : <img
        className='person__image'
        src={this.props.photo}
        alt={this.props.name}
      />
    }</LazyLoad>

    const twitter = this.props.twitter
      ? <p className='person__twitter'>
        <a href={'https://twitter.com/' + this.props.twitter} target='_blank'>
          {'@' + this.props.twitter}
        </a>
      </p>
      : null

    const company = this.props.company
      ? <span className='person__company'>
        <a href={this.props.companyLink} target='_blank'>
          {this.props.company}
        </a>
      </span>
      : null

    const workshopGiver = this.props.workshopGiver
      ? <span className='person__workshop'>
          with {this.props.workshopGiver}
      </span>
      : null

    let content = (
      <div>
        <span className='person__name'>
          {this.props.name}
        </span>
        <span className='person__job-title'>
          {workshopGiver}
          {this.props.description}
        </span>
      </div>
    )

    if (this.props.detail) {
      content = (
        <InternalLink {...this.props} classes='person__link'>
          {content}
        </InternalLink>
      )
    }

    return (
      <div className='person'>
        {photo}

        <div className='person__caption'>
          <h3 className='person__title'>
            {content}
            {company}
            {twitter}
          </h3>
        </div>
      </div>
    )
  }
}

Person.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  description: PropTypes.string,
  detail: PropTypes.string,
  twitter: PropTypes.string,
  company: PropTypes.string,
  companyLink: PropTypes.string,
  workshopGiver: PropTypes.string
}

export default Person
