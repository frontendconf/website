import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class News extends Component {
  formatDate (date) {
    return new Date(date).toLocaleDateString('en', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  render () {
    return <section className="news section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h2>News</h2>
          </div>
          {this.props.teasers.map((item, i) => {
            const date = this.formatDate(item.date)

            return <div className="col-4" key={i}>
              <h3 className="news__title">
                <InternalLink {...item} classes="news__link" />
              </h3>
              <time className="news__date">
                {date}
              </time>
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

News.propTypes = {
  teasers: PropTypes.array
}

export default News
