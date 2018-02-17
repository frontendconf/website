import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import config from '../config'

import dateFormatter from '../lib/dateFormatter'

import InternalLink from '../components/link'
import Layout from '../components/layout'
import Data from '../components/data'
import Lead from '../components/lead'
import News from '../components/news'
import Hosts from '../components/hosts'
import Speakers from '../components/speakers'
import Speaker from '../components/speaker'
import Workshops from '../components/workshops'
import Workshop from '../components/workshop'
import Venue from '../components/venue'
import Jobs from '../components/jobs'
import Sponsors from '../components/sponsors'
import SponsorshipCategories from '../components/sponsorshipCategories'
import Team from '../components/team'
import Schedule from '../components/schedule'
import Tourism from '../components/tourism'
import Newsletter from '../components/newsletter'

class Index extends Component {
  constructor (props) {
    super(props)

    if (process.browser) {
      ReactGA.initialize(config.GA)
    }
  }

  sendLocationToGA () {
    const page = window.location.pathname

    ReactGA.set({ page })
    ReactGA.pageview(page)
  }

  insertScripts (scripts, checkInsertion) {
    scripts.forEach(src => {
      if (
        checkInsertion &&
        document.querySelectorAll('[src="' + src + '"]').length
      ) {
        return
      }

      const script = document.createElement('script')
      script.src = src
      document.head.appendChild(script)
    })
  }

  insertStyles (styles, checkInsertion) {
    styles.forEach(src => {
      if (
        checkInsertion &&
        document.querySelectorAll('[href="' + src + '"]').length
      ) {
        return
      }

      const sheet = document.createElement('link')
      sheet.href = src
      sheet.rel = 'stylesheet'
      document.head.appendChild(sheet)
    })
  }

  componentDidMount () {
    this.insertScripts(this.props.scripts)
    this.insertStyles(this.props.styles)

    this.sendLocationToGA()
  }

  componentWillReceiveProps (newProps) {
    this.insertScripts(newProps.scripts)
    this.insertStyles(newProps.styles, true)

    this.sendLocationToGA()
  }

