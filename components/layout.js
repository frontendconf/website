import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

import config from '../config'
import Header from './header'
import Footer from './footer'
import Menu from './menu'
import MenuToggle from './menuToggle'

const Layout = ({
  children,
  title = 'Frontend Conf',
  url,
  header,
  currentPage,
  footer
}) => {
  const bodyClass = currentPage ? currentPage.bodyClass : null
  const metaTitle = currentPage
    ? currentPage.name || currentPage.contentTitle || currentPage.title
    : title
  const metaDescription = currentPage
    ? currentPage.lead || currentPage.description || ''
    : 'Zurich, Switzerland'
  const metaImage =
    currentPage && currentPage.photo
      ? currentPage.photo
      : '/static/images/fec-logo.svg' + config.ASSET_VERSION
  const metaUrl =
    url && url.query && url.query.detail
      ? `http://www.frontendconf.ch/${url.query.page}/${url.query.detail}`
      : `http://www.frontendconf.ch/${url.query.page}`

  return (
    <div className={bodyClass}>
      <Head>
        <title>
          {metaTitle}
        </title>
        <meta name='description' content={metaDescription} />
        <link rel='alternate' type='application/rss+xml' href='/feed' />
        <link
          href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:300,400,400i,700'
          rel='stylesheet'
        />
        <link
          href={'/static/css/default.css' + config.ASSET_VERSION}
          rel='stylesheet'
        />
        <link
          rel='shortcut icon'
          href={'/static/images/favicon.png' + config.ASSET_VERSION}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        {/* Schema.org meta for Google+ */}
        <meta itemProp='name' content={metaTitle} />
        <meta itemProp='description' content={metaDescription} />
        <meta itemProp='image' content={metaImage} />

        {/* Twitter meta */}
        <meta name='twitter:title' content={metaTitle} />
        <meta name='twitter:description' content={metaDescription} />

        {/* Open Graph Meta */}
        <meta property='og:title' content={metaTitle} />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:image' content={metaImage} />
        <meta property='og:url' content={metaUrl} />

        {/* Start of HubSpot Embed Code */}
        <script
          type='text/javascript'
          id='hs-script-loader'
          async
          defer
          src='//js.hs-scripts.com/1935562.js'
        />
      </Head>

      <Header {...header} />
      <MenuToggle checked={false} />

      <div className='offcanvasMain'>
        {children}

        <Footer {...footer} />
      </div>

      <div className='offcanvasRight'>
        <Menu items={header.menu} />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  url: PropTypes.object,
  header: PropTypes.object,
  currentPage: PropTypes.object,
  footer: PropTypes.object
}

export default Layout
