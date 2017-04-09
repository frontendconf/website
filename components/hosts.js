import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class Hosts extends Component {
  render () {
    return <section className="hosts section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h2>
              Hosts
            </h2>
          </div>
          {this.props.hosts.map((item, i) => {
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

Hosts.propTypes = {
  hosts: PropTypes.array
}

export default Hosts
