import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'
import Newsletter from './newsletter'

class Footer extends Component {
  render () {
    return <footer className="footer section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-xs-6 col-1_5">
            <ul className="list">
              {this.props.ctas.map((cta, i) => {
                return <li key={i}>
                  <InternalLink {...cta} classes="btn fix-size small center" />
                </li>
              })}
            </ul>
          </div>
          <div className="col-xs-6 col-2_5">
            <ul className="navigation_list">
              {this.props.menu.map((item, i) => {
                return <li key={i}>
                  <InternalLink {...item} />
                </li>
              })}
            </ul>
          </div>
          <div className="col-xs-6 col-2_5 right">
            <div className="newsletter margin-bottom-normal">
              <Newsletter />
            </div>
            <div className="social">
              <ul className="list-inline">
                {this.props.socialMedia.map((item, i) => {
                  return <li key={i}>
                    <a href={item.url} className="btn fix-size small center socialicon" title={item.alt} target="_blank" dangerouslySetInnerHTML={{ __html: item.iconCharacter }} />
                  </li>
                })}
              </ul>
            </div>
          </div>
          <div className="col-12 center margin-top-large">
            <ul className="list-inline">
              <li>2011-2017 Frontend Conference Zürich</li>

              {this.props.menuMeta.map((item, i) => {
                return <li key={i}>
                  <InternalLink {...item} />
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  }
}

Footer.propTypes = {
  ctas: PropTypes.array,
  menu: PropTypes.array,
  socialMedia: PropTypes.array,
  menuMeta: PropTypes.array
}

export default Footer