  render () {
    let body

    switch (this.props.currentPageType) {
      case 'hosts':
      case 'speakers':
        body = <Speaker {...this.props.currentPage} />
        break
      case 'workshops':
        body = <Workshop {...this.props.currentPage} />
        break
      case 'schedule':
        body = <Schedule {...this.props.currentPage} />
        break
      default:
        body =
          this.props.currentPage && this.props.currentPage.body
            ? <section className='content section'>
              <div className='grid'>
                <div className='grid__inner'>
                  {this.props.currentPage.isNewsDetail
                    ? <div className='col-8'>
                      <h1 className='blog__article-title-link'>
                        {this.props.currentPage.contentTitle}
                      </h1>
                      <div className='blog__article-info'>
                        <span className='blog__article-info-date'>
                          {dateFormatter.formatDate(
                            this.props.currentPage.date,
                            'D MMM YYYY'
                          )}
                        </span>
                        {this.props.currentPage.tags.map((tag, ii) => {
                          return (
                            <InternalLink
                              page='news'
                              detail='tag'
                              custom={tag}
                              title={`#${tag}`}
                              classes='blog__article-info-tag'
                              key={ii}
                            />
                          )
                        })}
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.props.currentPage.body
                        }}
                      />

                      <Newsletter isTeaser={true} />

                      {this.props.news
                        ? <News
                          teasers={this.props.news}
                          contentTeasers={this.props.contentTeasers}
                          detailId={this.props.currentPage._id}
                        />
                        : null}
                    </div>
                    : <div>
                      <div className='col-8'>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.props.currentPage.body
                          }}
                        />
                      </div>
                      <aside className='col-4 margin-top-large'>
                        {this.props.contentTeasers.map((item, i) => {
                          return (
                            <div key={i}>
                              {item.link
                                ? <InternalLink
                                  slug={item.link}
                                  classes='teaser'
                                >
                                  <span
                                    dangerouslySetInnerHTML={{ __html: item.body }}
                                  />
                                </InternalLink>
                                : <div className='teaser teaser--static'>
                                  <span
                                    dangerouslySetInnerHTML={{ __html: item.body }}
                                  />
                                </div>}
                            </div>
                          )
                        })}
                      </aside>
                    </div>
                  }
                </div>
              </div>
            </section>
            : null
    }

    const lead = this.props.lead ? <Lead {...this.props.lead} /> : null
    const news =
      this.props.news && !this.props.currentPage.isNewsDetail
        ? <News
          teasers={this.props.news}
          contentTeasers={this.props.contentTeasers}
          isNews={this.props.currentPage.isNews}
          currentPageIndex={this.props.currentPageIndex}
          currentTag={this.props.currentTag}
        />
        : null
    const hosts = this.props.hosts ? <Hosts hosts={this.props.hosts} /> : null
    const speakers = this.props.speakers
      ? <Speakers
        speakers={this.props.speakers}
        isHome={this.props.currentPage && this.props.currentPage.isHome}
      />
      : null
    const workshops = this.props.workshops
      ? <Workshops
        workshops={this.props.workshops}
        isHome={this.props.currentPage && this.props.currentPage.isHome}
      />
      : null
    const venue = this.props.venue ? <Venue {...this.props.venue} isVenue={this.props.currentPage && this.props.currentPage.isVenue} /> : null
    const jobs = this.props.jobs ? <Jobs {...this.props.jobs} /> : null
    const sponsors = this.props.sponsors
      ? <Sponsors sponsors={this.props.sponsors} />
      : null
    const sponsorshipCategories = this.props.sponsorshipCategories
      ? <SponsorshipCategories
        categories={this.props.sponsorshipCategories}
      />
      : null
    const team = this.props.team ? <Team team={this.props.team} /> : null
    const schedule = this.props.schedule
      ? <Schedule schedule={this.props.schedule} />
      : null
    const leadAccomodations = this.props.currentPage && this.props.currentPage.isVenue && this.props.leadAccomodations
      ? <div className="section section--top">
        <div className="grid">
          <div className="grid__inner">
            <div className="col-12 margin-top-large" dangerouslySetInnerHTML={{ __html: this.props.leadAccomodations }}></div>
          </div>
        </div>
      </div>
      : null
    const hotels = this.props.hotels
      ? <Tourism items={this.props.hotels} lead={this.props.leadHotels} isLarge={true} />
      : null
    const restaurants = this.props.restaurants
      ? <Tourism
        items={this.props.restaurants}
        lead={this.props.leadRestaurants}
      />
      : null

    return (
      <Layout {...this.props}>
        {lead}
        {body}
        {news}
        {this.props.currentPage && this.props.currentPage.isHome
          ? hosts
          : speakers}
        {this.props.currentPage && this.props.currentPage.isHome
          ? speakers
          : hosts}
        {workshops}
        {team}
        {venue}
        {jobs}
        {schedule}
        {leadAccomodations}
        {hotels}
        {restaurants}
        {sponsorshipCategories}
        {sponsors}
      </Layout>
    )
  }
}

Index.propTypes = {
  currentPage: PropTypes.object,
  currentPageType: PropTypes.string,
  lead: PropTypes.object,
  news: PropTypes.array,
  hosts: PropTypes.array,
  speakers: PropTypes.array,
  workshops: PropTypes.array,
  venue: PropTypes.object,
  jobs: PropTypes.object,
  sponsors: PropTypes.array,
  sponsorshipCategories: PropTypes.array,
  team: PropTypes.array,
  schedule: PropTypes.array,
  leadAccomodations: PropTypes.string,
  leadHotels: PropTypes.string,
  hotels: PropTypes.array,
  leadRestaurants: PropTypes.string,
  restaurants: PropTypes.array,
  scripts: PropTypes.array,
  styles: PropTypes.array,
  currentPageIndex: PropTypes.number,
  currentTag: PropTypes.string,
  contentTeasers: PropTypes.array
}

export default Data(Index)
