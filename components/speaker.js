import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Speaker extends Component {
  render () {
    const twitter = this.props.twitter ? <span>
      <a href={'https://twitter.com/' + this.props.twitter}>{'@' + this.props.twitter}</a><br />
    </span> : null
    const website = this.props.website ? <span>
      <a href={this.props.website}>{this.props.website}</a><br />
    </span> : null
    const linkedin = this.props.linkedin ? <span>
      <a href={this.props.linkedin}>{this.props.linkedin}</a><br />
    </span> : null

    return <section className="speaker section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h1>
              {this.props.name}
            </h1>

            <div className="speaker__profile">
              <div className="col-4 speaker__profile-image">
                <img className="person__image" src={this.props.photo + '?w=350&h=350&fit=fill'} alt={this.props.name} />
              </div>

              <div className="col-8 speaker__profile-text">
                <div dangerouslySetInnerHTML={{ __html: this.props.bio }} />

                <p className="speaker__profile-website">
                  {twitter}
                  {website}
                  {linkedin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

Speaker.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  biography: PropTypes.string,
  bio: PropTypes.string,
  photo: PropTypes.string,
  twitter: PropTypes.string,
  website: PropTypes.string,
  linkedin: PropTypes.string
}

export default Speaker
