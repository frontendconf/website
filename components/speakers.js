import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class Speakers extends Component {
  render () {
    return <section className="speakers section--bottom">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Speakers
            </h2>
          </div>
          {this.props.speakers.map((item, i) => {
            return <div className="col-xs-6 col-3" key={i}>
              <div className="person">
                <InternalLink {...item} classes="person__image-container">
                  <img className="person__image" src={item.photo + '?w=250&h=250&fit=fill'} alt={item.name} />
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
          {this.props.moreSpeakers ? <div className="col-xs-6 col-3">
            <InternalLink slug="speakers" classes="speakers__link">
              <span className="speakers__link-text">
                All speakers
              </span>
            </InternalLink>
          </div> : null}
        </div>
      </div>
    </section>
  }
}

Speakers.propTypes = {
  speakers: PropTypes.array,
  moreSpeakers: PropTypes.bool
}

export default Speakers
