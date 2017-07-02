import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SponsorshipCategories extends Component {
  render () {
    return <section className="sponsors sponsorship section">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Categories
            </h2>
          </div>

          {this.props.categories.map((category, i) => {
            const icon = category.icon ? <img className="person__image" src={category.icon} alt={category.title} /> : null

            const availability = category.availability ? <span>
              / <span>{category.availability}</span>
            </span> : null

            return <div className="col-4" key={i}>
              {icon}

              <h3 className="sponsors__title">
                {category.title}
              </h3>

              <p>
                <span>{category.price}</span>
                {availability}<br /><br />
              </p>

              <div dangerouslySetInnerHTML={{ __html: category.body }} />
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

SponsorshipCategories.propTypes = {
  categories: PropTypes.array
}

export default SponsorshipCategories
