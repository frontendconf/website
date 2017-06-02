import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import config from '../config'

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
    scripts.forEach((src) => {
      if (checkInsertion && document.querySelectorAll('[src="' + src + '"]').length) return

      const script = document.createElement('script')
      script.src = src
      document.head.appendChild(script)
    })
  }

  insertStyles (styles, checkInsertion) {
    styles.forEach((src) => {
      if (checkInsertion && document.querySelectorAll('[href="' + src + '"]').length) return

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
      default:
        body = this.props.currentPage && this.props.currentPage.body ? <section className="content section">
          <div className="grid">
            <div className="grid__inner">
              <div className="col-12">
                <div dangerouslySetInnerHTML={{ __html: this.props.currentPage.body }} />
              </div>
            </div>
          </div>
        </section> : null
    }

    const lead = this.props.lead ? <Lead {...this.props.lead} /> : null
    const news = this.props.news ? <News teasers={this.props.news} /> : null
    const hosts = this.props.hosts ? <Hosts hosts={this.props.hosts} /> : null
    const speakers = this.props.speakers ? <Speakers speakers={this.props.speakers} isHome={this.props.currentPage && this.props.currentPage.isHome} /> : null
    const workshops = this.props.workshops ? <Workshops workshops={this.props.workshops} isHome={this.props.currentPage && this.props.currentPage.isHome} /> : null
    const venue = this.props.venue ? <Venue {...this.props.venue} /> : null
    const jobs = this.props.jobs ? <Jobs {...this.props.jobs} /> : null
    const sponsors = this.props.sponsors ? <Sponsors sponsors={this.props.sponsors} /> : null
    const sponsorshipCategories = this.props.sponsorshipCategories ? <SponsorshipCategories categories={this.props.sponsorshipCategories} /> : null
    const team = this.props.team ? <Team team={this.props.team} /> : null

    return <Layout {...this.props}>
      {lead}
      {body}
      {news}
      {this.props.currentPage && this.props.currentPage.isHome ? hosts : speakers}
      {this.props.currentPage && this.props.currentPage.isHome ? speakers : hosts}
      {workshops}
      {team}
      {venue}
      {jobs}
      {sponsorshipCategories}
      {sponsors}
    </Layout>
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
  scripts: PropTypes.array,
  styles: PropTypes.array
}

export default Data(Index)
