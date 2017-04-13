import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

import config from '../config'
import Header from './header'
import Footer from './footer'
import Menu from './menu'
import MenuToggle from './menuToggle'

const Layout = ({ children, title = 'Frontend Conf', header, currentPage, footer }) => {
  const bodyClass = currentPage ? currentPage.bodyClass : null

  return <div className={bodyClass}>
    <Head>
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:300,400,400i,700" rel="stylesheet" />
      <link href={config.CDN + '/assets/css/default.css'} rel="stylesheet" />
      <link rel="shortcut icon" href={config.CDN + '/assets/images/favicon.png'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <Header {...header} />
    <MenuToggle checked={false} />

    <div className="offcanvasMain">
      {children}

      <Footer {...footer} />
    </div>

    <div className="offcanvasRight">
      <Menu items={header.menu} />
    </div>
  </div>
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  header: PropTypes.object,
  currentPage: PropTypes.object,
  footer: PropTypes.object
}

export default Layout
