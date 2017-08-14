import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import Talk from './talk'

class Speaker extends Component {
  render () {
    const twitter = this.props.twitter
      ? <span>
        <a href={'https://twitter.com/' + this.props.twitter} target='_blank'>
          {'@' + this.props.twitter}
        </a>
        <br />
      </span>
      : null
    const website = this.props.website
      ? <span>
        <a href={this.props.website} target='_blank'>
          {this.props.website}
        </a>
        <br />
      </span>
      : null
    const linkedin = this.props.linkedin
      ? <span>
        <a href={this.props.linkedin} target='_blank'>
          {this.props.linkedin}
        </a>
        <br />
      </span>
      : null
    const talk = this.props.talk ? <Talk {...this.props.talk} /> : null

    return (
      <section className='speaker section'>
        <div className='grid'>
          <div className='grid__inner'>
            <div className='col-12'>
              <h1>
                {this.props.name}
              </h1>

              <div className='speaker__profile'>
                <div className='col-3 speaker__profile-image'>
                  <LazyLoad offset={200}>
                    <img
                      className='person__image'
                      src={this.props.photo + '?w=350&h=350&fit=fill'}
                      alt={this.props.name}
                    />
                  </LazyLoad>
                </div>

                <div className='col-9 speaker__profile-text'>
                  <p className='speaker__profile-website'>
                    {this.props.description}
                  </p>

                  <p className='speaker__profile-website'>
                    {twitter}
                    {website}
                    {linkedin}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='grid__inner'>
            <div className='col-8 margin-top-large speaker__profile-text'>
              <div dangerouslySetInnerHTML={{ __html: this.props.bio }} />
            </div>
          </div>
          <div className='margin-top-large' id='talk'>
            {talk}
          </div>
          <div className='grid__inner'>
            <div className='col-12'>
              <h3 className='speakers__subtitle'>More Speakers</h3>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Speaker.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  biography: PropTypes.string,
  bio: PropTypes.string,
  photo: PropTypes.string,
  twitter: PropTypes.string,
  website: PropTypes.string,
  linkedin: PropTypes.string,
  talk: PropTypes.object,
  description: PropTypes.string
}

export default Speaker
