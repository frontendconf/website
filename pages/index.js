import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Data from '../components/data'
import Lead from '../components/lead'
import News from '../components/news'
import Hosts from '../components/hosts'
import Speakers from '../components/speakers'
import Speaker from '../components/speaker'
import Venue from '../components/venue'
import Jobs from '../components/jobs'

class Index extends Component {

  // componentWillMount () {
  //   this.setState({
  //     items: this.props.products
  //   })
  // }

  render () {
    let body

    switch (this.props.currentPageType) {
      case 'hosts':
      case 'speakers':
        body = <Speaker {...this.props.currentPage} />
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
    const speakers = this.props.speakers ? <Speakers speakers={this.props.speakers} /> : null
    const venue = this.props.venue ? <Venue {...this.props.venue} /> : null
    const jobs = this.props.jobs ? <Jobs jobs={this.props.jobs} /> : null
    // const sponsors = this.props.currentPage && this.props.currentPage.showSponsors ? <sponsors sponsors={this.props.sponsors} /> : null

    return <Layout {...this.props}>
      {lead}
      {body}
      {news}
      {hosts}
      {speakers}
      {venue}
      {jobs}
      {/*sponsors*/}
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
  venue: PropTypes.object,
  jobs: PropTypes.array,
  sponsors: PropTypes.array
}

export default Data(Index)
