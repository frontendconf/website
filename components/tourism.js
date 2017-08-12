import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './person'
import InternalLink from './link'

class Tourism extends Component {
  render () {
    return (
      <section
        className='hotels section'
      >
        <div className='grid'>
          <div className='grid__inner eq-height'>
            <div className='col-12'>
              <div dangerouslySetInnerHTML={{ __html: this.props.lead }} />
              <br />
            </div>
            {this.props.items.map((item, i) => {
              return (
                <a href={item.link} className='col-xs-6 col-3' key={i}>
                  <Person {...item} />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

Tourism.propTypes = {
  items: PropTypes.array,
  lead: PropTypes.string
}

export default Tourism
