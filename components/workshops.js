import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class Workshops extends Component {
  render () {
    return <section className="workshops section">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Workshops
            </h2>
          </div>
          {this.props.workshops.map((item, i) => {
            return <div className="col-6" key={i}>
              <div className="person">
                <InternalLink {...item} classes="person__image-container">
                  <img className="person__image" src={item.photo + '?w=530&h=300&fit=fill'} alt={item.name} />
                </InternalLink>

                <div className="person__caption">
                  <h3 className="person__title">
                    <InternalLink {...item} classes="person__link">
                      <span className="person__name">
                        {item.name}
                      </span>
                      <span className="person__job-title">
                        {item.description}
                      </span>
                    </InternalLink>
                  </h3>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Workshops.propTypes = {
  workshops: PropTypes.array
}

export default Workshops
