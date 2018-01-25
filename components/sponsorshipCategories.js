import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

class SponsorshipCategories extends Component {
  render () {
    const teaser = this.props.teaser
      ? <div className='col-4 sponsorship__teaser'>
        <a className='teaser' href={this.props.teaser.linkExternal}>
          <div dangerouslySetInnerHTML={{ __html: this.props.teaser.body }} />
        </a>
      </div>
      : null

    return (
      <section className='sponsors sponsorship section'>
        <div className='grid'>
          <div className='grid__inner eq-height'>
            <div className='col-12'>
              <h2>Categories</h2>
            </div>

            {this.props.categories.map((category, i) => {
              if (!category.body) {
                return null
              }

              const icon = category.icon
                ? <LazyLoad offset={200}>
                  <img
                    className='person__image'
                    src={category.icon}
                    alt={category.title}
                  />
                </LazyLoad>
                : null

              const availability = category.availability
                ? <span>
                    / <span>{category.availability}</span>
                </span>
                : null

              return (
                <div
                  className={i === 0 ? 'col--diamond col-4' : 'col-4'}
                  key={i}
                >
                  {icon}

                  <div>
                    <h3 className='sponsors__title'>
                      {category.title}
                    </h3>

                    <p>
                      <strong>
                        {category.price}
                        &nbsp;
                        {availability}
                      </strong>
                    </p>

                    <div dangerouslySetInnerHTML={{ __html: category.body }} />
                  </div>

                  {i === 0 ? teaser : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

SponsorshipCategories.propTypes = {
  categories: PropTypes.array,
  teaser: PropTypes.object
}

export default SponsorshipCategories
