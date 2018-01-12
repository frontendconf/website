import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

import InternalLink from './link'

class News extends Component {
  render () {
    let news = this.props.teasers.map((item) => {
      item.date = dateFormatter.formatDate(item.date, 'D MMM YYYY')

      return item
    })

    if (this.props.currentTag) {
      news = news.filter((item) => {
        return item.tags.includes(this.props.currentTag)
      })
    }

    const itemsPerPage = 2
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
              {pages[this.props.currentPageIndex - 1] ? pages[this.props.currentPageIndex - 1].map((item, i) => {
                return (
                  <article className='blog__article margin-top-large' key={i}>
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
                      <span className='blog__article-info-tag'>#venue</span>
                      <span className='blog__article-info-tag'>#FEC17</span>
                    </div>
                    <div className='blog__article-text'>
                      {item.body}
                      <InternalLink {...item} classes='blog__article-more' />
                      <a
                        href='javascript:void(0)'
                        className='blog__article-more'
                      >
                          read more
                      </a>
                    </div>
                  </article>
                )
              }) : null}

              {/* TODO: Add routing */}
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
            </div>

            <aside className='col-4 margin-top-large' />
          </div>
        </div>
      </section>
      : <section className='news section'>
        <div className='grid'>
          <div className='grid__inner'>
            <div className='col-12'>
              <h2>News</h2>
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
  isNews: PropTypes.bool,
  currentPageIndex: PropTypes.number,
  currentTag: PropTypes.string
}

export default News
