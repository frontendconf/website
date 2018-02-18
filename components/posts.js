import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

import InternalLink from './link'

class Posts extends Component {
  render () {
    let items = this.props.items.map(item => {
      item.date = dateFormatter.formatDate(item.date, 'D MMM YYYY')

      return item
    })

    if (this.props.detailId) {
      items = items.filter(item => item._id !== this.props.detailId)
    }

    if (this.props.isHome) {
      items = items.slice(0, 3)
    }

    if (this.props.currentTag) {
      items = items.filter(item => {
        return item.tags.includes(this.props.currentTag)
      })
    }

    const itemsPerPage = 10
    const pages = items
      .map((e, i) => {
        return i % itemsPerPage === 0 ? items.slice(i, i + itemsPerPage) : null
      })
      .filter(e => e)

    return !this.props.isHome
      ? <section className='section'>
        <div className='grid'>
          <div className='grid__inner'>
            <div className='col-8'>
              {this.props.currentTag ? <h1 className='blog__title'>
                {this.props.type === 'talks' ? 'Talks' : 'All'} about <span className="blog__title-tag">#{this.props.currentTag}</span>
              </h1> : null}
              {pages[this.props.currentPageIndex - 1]
                ? pages[this.props.currentPageIndex - 1].map((item, i) => {
                  return (
                    <article
                      className={`blog__article ${i > 0
                        ? 'padding-top-large'
                        : ''}`}
                      key={i}
                    >
                      <h2 className='blog__article-title'>
                        <InternalLink
                          {...item}
                          classes='blog__article-title-link'
                        />
                      </h2>
                      <div className='blog__article-info'>
                        <span className='blog__article-info-date'>
                          {item.date}
                        </span>
                        {item.tags.map((tag, ii) => {
                          return (
                            <InternalLink
                              page={this.props.type}
                              detail='tag'
                              custom={tag}
                              title={`#${tag}`}
                              classes='blog__article-info-tag'
                              key={ii}
                            />
                          )
                        })}
                      </div>
                      <div className='blog__article-text'>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.bodyShortened
                          }}
                        />
                            &ensp;
                        <InternalLink
                          {...item}
                          title='Read more'
                          classes='blog__article-more'
                        />
                      </div>
                    </article>
                  )
                })
                : null}

              {pages.length > 1
                ? <div className='pagination padding-top-large'>
                  {this.props.currentPageIndex > 1
                    ? <InternalLink
                      page={this.props.type}
                      detail='page'
                      custom={`${this.props.currentPageIndex - 1}`}
                      title='«'
                    />
                    : null}
                  {pages.map((item, i) =>
                    <InternalLink
                      page={this.props.type}
                      detail='page'
                      custom={`${i + 1}`}
                      title={`${i + 1}`}
                      classes={
                        i === this.props.currentPageIndex - 1
                          ? 'active'
                          : null
                      }
                      key={i}
                    />
                  )}
                  {this.props.currentPageIndex < pages.length
                    ? <InternalLink
                      page={this.props.type}
                      detail='page'
                      custom={`${this.props.currentPageIndex + 1}`}
                      title='»'
                    />
                    : null}
                </div>
                : null}

              {this.props.detailId || this.props.currentTag
                ? <div className='pagination padding-top-large'>
                  <InternalLink slug={this.props.overview || this.props.type} title='» Overview' />
                </div>
                : null}
            </div>

            <aside className='col-4 margin-top-large'>
              {this.props.contentTeasers.map((item, i) => {
                return (
                  <div key={i}>
                    {item.link
                      ? <InternalLink slug={item.link} classes='teaser'>
                        <span
                          dangerouslySetInnerHTML={{ __html: item.body }}
                        />
                      </InternalLink>
                      : <div className='teaser'>
                        <span
                          dangerouslySetInnerHTML={{ __html: item.body }}
                        />
                      </div>}
                  </div>
                )
              })}
            </aside>
          </div>
        </div>
      </section>
      : this.props.detailId
        ? <section className='blog__next-articles'>
          <h2 className='blog__next-articles-title'>Read next</h2>
          {items.map((item, i) => {
            return (
              <div className='blog__article' key={i}>
                <h3 className='blog__article-title'>
                  <InternalLink {...item} classes='news__link' />
                </h3>
                <div className='blog__article-info'>
                  <span className='blog__article-info-date'>
                    {item.date}
                  </span>
                  {item.tags.map((tag, ii) => {
                    return (
                      <InternalLink
                        page={this.props.type}
                        detail='tag'
                        custom={tag}
                        title={`#${tag}`}
                        classes='blog__article-info-tag'
                        key={ii}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div className='pagination padding-top-large'>
            <InternalLink slug={this.props.type} title='» Overview' />
          </div>
        </section>
        : <section className='news section'>
          <div className='grid'>
            <div className='grid__inner'>
              <div className='col-12'>
                <h2>
                  <InternalLink slug={this.props.type} title='News' />
                </h2>
              </div>
              {items.map((item, i) => {
                return (
                  <div className='col-4' key={i}>
                    <h3 className='news__title'>
                      <InternalLink {...item} classes='news__link' />
                    </h3>
                    <time className='news__date'>
                      {item.date}
                    </time>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
  }
}

Posts.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  contentTeasers: PropTypes.array,
  isHome: PropTypes.bool,
  detailId: PropTypes.string,
  currentPageIndex: PropTypes.number,
  currentTag: PropTypes.string,
  overview: PropTypes.string
}

export default Posts
