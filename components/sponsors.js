import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class Sponsors extends Component {
  render () {
    return <section className="sponsors section">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Sponsors
            </h2>
          </div>

          {this.props.sponsors.map((category, i) => {
            const teaser = category.teaser ? <div className={category.cssClassTeaser}>
              <div className="sponsors-board__info">
                <InternalLink {...category.teaser.link.fields} classes="sponsors-board__info-become">
                  <div dangerouslySetInnerHTML={{ __html: category.teaser.body }} />
                </InternalLink>
              </div>
            </div> : null

            return <div key={i}>
              <div className="col-12">
                <h3 className={'sponsors__title sponsors__title--' + category.cssClass}>
                  {category.title}
                </h3>
              </div>

              {category.items.map((item, i) => {
                return <div className={category.cssClassItems} key={i}>
                  <a href={item.link} className="sponsors-board__sponsor sponsors__link" target="_blank">
                    <img className="sponsors__logo" src={item.logo} alt={item.title} />
                  </a>
                </div>
              })}

              {teaser}
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Sponsors.propTypes = {
  sponsors: PropTypes.array
}

export default Sponsors
