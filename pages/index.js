import React, { Component } from 'react'
import Layout from '../components/layout'
import Data from '../components/data'
import Intro from '../components/intro'
import Teasers from '../components/teasers'
import Hosts from '../components/hosts'
import Speakers from '../components/speakers'
import Venue from '../components/venue'
import Jobs from '../components/jobs'

class Index extends Component {

  // componentWillMount () {
  //   this.setState({
  //     items: this.props.products
  //   })
  // }

  render () {
    const intro = this.props.currentPage && this.props.currentPage.fields.showIntro ? <Intro {...this.props.intro} /> : null
    const body = this.props.currentPage ? this.props.currentPage.fields.body : null
    const teasers = this.props.query.page ? null : <Teasers teasers={this.props.teasers} />
    const hosts = this.props.query.page ? null : <Hosts hosts={this.props.hosts} />
    const speakers = this.props.query.page ? null : <Speakers speakers={this.props.speakers} />
    const venue = this.props.currentPage && this.props.currentPage.fields.showVenue ? <Venue {...this.props.venue} /> : null
    const jobs = this.props.currentPage && this.props.currentPage.fields.showJobs ? <Jobs jobs={this.props.jobs} /> : null
    // const sponsors = this.props.currentPage && this.props.currentPage.fields.showSponsors ? <sponsors sponsors={this.props.sponsors} /> : null

    return <Layout {...this.props}>
      {intro}

      <section className="content section">
        <div className="grid">
          <div className="grid__inner">
            <div className="col-12">
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </div>
        </div>
      </section>

      {teasers}
      {hosts}
      {speakers}
      {venue}
      {jobs}
      {/*sponsors*/}
    </Layout>
  }
}

Index.propTypes = {
  currentPage: React.PropTypes.object,
  intro: React.PropTypes.object,
  query: React.PropTypes.object,
  teasers: React.PropTypes.array,
  hosts: React.PropTypes.array,
  speakers: React.PropTypes.array,
  venue: React.PropTypes.object,
  jobs: React.PropTypes.array,
  sponsors: React.PropTypes.array
}

export default Data(Index)
