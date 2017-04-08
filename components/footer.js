import React, { Component } from 'react'
import Newsletter from './newsletter'

class Footer extends Component {
  render () {
    return <footer className="footer section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-xs-6 col-1_5">
            <ul className="list">
              {this.props.buttons.map((page, i) => {
                return <li>
                  <a href={page.fields.slug} className="btn fix-size small center" key={i}>
                    {page.fields.title}
                  </a>
                </li>
              })}
            </ul>
          </div>
          <div className="col-xs-6 col-2_5">
            <ul className="navigation_list">
              {this.props.links.map((page, i) => {
                return <li>
                  <a href={page.fields.slug} className="" key={i}>
                    {page.fields.title}
                  </a>
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
                {this.props.social.map((item, i) => {
                  return <li>
                    <a href={item.fields.url} className="btn fix-size small center" key={i}>
                      {item.fields.shortcode}
                    </a>
                  </li>
                })}
              </ul>
            </div>
          </div>
          <div className="col-12 center margin-top-large">
            <ul className="list-inline">
              <li>2011-2017 Frontend Conference Zürich</li>

              {this.props.legal.map((page, i) => {
                return <li>
                  <a href={page.fields.slug} className="" key={i}>
                    {page.fields.title}
                  </a>
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
  buttons: React.PropTypes.array,
  links: React.PropTypes.array,
  social: React.PropTypes.array,
  legal: React.PropTypes.array
}

export default Footer
