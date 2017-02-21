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
            isActive: query.path === slug
          }
        })
        const intro = config.length ? config[0].fields : null

        return {
          menu: menu,
          pages: pages,
          intro: intro
        }
      })
    }

    render () {
      return <Component {...this.props} />
    }
  }

  return Data
}
