import React, { Component } from 'react'

class Newsletter extends Component {
  render () {
    return (
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
    )
  }
}

export default Newsletter
