import React from 'react'
import PropTypes from 'prop-types'
import Error from 'next/error'
import contentful from '../lib/contentful'
import dateFormatter from '../lib/dateFormatter'
import Feed from '../lib/feed'

function filterByType (item) {
  return item.sys.contentType.sys.id === this
}

function filterByTag (item) {
  return !this || (item.tags && item.tags.includes(this))
}

function isActiveItem (slug, query, isMenu) {
  if (
    query.page &&
    query.detail &&
    !['page', 'tag'].includes(query.detail) &&
    !isMenu
  ) {
    return query.detail === slug
  } else if (query.page) {
    return query.page === slug
  } else if (slug === '/') {
    return slug === '/'
  }
}

function getLeadMenu (items, type, query, filterTag) {
  return items
    .filter(filterByType, type)
    .map(item => {
      const isActive = isActiveItem(item.fields.slug, query)
      let title = item.fields.name || item.fields.title

      if (type === 'host') {
        title += ' (Host)'
      }

      return {
        title,
        page: type + 's',
        detail: item.fields.slug,
        isActive,
        tags: item.fields.tags
          ? item.fields.tags.map(tag => {
            return tag.fields.title
          })
          : []
      }
    })
    .filter(filterByTag, filterTag)
    .sort((a, b) => a.order - b.order)
}

