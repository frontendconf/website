import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InternalLink from './link'
// import Newsletter from './newsletter'

class Lead extends Component {
  render () {
    // DEV: Currently, the lead text is only visible on home
    const body =
      this.props.body && this.props.isHome
        ? <div
          className={
            this.props.isHome ? 'intro__content' : 'intro__content--light'
          }
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
        </div>
        : null

    const menu =
      this.props.menu && this.props.menu.length
        ? <div className='intro__menu'>
          <div className='grid'>
            <div className='grid__inner'>
              <div className='col-12'>
                <ul className='list'>
                  {this.props.menu.map((item, i) => {
                    return (
                      <li key={i}>
                        <InternalLink
                          {...item}
                          classes={item.isActive ? 'active' : null}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        : null

    const teaser = this.props.teaser
      ? <div className='col-12'>
        <span className='intro__teaser'>
          <div dangerouslySetInnerHTML={{ __html: this.props.teaser.body }} />
        </span>
      </div>
      : null

    const footerContent = this.props.isHome
      ? <div className='col-12'>
        <div className='intro__bottom-left'>
          {this.props.ctas.map((cta, i) => {
            return <InternalLink {...cta} classes='btn' key={i} />
          })}
        </div>

        {/* <div className='intro__bottom-right'>
          {this.props.isHome ? <Newsletter /> : null}
        </div> */}
      </div>
      : teaser

    const footer = footerContent
      ? <div className='intro__bottom-content'>
        <div className='grid'>
          <div className='grid__inner'>
            {footerContent}
          </div>
        </div>
      </div>
      : null

    let modifiers = this.props.title ? [this.props.title.toLowerCase()] : null

    if (footerContent) {
      modifiers.push('footer')
    }

    modifiers = modifiers.map(modifier => ` intro--${modifier}`).join('')

    return (
      <section
        className={
          this.props.isHome ? 'intro intro--bg-100' : 'intro' + modifiers
        }
      >
        <div className='intro__top-content'>
          <div className='grid'>
            <div className='grid__inner'>
              <div className='col-8'>
                <h1 className='intro__title'>
                  {this.props.title}
                </h1>
              </div>
              {body
                ? <div
                  className={
                    this.props.isHome
                      ? 'col-12'
                      : this.props.menu.length
                        ? 'col-12 margin-top-large'
                        : 'col-8 margin-top-large'
                  }
                >
                  {body}
                </div>
                : null}
              {!this.props.isHome && this.props.ctas
                ? <div className='col-4 margin-top-large right'>
                  {this.props.ctas.map((cta, i) => {
                    return <InternalLink {...cta} classes='btn' key={i} />
                  })}
                </div>
                : null}
            </div>
          </div>
        </div>

        {menu}

        {footer}
      </section>
    )
  }
}

Lead.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  menu: PropTypes.array,
  ctas: PropTypes.array,
  teaser: PropTypes.object,
  isHome: PropTypes.bool
}

export default Lead
