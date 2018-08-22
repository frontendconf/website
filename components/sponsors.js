import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import InternalLink from './link'

class Sponsors extends Component {
  render () {
    return (
      <section>
        {this.props.sponsors.map((category, i) => {
          const title =
            i === 0 && !category.isDetailed ? (
              <div className='grid'>
                <div className='grid__inner'>
                  <div className='col-12'>
                    <h2>
                      <InternalLink slug='sponsors'>Sponsors</InternalLink>
                    </h2>
                  </div>
                </div>
              </div>
            ) : null

          const teaser = category.teaser ? (
            <div className={category.cssClassTeaser}>
              <div className='sponsors-board__info'>
                <InternalLink
                  {...category.teaser.link.fields}
                  classes='sponsors-board__info-become'
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: category.teaser.body }}
                  />
                </InternalLink>
              </div>
            </div>
          ) : null

          let sectionClasses = category.isDetailed
            ? i === 0
              ? 'sponsors section sponsors--detailed'
              : 'sponsors section'
            : (() => {
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

          return (
            <div className={sectionClasses} key={i}>
              {title}

              <div className='grid'>
                <div className='grid__inner'>
                  <div
                    className={
                      'sponsors-board__wrapper sponsors-board__wrapper--' +
                      category.cssClass
                    }
                    key={i}
                  >
                    <div className='col-12 sponsors-board__wrapper'>
                      <h3
                        className={
                          'sponsors__title sponsors__title--' +
                          category.cssClass
                        }
                      >
                        {category.title}
                      </h3>
                    </div>

                    {category.items.map((item, i) => {
                      const twitter = item.twitter ? (
                        <a href={'https://twitter.com/' + item.twitter}>
                          {'@' + item.twitter}
                        </a>
                      ) : null

                      const link = item.link ? (
                        <a href={item.link} className='sponsors__link'>
                          {item.link}
                        </a>
                      ) : null

                      return item.isDetailed ? (
                        <div
                          className={
                            'sponsors-board__wrapper sponsors-board__wrapper--detailed sponsors-board__wrapper--' +
                            category.cssClass
                          }
                          key={i}
                        >
                          <div className='col-12'>
                            <div className='sponsors__sponsor-line' />
                          </div>
                          <div className='col-4'>
                            <a
                              href={item.link}
                              className='sponsors__sponsor-link'
                            >
                              <LazyLoad offset={200}>
                                <img
                                  className='sponsors__logo'
                                  src={item.logo}
                                  alt={item.title}
                                />
                              </LazyLoad>
                            </a>
                          </div>
                          <div className='col-8'>
                            <div className='sponsors__sponsor'>
                              <h3 className='sponsors__sponsor-name'>
                                {item.title}
                              </h3>
                              <div
                                className='sponsors__sponsor-description'
                                dangerouslySetInnerHTML={{
                                  __html: item.body
                                }}
                              />
                              <p className='sponsors__sponsor-website'>
                                {twitter}
                                {link}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            'sponsors-board__column ' + category.cssClassItems
                          }
                          key={i}
                        >
                          <a
                            href={item.link}
                            className='sponsors-board__sponsor sponsors__link'
                            target='_blank'
                          >
                            <LazyLoad offset={200}>
                              <img
                                className='sponsors__logo'
                                src={item.logo}
                                alt={item.title}
                              />
                            </LazyLoad>
                          </a>
                        </div>
                      )
                    })}

                    {teaser}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    )
  }
}

Sponsors.propTypes = {
  sponsors: PropTypes.array
}

export default Sponsors
