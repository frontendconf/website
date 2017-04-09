import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Teasers extends Component {
  render () {
    return <section className="news section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h2>News</h2>
          </div>
          {this.props.teasers.map((item, i) => {
            return <div className="col-4" key={i}>
              <h3 className="news__title">
                <a className="news__link" href={item.slug}>
                  {item.title}
                </a>
              </h3>
              <time className="news__date">
                {item.date}
              </time>
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Teasers.propTypes = {
  teasers: PropTypes.array
}

export default Teasers
