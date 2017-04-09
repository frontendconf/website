import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Speakers extends Component {
  render () {
    return <section className="speakers section--bottom">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h2>
              Speakers
            </h2>
          </div>
          {this.props.speakers.map((item, i) => {
            const photo = item.photo ? <a className="person__image-container" href={item.slug}>
              <img className="person__image" src={item.photo} alt={item.name} />
            </a> : null

            return <div className="col-xs-6 col-3" key={i}>
              <div className="person">
                {photo}

                <div className="person__caption">
                  <h3 className="person__title">
                    <a href={item.slug} className="person__link">
                      <span className="person__name">
                        {item.name}
                      </span>
                      <span className="person__job-title">
                        {item.description}
                      </span>
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          })}
          <div className="col-xs-6 col-3">
            <a href="/speakers" className="speakers__link">
              <span className="speakers__link-text">
                All speakers
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  }
}

Speakers.propTypes = {
  speakers: PropTypes.array
}

export default Speakers
