import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

import InternalLink from './link'

class News extends Component {
  render () {
    let news = this.props.teasers.map(item => {
      item.date = dateFormatter.formatDate(item.date, 'D MMM YYYY')

      return item
    })

    if (this.props.detailId) {
      news = news.filter(item => item._id !== this.props.detailId)
    }

    if (!this.props.isNews) {
      news = news.slice(0, 3)
    }

    if (this.props.currentTag) {
      news = news.filter(item => {
        return item.tags.includes(this.props.currentTag)
      })
    }

    const itemsPerPage = 10
    const pages = news
      .map((e, i) => {
        return i % itemsPerPage === 0 ? news.slice(i, i + itemsPerPage) : null
      })
      .filter(e => e)

    return this.props.isNews
      ? <section className='section'>
        <div className='grid'>
          <div className='grid__inner'>
            <div className='col-8'>
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
                              page='news'
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
                      page='news'
                      detail='page'
                      custom={`${this.props.currentPageIndex - 1}`}
                      title='«'
                    />
                    : null}
                  {pages.map((item, i) =>
                    <InternalLink
                      page='news'
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
                      page='news'
                      detail='page'
                      custom={`${this.props.currentPageIndex + 1}`}
                      title='»'
                    />
                    : null}
                </div>
                : null}

              {this.props.currentTag
                ? <div className='pagination padding-top-large'>
                  <InternalLink slug='news' title='» News overview' />
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
          {news.map((item, i) => {
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
                        page='news'
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
            <InternalLink slug='news' title='» News overview' />
          </div>
        </section>
        : <section className='news section'>
          <div className='grid'>
            <div className='grid__inner'>
              <div className='col-12'>
                <h2>
                  <InternalLink slug='news' title='News' />
                </h2>
              </div>
              {news.map((item, i) => {
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

News.propTypes = {
  teasers: PropTypes.array,
  contentTeasers: PropTypes.array,
  isNews: PropTypes.bool,
  detailId: PropTypes.string,
  currentPageIndex: PropTypes.number,
  currentTag: PropTypes.string
}

export default News
