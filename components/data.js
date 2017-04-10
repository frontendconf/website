import React from 'react'
import API from '../lib/api'

function filterByType (item) {
  return item.sys.contentType.sys.id === this
}

function isActiveItem (slug, query) {
  return query.page && query.page === slug || query.detail && query.detail === slug || !query.page && slug === '/'
}

export default (Component) => {
  class Data extends React.Component {
    static async getInitialProps ({ query }) {
      return API.getEntries().then((items) => {
        const configs = items.filter(filterByType, 'config')
        const config = configs.length ? configs[0].fields : {}
        const currentItem = items.find((item) => {
          return isActiveItem(item.fields.slug, query)
        })

        // Exposed data
        const header = {
          menu: config.menu.map((item) => {
            const isActive = isActiveItem(item.fields.slug, query)

            return {
              title: item.fields.menu || item.fields.title,
              slug: item.fields.slug,
              isActive: isActive
            }
          })
        }

        const footer = {
          ctas: config.footerCtas.map((item) => {
            const title = item.fields.cta || item.fields.title

            return {
              title: title,
              slug: item.fields.slug
            }
          }),
          menu: config.footerMenu.map((item) => {
            return {
              title: item.fields.title,
              slug: item.fields.slug
            }
          }),
          socialMedia: config.footerSocialMedia.map((item) => {
            return {
              title: item.fields.shortcode,
              alt: item.fields.title,
              url: item.fields.link
            }
          }),
          menuMeta: config.footerMenuMeta.map((item) => {
            return {
              title: item.fields.title,
              slug: item.fields.slug
            }
          })
        }

        const currentPageType = query.detail ? query.page : 'page'
        const currentPage = currentItem ? currentItem.fields : null

        if (currentPage && currentPage.photo) {
          currentPage.photo = currentPage.photo.fields.file.url
        }

        if (currentPage && currentPage.bodyClass === 'home') {
          currentPage.isHome = true
        }

        const lead = currentPage ? {
          title: currentPage.title,
          body: currentPage.lead ? currentPage.lead.replace(/(?:\r\n|\r|\n)/g, '<br />') : null,
          ctas: currentPage.leadCtas ? currentPage.leadCtas.map((item) => {
            const title = item.fields.cta || item.fields.title

            return {
              title: title,
              slug: item.fields.slug
            }
          }) : [],
          newsletter: currentPage.isHome,
          modifiers: currentPage.isHome ? ['bg-100'] : []
        } : null

        const news = currentPage && currentPage.showNews ? items.filter(filterByType, 'news').map((item) => {
          return {
            title: item.fields.title,
            page: 'news',
            detail: item.fields.slug,
            date: item.fields.date
          }
        }) : null

        const hosts = currentPage && currentPage.showSpeakers ? items.filter(filterByType, 'host').map((item) => {
          const photo = item.fields.photo ? item.fields.photo.fields.file.url : null

          return {
            name: item.fields.name,
            page: 'hosts',
            detail: item.fields.slug,
            description: item.fields.description,
            photo: photo
          }
        }) : null

        const speakers = currentPage && currentPage.showSpeakers ? items.filter(filterByType, 'speaker').map((item) => {
          const photo = item.fields.photo ? item.fields.photo.fields.file.url : null

          return {
            name: item.fields.name,
            page: 'speakers',
            detail: item.fields.slug,
            description: item.fields.description,
            photo: photo
          }
        }) : null

        const venue = currentPage && currentPage.showVenue && config.venueTeaser ? items.find((item) => {
          return item.sys.id === config.venueTeaser.sys.id
        }).fields : null

        const jobs = currentPage && currentPage.showJobs ? [] : null

        const sponsors = currentPage && currentPage.showSponsors ? [] : null

        return {
          header: header,
          footer: footer,

          currentPage: currentPage,
          currentPageType: currentPageType,

          lead: lead,
          news: news,
          hosts: hosts,
          speakers: speakers,
          venue: venue,
          jobs: jobs,
          sponsors: sponsors
        }
      })
    }

    render () {
      return <Component {...this.props} />
    }
  }

  return Data
}
