import React, { Component } from 'react'

class NotFound extends Component {
  render () {
    return (
      <section className='content section'>
        <div className='grid'>
          <div className='grid__inner'>
            <div className='col-8'>
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default NotFound
