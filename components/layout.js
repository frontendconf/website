import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import config from '../config'

const Layout = ({ children, title = 'Frontend Conf', header, currentPage, footer }) => {
  const bodyClass = currentPage ? currentPage.bodyClass : null

  return <div className={bodyClass}>
    <Head>
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:300,400,400i,700" rel="stylesheet" />
      <link href={config.CDN + '/assets/css/default.css'} rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <Header {...header} />

    {children}

    <Footer {...footer} />
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
