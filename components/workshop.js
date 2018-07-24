import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './person'
import InternalLink from './link'

class Workshop extends Component {
  render () {
    const cta = this.props.cta
      ? <InternalLink {...this.props.cta} classes='btn' />
      : null

    return (
      <section className='workshop section'>
        <div className='grid'>
          <div className='grid__inner'>
            <div className='col-12'>
              <h1>
                {this.props.title}
              </h1>
            </div>
          </div>
          <div className='grid__inner'>
            <div className='col-8'>
              <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
            </div>

            <div className='col-4'>
              <div className='speaker__profile'>
                <Person {...this.props.teacher} />
              </div>

              {cta}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Workshop.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  body: PropTypes.string,
  teacher: PropTypes.object,
  cta: PropTypes.object
}

export default Workshop
