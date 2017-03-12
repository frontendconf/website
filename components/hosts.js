import React, { Component } from 'react'

class Hosts extends Component {
  render () {
    return <section className="hosts section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h2>
              Hosts
            </h2>
          </div>
          {this.props.hosts.map((item, i) => {
            const photo = item.photo ? <a className="person__image-container" href={item.slug}>
              <img className="person__image" src={item.photo} alt={item.name} />
            </a> : null

            return <div className="col-6" key={i}>
              <div className="person">
                {photo}

                <div className="person__caption">
                  <h3 className="person__title">
                    <a href={item.slug} className="person__link">
                      <span className="person__name">
                        {item.name}
                      </span>
                      <span className="person__job-title">
                        {item.description}
                      </span>
                    </a>
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

Hosts.propTypes = {
  hosts: React.PropTypes.array
}

export default Hosts
