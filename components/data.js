import React from 'react'
import PropTypes from 'prop-types'
import Error from 'next/error'
import contentful from '../lib/contentful'

function filterByType (item) {
  return item.sys.contentType.sys.id === this
}

function isActiveItem (slug, query, isMenu) {
  if (query.page && query.detail && !isMenu) {
    return query.detail === slug
  } else if (query.page) {
    return query.page === slug
  } else if (slug === '/') {
    return slug === '/'
  }
}

function getLeadMenu (items, type, query) {
  return items.filter(filterByType, type).map((item) => {
    const isActive = isActiveItem(item.fields.slug, query)
    let title = item.fields.name || item.fields.title

    if (type === 'host') {
      title += ' (Host)'
    }

    return {
      title,
      page: type + 's',
      detail: item.fields.slug,
      isActive
    }
  })
}

export default (Component) => {
  class Data extends React.Component {
    static async getInitialProps ({ query, res }) {
      const cachedResponse = (typeof window !== 'undefined' && window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props._raw) ? window.__NEXT_DATA__.props._raw : null
      const getData = cachedResponse ? Promise.resolve(cachedResponse) : contentful.getEntries()

      return getData.then((items) => {
        const configs = items.filter(filterByType, 'config')
        const config = configs.length ? configs[0].fields : {}
        const currentItem = items.find((item) => {
          return isActiveItem(item.fields.slug, query)
        })

        if (!currentItem && res) {
          res.statusCode = 404

          return {
            statusCode: 404
          }
        }

        // Exposed data
        const menu = config.menu.map((item) => {
          const isActive = isActiveItem(item.fields.slug, query, true)

          return {
            title: item.fields.menu || item.fields.title,
            slug: item.fields.slug,
            isActive: isActive,
            classes: item.fields.menuClass,
            menuButton: item.fields.menuButton
          }
        })

        const header = {
          menu: menu,
          menuButtons: menu.filter((item) => item.menuButton)
        }

        const footer = {
          ctas: config.footerCtas.filter((item) => item.fields).map((item) => {
            const title = item.fields.ctaText || item.fields.title

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
              iconCharacter: item.fields.iconCharacter,
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
        const currentPage = currentItem ? Object.assign({}, currentItem.fields) : null

        if (currentPageType === 'speakers') {
          currentPage.talk = items.filter(filterByType, 'talk').find((talk) => {
            return talk.fields.speaker && currentItem.sys.id === talk.fields.speaker.sys.id
          })
        }

        if (currentPage && currentPage.photo) {
          currentPage.photo = currentPage.photo.fields.file.url
        }

        if (currentPage && currentPage.bodyClass === 'home') {
          currentPage.isHome = true
        }

        if (currentPage && currentPage.teacher) {
          const teacher = {
            name: currentPage.teacher.fields.name,
            detail: currentPage.teacher.fields.slug,
            description: currentPage.teacher.fields.description,
            page: 'speakers',
            photo: currentPage.teacher.fields.photo ? (currentPage.teacher.fields.photo.fields.file.url + '?w=530&h=300&fit=fill') : null
          }

          currentPage.teacher = teacher
        }

        if (currentPage && currentPage.cta) {
          const cta = {
            title: currentPage.cta.fields.ctaText || currentPage.cta.fields.title,
            slug: currentPage.cta.fields.slug
          }

          currentPage.cta = cta
        }

        const lead = currentPage ? {
          title: query.detail ? (menu.find((item) => item.isActive) || {}).title : currentPage.title,
          body: currentPage.lead ? currentPage.lead.replace(/(?:\r\n|\r|\n)/g, '<br />') : null,
          ctas: currentPage.leadCtas ? currentPage.leadCtas.map((item) => {
            const title = item.fields.ctaText || item.fields.title

            return {
              title: title,
              slug: item.fields.slug
            }
          }) : [],
          teaser: currentPage.leadTeaser ? items.find((item) => item.sys.id === currentPage.leadTeaser.sys.id).fields : null,
          menu: query.detail && query.page !== 'news' ? getLeadMenu(items, currentItem.sys.contentType.sys.id, query) : [],
          isHome: currentPage.isHome
        } : null

        // Fallback
        if (!lead.title && ['speaker', 'host'].indexOf(currentItem.sys.contentType.sys.id) !== -1) {
          lead.title = 'Speakers'
        }

        // Merge speakers and hosts
        switch (currentItem.sys.contentType.sys.id) {
          case 'host':
            lead.menu = getLeadMenu(items, 'speaker', query).concat(lead.menu)
            break
          case 'speaker':
            lead.menu = lead.menu.concat(getLeadMenu(items, 'host', query))
            break
        }

        const news = currentPage && currentPage.showNews ? items.filter(filterByType, 'news').map((item) => {
          return {
            title: item.fields.title,
            page: 'news',
            detail: item.fields.slug,
            date: item.fields.date
          }
        }).sort((a, b) => new Date(b.date) - new Date(a.date)) : null

        const hosts = currentPage && currentPage.showSpeakers ? items.filter(filterByType, 'host').map((item) => {
          const photo = item.fields.photo ? (item.fields.photo.fields.file.url + '?w=530&h=300&fit=fill') : null

          return {
            name: item.fields.name,
            page: 'hosts',
            detail: item.fields.slug,
            description: item.fields.description,
            photo: photo,
            order: item.fields.order
          }
        }).sort((a, b) => a.order - b.order) : null

        const speakers = (currentPage && currentPage.showSpeakers) || (currentPage && currentPageType === 'speakers') ? items.filter(filterByType, 'speaker').map((item) => {
          const photo = item.fields.photo ? (item.fields.photo.fields.file.url + '?w=250&h=250&fit=fill') : null

          return {
            name: item.fields.name,
            page: 'speakers',
            detail: item.fields.slug,
            description: item.fields.description,
            photo: photo,
            order: item.fields.order
          }

        }).sort((a, b) => a.order - b.order) : null

				const schedule = currentPage && currentPage.showSchedule ? items.filter(filterByType, 'talk').map((item) => {
          return {
            title: item.fields.title,
            page: 'speakers',
            abstract: item.fields.abstract,
            from: item.fields.from,
						to: item.fields.to,
						day: new Date(item.fields.from).toLocaleDateString('de', {
							day: '2-digit',
				      month: '2-digit'
				    }).split('/').join(''),
						room: item.fields.room,
						speaker: item.fields.speaker,
						description: item.fields.shortDescription,
						sortTime: parseInt(new Date(item.fields.from).toLocaleTimeString('de', {
							hour: '2-digit',
							minute: '2-digit'
				    }).split(':'))
          }
				}) : null

        // }).sort((a, b) => new Date(...a.from.split('/').reverse()) - new Date(...b.from.split('/').reverse())) : null


        const workshops = currentPage && currentPage.showWorkshops ? items.filter(filterByType, 'workshop').map((item) => {
          const photo = item.fields.photo ? (item.fields.photo.fields.file.url + '?w=530&h=300&fit=fill') : null

          return {
            name: item.fields.title,
            page: 'workshops',
            detail: item.fields.slug,
            workshopGiver: item.fields.teacher.fields.name,
            description: item.fields.lead,
            photo: photo,
            order: item.fields.order
          }
        }).sort((a, b) => a.order - b.order) : null

        const venue = currentPage && currentPage.showVenue && config.venueTeaser ? Object.assign({}, items.find((item) => item.sys.id === config.venueTeaser.sys.id).fields) : null

        if (venue && venue.link && venue.link.fields) {
          venue.link = venue.link.fields.slug
        }

        const jobsPageOriginal = items.filter(filterByType, 'page').find((item) => item.fields.showJobsDetailed)
        const jobs = currentPage && (currentPage.showJobs || currentPage.showJobsDetailed) ? {
          isDetailed: currentPage.showJobsDetailed,
          page: jobsPageOriginal && !currentPage.showJobsDetailed ? Object.assign({}, jobsPageOriginal.fields) : null
        } : null

        let sponsors = currentPage && (currentPage.showSponsors || currentPage.showSponsorsDetailed) ? items.filter(filterByType, 'sponsorCategory').map((item) => {
          const teaser = item.fields.teaser && !currentPage.showSponsorsDetailed ? items.filter(filterByType, 'teaser').find((teaser) => {
            return teaser.sys.id === item.fields.teaser.sys.id
          }).fields : null

          return {
            title: item.fields.title,
            color: item.fields.color,
            level: item.fields.level,
            items: [],
            id: item.sys.id,
            cssClass: item.fields.cssClass,
            cssClassItems: item.fields.cssClassItems,
            teaser,
            cssClassTeaser: item.fields.cssClassTeaser
          }
        }).sort((a, b) => a.level - b.level) : null

        let sponsorshipCategories = currentPage && currentPage.showSponsorshipCategories ? items.filter(filterByType, 'sponsorCategory').map((item) => {
          const icon = item.fields.icon ? (item.fields.icon.fields.file.url + '?w=250&h=150&fit=pad') : null

          return {
            title: item.fields.title,
            price: item.fields.price,
            level: item.fields.level,
            availability: item.fields.availability,
            body: item.fields.body,
            icon
          }
        }).sort((a, b) => a.level - b.level) : null

        if (sponsors) {
          items.filter(filterByType, 'sponsor').forEach((item) => {
            const category = sponsors.find((category) => category.id === item.fields.category.sys.id)
            const logo = item.fields.logo ? item.fields.logo.fields.file.url : null

            if (!category) {
              return
            }

            category.items.push({
              title: item.fields.title,
              link: item.fields.link,
              twitter: item.fields.twitter,
              body: item.fields.body,
              logo,
              isDetailed: currentPage.showSponsorsDetailed,
              order: item.fields.order
            })
          })

          sponsors = sponsors.map((item) => {
            item.items = item.items.sort((a, b) => a.order - b.order)
            item.isDetailed = currentPage.showSponsorsDetailed

            return item
          })
        }

        const team = currentPage && currentPage.showTeam ? items.filter(filterByType, 'team').map((item) => {
          const photo = item.fields.photo ? item.fields.photo.fields.file.url : null

          return {
            name: item.fields.name,
            description: item.fields.description,
            twitter: item.fields.twitter,
            photo: photo,
            company: item.fields.company,
            companyLink: item.fields.companyLink,
            order: item.fields.order
          }
        }).sort((a, b) => a.order - b.order) : null

        const scripts = currentPage && currentPage.config && currentPage.config.scripts ? currentPage.config.scripts : []
        const styles = currentPage && currentPage.config && currentPage.config.styles ? currentPage.config.styles : []

        return {
          header,
          footer,
          currentPage,
          currentPageType,
          lead,
          news,
          hosts,
          speakers,
          workshops,
          venue,
          jobs,
					schedule,
          sponsors,
          sponsorshipCategories,
          team,
          scripts,
          styles,
          _raw: items
        }
      })
    }

    render () {
      if (this.props.statusCode) {
        return <Error statusCode={this.props.statusCode} />
      }

      return <Component {...this.props} />
    }
  }

  Data.propTypes = {
    statusCode: PropTypes.number
  }

  return Data
}
