import Head from 'next/head'
import React from 'react'
import Header from './header.js'

const Layout = ({ children, title = 'Frontend Conf', menu }) => {
  return <div>
    <Head>
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:300,400,400i,700" rel="stylesheet" />
      <link href={process.env.CDN + '/assets/css/default.css'} rel="stylesheet" />
    </Head>

    <Header menu={menu} />

    {children}
  </div>
}

Layout.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.array,
  menu: React.PropTypes.array,
  query: React.PropTypes.object
}

export default Layout

