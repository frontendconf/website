import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tourism extends Component {
  render () {
    return (
      <section className='hotels section'>
        <div className='grid'>
          <div className={this.props.isLarge ? 'grid__inner accomodation' : 'grid__inner eq-height'}>
            <div className='col-12'>
              <div dangerouslySetInnerHTML={{ __html: this.props.lead }} />
              <br />
            </div>
            {this.props.items.map((item, i) => {
              return (
                <div className={this.props.isLarge ? 'col-12' : 'col-3'} key={i}>
                  <div className={this.props.isLarge ? 'accomodation accomodation--large' : 'accomodation'}>
                    <a href={item.link} className="accomodation__link">
                      <span className="accomodation__image-container">
                        <img
                          className='accomodation__logo'
                          src={item.photo}
                          alt={item.name} />
                      </span>
                      <span className="accomodation__caption">
                        <h4 className="accomodation__title">{item.name}</h4>
                        <p className="accomodation__description">{item.description}</p>
                      </span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

Tourism.propTypes = {
  items: PropTypes.array,
  lead: PropTypes.string,
  isLarge: PropTypes.boolean
}

export default Tourism
