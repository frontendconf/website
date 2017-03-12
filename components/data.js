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
        const pages = items.filter(filterByType, 'pages')
        const menu = items.filter(filterByType, 'menu').map((item) => {
          const page = item.fields.page
          const slug = page ? page.fields.slug : '#'

          return {
            title: item.fields.title,
            slug: slug,
            isActive: query.page === slug
          }
        })
        const intro = config.length ? config[0].fields : null
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
        const venue = {}
        const jobs = []

        return {
          menu: menu,
          pages: pages,
          intro: intro,
          query: query,
          teasers: teasers,
          hosts: hosts,
          speakers: speakers,
          venue: venue,
          jobs: jobs
        }
      })
    }

    render () {
      return <Component {...this.props} />
    }
  }

  return Data
}
