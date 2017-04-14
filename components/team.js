import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Team extends Component {
  render () {
    return <section className="speakers section--bottom">
      <div className="grid">
        <div className="grid__inner eq-height">
          <div className="col-12">
            <h2>
              Team
            </h2>
          </div>
          {this.props.team.map((item, i) => {
            const twitter = item.twitter ? <p>
              <a href={'https://twitter.com/' + item.twitter}>
                {'@' + item.twitter}
              </a>
            </p> : null

            return <div className="col-xs-6 col-3" key={i}>
              <div className="person">
                <img className="person__image" src={item.photo + '?w=250&h=250&fit=fill'} alt={item.name} />

                <div className="person__caption">
                  <h3 className="person__title">
                    <div className="person__name">
                      {item.name}
                    </div>
                    <div className="person__job-title">
                      {item.description}
                      {twitter}
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

Team.propTypes = {
  team: PropTypes.array
}

export default Team
