import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'

class Sponsors extends Component {
  render () {
    return <section>
      {this.props.sponsors.map((category, i) => {
        const title = i === 0 ? <div className="grid">
          <div className="grid__inner">
            <div className="col-12">
              <h2>
                Sponsors
              </h2>
            </div>
          </div>
        </div> : null

        const teaser = category.teaser ? <div className={category.cssClassTeaser}>
          <div className="sponsors-board__info">
            <InternalLink {...category.teaser.link.fields} classes="sponsors-board__info-become">
              <div dangerouslySetInnerHTML={{ __html: category.teaser.body }} />
            </InternalLink>
          </div>
        </div> : null

        let sectionClasses = (() => {
          switch (i) {
            case 0:
              return 'sponsors section'
            case 1:
              return 'section section--bottom'
            case this.props.sponsors.length - 1:
              return 'section partners section--small'
            default:
              return 'section sponsors--bottom section section--small'
          }
        })()

        return <div className={sectionClasses}>
          {title}

          <div className="grid">
            <div className="grid__inner">
              <div className={'sponsors-board__wrapper sponsors-board__wrapper--' + category.cssClass} key={i}>
                <div className="col-12 sponsors-board__wrapper">
                  <h3 className={'sponsors__title sponsors__title--' + category.cssClass}>
                    {category.title}
                  </h3>
                </div>

                {category.items.map((item, i) => {
                  const twitter = item.twitter ? <a href={'https://twitter.com/' + item.twitter}>
                    {'@' + item.twitter}
                  </a> : null

                  const link = item.link ? <a href={item.link} className="sponsors__link">
                    {item.link}
                  </a> : null

                  return item.isDetailed ? <div className={'sponsors-board__wrapper sponsors-board__wrapper--detailed sponsors-board__wrapper--' + category.cssClass} key={i}>
                    <div className="col-12">
                      <div className="sponsors__sponsor-line"></div>
                    </div>
                    <div className="col-4">
                      <a href={item.link} className="sponsors__sponsor-link">
                        <img className="sponsors__logo" src={item.logo} alt={item.title} />
                      </a>
                    </div>
                    <div className="col-8">
                      <div className="sponsors__sponsor">
                        <h3 className="sponsors__sponsor-name">{item.title}</h3>
                        <p className="sponsors__sponsor-description" dangerouslySetInnerHTML={{ __html: item.body }}>
                        </p>
                        <p className="sponsors__sponsor-website">
                          {twitter}
                          {link}
                        </p>
                      </div>
                    </div>
                  </div> : <div className={'sponsors-board__column ' + category.cssClassItems} key={i}>
                    <a href={item.link} className="sponsors-board__sponsor sponsors__link" target="_blank">
                      <img className="sponsors__logo" src={item.logo} alt={item.title} />
                    </a>
                  </div>
                })}

                {teaser}
              </div>
            </div>
          </div>
        </div>
      })}
    </section>
  }
}

Sponsors.propTypes = {
  sponsors: PropTypes.array
}

export default Sponsors