export default Component => {
  class Data extends React.Component {
    static async getInitialProps ({ query, res }) {
      const cachedResponse =
        typeof window !== 'undefined' &&
        window.__NEXT_DATA__ &&
        window.__NEXT_DATA__.props &&
        window.__NEXT_DATA__.props._raw
          ? window.__NEXT_DATA__.props._raw
          : null
      const getData = cachedResponse
        ? Promise.resolve(cachedResponse)
        : contentful.getEntries()

      return getData.then(items => {
        const configs = items.filter(filterByType, 'config')
        const config = configs.length ? configs[0].fields : {}
        const currentItem = items.find(item => {
          return isActiveItem(item.fields.slug, query)
        })
        const filterTag = config.filterTag
          ? config.filterTag.fields.title
          : null

        const news = items
          .filter(filterByType, 'news')
          .map(item => {
            return {
              title: item.fields.title,
              page: 'news',
              detail: item.fields.slug,
              date: item.fields.date,
              bodyShortened: item.fields.bodyShortened,
              body: item.fields.body,
              tags: item.fields.tags
                ? item.fields.tags.map(tag => {
                  return tag.fields.title
                })
                : [],
              _id: item.sys.id
            }
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date))

        // Feeds
        if (query && query.page === 'feed') {
          const feed = Feed(news)

          res.setHeader('content-type', 'application/rss+xml')

          switch (query.detail) {
            case 'json':
              return res.send(feed.json1())
            case 'atom':
              return res.send(feed.atom1())
            default:
              return res.send(feed.rss2())
          }
        }

        // Redirects
        if (
          currentItem &&
          currentItem.sys.contentType.sys.id === 'redirect' &&
          currentItem.fields.url &&
          res
        ) {
          res.setHeader('Location', currentItem.fields.url)
          res.statusCode = 302
          res.end()

          return {}
        }

        // 404
        if (!currentItem && res) {
          res.statusCode = 404

          return {
            statusCode: 404
          }
        }

        // Exposed data
        const menu = config.menu.map(item => {
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
          menuButtons: menu.filter(item => item.menuButton)
        }

        const footer = {
          ctas: config.footerCtas.filter(item => item.fields).map(item => {
            const title = item.fields.ctaText || item.fields.title

            return {
              title: title,
              slug: item.fields.slug
            }
          }),
          menu: config.footerMenu.map(item => {
            return {
              title: item.fields.title,
              slug: item.fields.slug
            }
          }),
          socialMedia: config.footerSocialMedia.map(item => {
            return {
              iconCharacter: item.fields.iconCharacter,
              alt: item.fields.title,
              url: item.fields.link
            }
          }),
          menuMeta: config.footerMenuMeta.map(item => {
            return {
              title: item.fields.title,
              slug: item.fields.slug
            }
          })
        }

        const currentPageType = query.detail ? query.page : 'page'
        const currentPage = currentItem
          ? Object.assign(
            {
              _id: currentItem.sys.id
            },
            currentItem.fields
          )
          : null

        if (currentPageType === 'speakers') {
          const talks = items
            .filter(filterByType, 'talk')
            .filter(talk => {
              return (
                talk.fields.speaker &&
                currentItem.sys.id === talk.fields.speaker.sys.id
              )
            })
            .map(talk => {
              return Object.assign({}, talk.fields, {
                year: dateFormatter.formatYear(talk.fields.date),
                tags: talk.fields.tags
                  ? [] // talk.fields.tags.map(tag => tag.fields.title)
                  : []
              })
            })
            .sort((a, b) => a.year - b.year)

          currentPage.talks = talks
        }

        if (currentPage && currentPage.photo) {
          currentPage.photo = currentPage.photo.fields.file.url
        }

        if (currentPage && currentPage.specialPage === 'home') {
          currentPage.isHome = true
        }

        if (currentPage && currentPage.specialPage === 'news') {
          currentPage.isNews = true
        }

        if (currentPage && currentPage.specialPage === 'venue') {
          currentPage.isVenue = true
        }

        if (
          query.detail &&
          ['news', 'talks'].includes(query.page) &&
          !query.custom
        ) {
          if (query.custom === 'tag') {
            currentPage.contentTitle = `All about #${query.custom}`
          } else {
            currentPage.contentTitle = currentPage.title
          }

          if (query.page === 'news') {
            currentPage.title = 'News'
          } else {
            currentPage.title = 'Talks'

            currentPage.body = currentPage.abstract
          }

          currentPage.isPostDetail = true

          currentPage.tags = currentPage.tags
            ? currentPage.tags.map(tag => {
              return tag.fields.title
            })
            : []
        }

        const currentPageIndex =
          query.detail === 'page' && !isNaN(parseInt(query.custom, 10))
            ? parseInt(query.custom, 10)
            : 1

        const currentTag = query.detail === 'tag' ? query.custom : null

        if (currentPage && currentPage.teacher) {
          const teacher = {
            name: currentPage.teacher.fields.name,
            detail: currentPage.teacher.fields.slug,
            description: currentPage.teacher.fields.description,
            page: 'speakers',
            photo: currentPage.teacher.fields.photo
              ? currentPage.teacher.fields.photo.fields.file.url +
                '?w=530&h=300&fit=fill'
              : null
          }

          currentPage.teacher = teacher
        }

        if (currentPage && currentPage.cta) {
          const cta = {
            title:
              currentPage.cta.fields.ctaText || currentPage.cta.fields.title,
            slug: currentPage.cta.fields.slug
          }

          currentPage.cta = cta
        }

        const lead = currentPage
          ? {
            title: query.detail
              ? (menu.find(item => item.isActive) || currentPage).title
              : currentPage.title,
            body: currentPage.lead
              ? currentPage.lead.replace(/(?:\r\n|\r|\n)/g, '<br />')
              : null,
            ctas: currentPage.leadCtas
              ? currentPage.leadCtas.map(item => {
                const title = item.fields.ctaText || item.fields.title

                return {
                  title: title,
                  slug: item.fields.slug
                }
              })
              : [],
            teaser: currentPage.leadTeaser
              ? items.find(
                item => item.sys.id === currentPage.leadTeaser.sys.id
              ).fields
              : null,
            menu:
                query.detail &&
                !['tag', 'page'].includes(query.detail) &&
                query.page !== 'news'
                  ? getLeadMenu(
                    items,
                    currentItem.sys.contentType.sys.id,
                    query,
                    filterTag
                  )
                  : [],
            isHome: currentPage.isHome
          }
          : null

        // Fallback
        if (
          !(lead && lead.title) &&
          ['speaker', 'host'].indexOf(currentItem.sys.contentType.sys.id) !== -1
        ) {
          lead.title = 'Speakers'
        }

        // Merge speakers and hosts
        switch (currentItem.sys.contentType.sys.id) {
          case 'host':
            lead.menu = getLeadMenu(items, 'speaker', query, filterTag).concat(
              lead.menu
            )
            break
          case 'speaker':
            lead.menu = lead.menu.concat(
              getLeadMenu(items, 'host', query, filterTag)
            )
            break
        }

        const showNews =
          currentPage && (currentPage.showNews || query.page === 'news')
            ? news
            : null

        const hosts =
          (currentPage && currentPage.showSpeakers) ||
          (currentPage && currentPageType === 'speakers') ||
          (currentPage && currentPageType === 'hosts')
            ? items
              .filter(filterByType, 'host')
              .map(item => {
                const photo = item.fields.photo
                  ? item.fields.photo.fields.file.url +
                      '?w=530&h=300&fit=fill'
                  : null

                return {
                  name: item.fields.name,
                  page: 'hosts',
                  detail: item.fields.slug,
                  description: item.fields.description,
                  photo: photo,
                  order: item.fields.order,
                  tags: item.fields.tags
                    ? item.fields.tags.map(tag => {
                      return tag.fields.title
                    })
                    : []
                }
              })
              .filter(filterByTag, filterTag)
              .sort((a, b) => a.order - b.order)
            : null

        const speakers =
          (currentPage && currentPage.showSpeakers) ||
          (currentPage && currentPageType === 'speakers') ||
          (currentPage && currentPageType === 'hosts')
            ? items
              .filter(filterByType, 'speaker')
              .map(item => {
                const photo = item.fields.photo
                  ? item.fields.photo.fields.file.url +
                      '?w=250&h=250&fit=fill'
                  : null

                return {
                  name: item.fields.name,
                  page: 'speakers',
                  detail: item.fields.slug,
                  description: item.fields.description,
                  photo: photo,
                  order: item.fields.order,
                  tags: item.fields.tags
                    ? item.fields.tags.map(tag => {
                      return tag.fields.title
                    })
                    : []
                }
              })
              .filter(filterByTag, filterTag)
              .sort((a, b) => a.order - b.order)
            : null

        let schedule = null

        // Set up schedule
        if (currentPage && currentPage.showSchedule) {
          schedule = {}

          items
            .filter(filterByType, 'talk')
            .map(item => {
              return {
                title: item.fields.title,
                page: 'schedule',
                abstract: item.fields.abstract,
                from: item.fields.from,
                to: item.fields.to,
                day: item.fields.date,
                fromTime: item.fields.fromTime,
                toTime: item.fields.toTime,
                room: item.fields.room,
                speaker: item.fields.speaker,
                description: item.fields.shortDescription,
                sortTime: item.fields.fromTime
                  ? item.fields.fromTime.split(':').join('')
                  : null,
                sortRoom: item.fields.room.charCodeAt(0),
                showAbstractOnMobile: item.fields.showAbstractOnMobile,
                tags: item.fields.tags
                  ? item.fields.tags.map(tag => {
                    return tag.fields.title
                  })
                  : []
              }
            })
            .filter(filterByTag, filterTag)
            .forEach(talk => {
              let sortDay = dateFormatter.formatDate(talk.day, 'MMDD')

              // Set up day
              schedule[sortDay] = schedule[sortDay] || {
                day: dateFormatter.formatDate(talk.day, 'dddd, D MMM'),
                slots: {}
              }

              // Set up slot
              // eslint-disable-next-line
              schedule[sortDay].slots[talk.sortTime] = schedule[sortDay].slots[
                talk.sortTime
              ] || {
                  slot: {
                    fromTime: talk.fromTime,
                    toTime: talk.toTime,
                    day: talk.day
                  },
                  talks: []
                }

              // Add talk to slot
              schedule[sortDay].slots[talk.sortTime].talks.push(talk)
            })

          // Sort schedule by day and transform to array
          schedule = Object.keys(schedule)
            .sort((a, b) => a - b)
            .map(day => schedule[day])
            .map(day => {
              // Sort slots by time and transform array
              day.slots = Object.keys(day.slots)
                .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
                .map(slot => {
                  slot = day.slots[slot]

                  // Sort talks
                  slot.talks = slot.talks.sort(
                    (a, b) => a.sortRoom - b.sortRoom
                  )

                  return slot
                })

              return day
            })
        }

        const workshops =
          currentPage && currentPage.showWorkshops
            ? items
              .filter(filterByType, 'workshop')
              .map(item => {
                const photo = item.fields.photo
                  ? item.fields.photo.fields.file.url +
                      '?w=530&h=300&fit=fill'
                  : null

                return {
                  name: item.fields.title,
                  page: 'workshops',
                  detail: item.fields.slug,
                  workshopGiver: item.fields.teacher.fields.name,
                  description: item.fields.lead,
                  photo: photo,
                  order: item.fields.order,
                  tags: item.fields.tags
                    ? item.fields.tags.map(tag => {
                      return tag.fields.title
                    })
                    : []
                }
              })
              .filter(filterByTag, filterTag)
              .sort((a, b) => a.order - b.order)
            : null

        const talks =
          query.page === 'talks'
            ? items
              .filter(filterByType, 'talk')
              .filter(item => item.fields.speaker)
              .map(item => {
                const speaker = items
                  .filter(filterByType, 'speaker')
                  .find(
                    speaker => speaker.sys.id === item.fields.speaker.sys.id
                  )

                return {
                  title: item.fields.title,
                  page: 'speakers',
                  detail: `${speaker.fields.slug}#talk`,
                  date: item.fields.date,
                  bodyShortened:
                      item.fields.shortDescription || item.fields.abstract,
                  body: item.fields.abstract,
                  tags: item.fields.tags
                    ? item.fields.tags.map(tag => {
                      return tag.fields.title
                    })
                    : [],
                  _id: item.sys.id
                }
              })
              .sort((a, b) => new Date(b.date) - new Date(a.date))
            : null

        const venue =
          currentPage && currentPage.showVenue && config.venueTeaser
            ? Object.assign(
              {},
              items.find(item => item.sys.id === config.venueTeaser.sys.id)
                .fields
            )
            : null

        if (venue && venue.link && venue.link.fields) {
          venue.link = venue.link.fields.slug
        }

        if (venue && config.map) {
          venue.map = config.map
        }

        const jobsPageOriginal = items
          .filter(filterByType, 'page')
          .find(item => item.fields.showJobsDetailed)
        const jobs =
          currentPage && (currentPage.showJobs || currentPage.showJobsDetailed)
            ? {
              isDetailed: currentPage.showJobsDetailed,
              page:
                  jobsPageOriginal && !currentPage.showJobsDetailed
                    ? Object.assign({}, jobsPageOriginal.fields)
                    : null
            }
            : null

        let sponsors =
          currentPage &&
          (currentPage.showSponsors || currentPage.showSponsorsDetailed)
            ? items
              .filter(filterByType, 'sponsorCategory')
              .map(item => {
                const teaser =
                    item.fields.teaser && !currentPage.showSponsorsDetailed
                      ? items.filter(filterByType, 'teaser').find(teaser => {
                        return teaser.sys.id === item.fields.teaser.sys.id
                      }).fields
                      : null

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
              })
              .sort((a, b) => a.level - b.level)
            : null

        let sponsorshipCategories =
          currentPage && currentPage.showSponsorshipCategories
            ? items
              .filter(filterByType, 'sponsorCategory')
              .map(item => {
                const icon = item.fields.icon
                  ? item.fields.icon.fields.file.url + '?w=250&h=150&fit=pad'
                  : null
                const teaser = item.fields.teaserOverview
                  ? items.filter(filterByType, 'teaser').find(teaser => {
                    return (
                      teaser.sys.id === item.fields.teaserOverview.sys.id
                    )
                  }).fields
                  : null

                return {
                  title: item.fields.title,
                  price: item.fields.price,
                  level: item.fields.level,
                  availability: item.fields.availability,
                  body: item.fields.body,
                  icon,
                  teaser
                }
              })
              .sort((a, b) => a.level - b.level)
            : null

        if (sponsors) {
          items.filter(filterByType, 'sponsor').forEach(item => {
            const category = sponsors.find(
              category => category.id === item.fields.category.sys.id
            )
            const logo = item.fields.logo
              ? item.fields.logo.fields.file.url
              : null

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

          sponsors = sponsors.map(item => {
            item.items = item.items.sort((a, b) => a.order - b.order)
            item.isDetailed = currentPage.showSponsorsDetailed

            return item
          })
        }

        const team = currentPage
          ? items
            .filter(filterByType, 'team')
            .map(item => {
              const photo = item.fields.photo
                ? item.fields.photo.fields.file.url + '?w=250&h=250&fit=fill'
                : null

              return {
                name: item.fields.name,
                description: item.fields.description,
                twitter: item.fields.twitter,
                photo: photo,
                company: item.fields.company,
                companyLink: item.fields.companyLink,
                order: item.fields.order
              }
            })
            .sort((a, b) => a.order - b.order)
          : null

        const contentTeasers = currentPage.contentTeasers
          ? currentPage.contentTeasers.map(contentTeaser => {
            const teaser = items
              .filter(filterByType, 'teaser')
              .find(item => item.sys.id === contentTeaser.sys.id).fields

            return {
              title: teaser.title,
              body: teaser.body,
              link: teaser.link ? teaser.link.fields.slug : null
            }
          })
          : []

        const leadAccomodations = config.leadAccomodations
        const leadHotels = config.leadHotels
        const hotels =
          currentPage && currentPage.showHotels
            ? items
              .filter(filterByType, 'hotel')
              .map(item => {
                const photo = item.fields.photo
                  ? item.fields.photo.fields.file.url +
                      '?w=250&h=180&fit=fill'
                  : null

                return {
                  name: item.fields.name,
                  description: item.fields.description,
                  photo: photo,
                  link: item.fields.link
                }
              })
              .sort((a, b) => a.order - b.order)
            : null

        const leadRestaurants = config.leadRestaurants
        const restaurants =
          currentPage && currentPage.showRestaurants
            ? items
              .filter(filterByType, 'restaurant')
              .map(item => {
                const photo = item.fields.photo
                  ? item.fields.photo.fields.file.url +
                      '?w=250&h=180&fit=fill'
                  : null

                return {
                  name: item.fields.name,
                  description: item.fields.description,
                  photo: photo,
                  link: item.fields.link
                }
              })
              .sort((a, b) => a.order - b.order)
            : null

        const scripts =
          currentPage && currentPage.config && currentPage.config.scripts
            ? currentPage.config.scripts
            : []
        const styles =
          currentPage && currentPage.config && currentPage.config.styles
            ? currentPage.config.styles
            : []

        return {
          header,
          footer,
          currentPage,
          currentPageType,
          lead,
          news: showNews ? news : null,
          hosts,
          speakers,
          workshops,
          talks,
          venue,
          jobs,
          schedule,
          sponsors,
          sponsorshipCategories,
          team,
          leadAccomodations,
          hotels,
          leadHotels,
          restaurants,
          leadRestaurants,
          scripts,
          styles,
          currentPageIndex,
          currentTag,
          contentTeasers,
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
