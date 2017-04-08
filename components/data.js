import React from 'react'
import API from '../lib/api'

function filterByType (item) {
  return item.sys.contentType.sys.id === this
}

export default (Component) => {
  class Data extends React.Component {
    static async getInitialProps ({ query }) {
      return API.getEntries().then((items) => {
        const config = items.filter(filterByType, 'config')
        const pages = items.filter(filterByType, 'page')
        const currentPage = pages.find((item) => {
          const slug = item.fields.slug

          return query.page && query.page === slug || !query.page && slug === '/'
        })
        const menu = config.length ? config[0].fields.menu.map((item) => {
          const slug = item.fields.slug

          return {
            title: item.fields.title,
            slug: slug,
            isActive: query.page === slug
          }
        }) : null
        const intro = config.length ? {
          title: config[0].fields.title,
          subtitle: config[0].fields.subtitle,
          startDate: config[0].fields.startDate,
          endDate: config[0].fields.endDate,
          location: config[0].fields.location,
          teasers: config[0].fields.teasers
        } : null
        const teasers = items.filter(filterByType, 'news').map((item) => {
          const slug = '/news/' + item.sys.id
          const date = new Date(item.fields.date).toLocaleDateString('en', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })

          return {
            title: item.fields.title,
            slug: slug,
            date: date
          }
        })
        const hosts = items.filter(filterByType, 'host').map((item) => {
          const slug = '/hosts/' + item.sys.id
          const photo = item.fields.photo ? item.fields.photo.fields.file.url : null

          return {
            name: item.fields.name,
            slug: slug,
            description: item.fields.description,
            photo: photo
          }
        })
        const speakers = items.filter(filterByType, 'speaker').map((item) => {
          const slug = '/speakers/' + item.sys.id
          const photo = item.fields.photo ? item.fields.photo.fields.file.url : null

          return {
            name: item.fields.name,
            slug: slug,
            description: item.fields.description,
            photo: photo
          }
        })
        const footer = config.length ? {
          buttons: [],
          links: [],
          social: [],
          legal: []
        } : null
        const venue = {}
        const jobs = []

        return {
          menu: menu,
          pages: pages,
          currentPage: currentPage,
          intro: intro,
          query: query,
          teasers: teasers,
          hosts: hosts,
          speakers: speakers,
          venue: venue,
          jobs: jobs,
          footer: footer
        }
      })
    }

    render () {
      return <Component {...this.props} />
    }
  }

  return Data
}
