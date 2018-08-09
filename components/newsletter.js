import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Newsletter extends Component {
  render () {
    return (
      <div
        className={`newsletter${
          this.props.isTeaser ? ' newsletter--teaser' : ''
        }`}
      >
        {this.props.isTeaser ? (
          <p className='newsletter__text'>
            Stay tuned with our newsletter and get all the hot stuff directly in
            your inbox. You know the drill.
          </p>
        ) : null}

        <form
          className='form'
          action='//frontendconf.us2.list-manage.com/subscribe/post?u=d6e0840333568eaec22d009ab&amp;id=d822473667'
          method='post'
          id='mc-embedded-subscribe-form'
          name='mc-embedded-subscribe-form'
          target='_blank'
        >
          <label className='form__label form__label--hidden' htmlFor='email'>
            E-Mail
          </label>
          <input
            className='form__input'
            id='email'
            name='EMAIL'
            type='email'
            placeholder='NEWSLETTER'
          />
          <button type='submit' className='btn btn--dark'>
            Sign up
          </button>
        </form>
      </div>
    )
  }
}

Newsletter.propTypes = {
  isTeaser: PropTypes.bool
}

export default Newsletter
