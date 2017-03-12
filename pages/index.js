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
    const intro = this.props.query.page ? null : <Intro {...this.props.intro} />
    const teasers = this.props.query.page ? null : <Teasers teasers={this.props.teasers} />
    const hosts = this.props.query.page ? null : <Hosts hosts={this.props.hosts} />
    const speakers = this.props.query.page ? null : <Speakers speakers={this.props.speakers} />
    const venue = this.props.query.page ? null : <Venue {...this.props.venue} />
    const jobs = this.props.query.page ? null : <Jobs jobs={this.props.jobs} />

    return <Layout {...this.props}>
      {intro}
      {teasers}
      {hosts}
      {speakers}
      {venue}
      {jobs}
    </Layout>
  }
}

Index.propTypes = {
  intro: React.PropTypes.object,
  query: React.PropTypes.object,
  teasers: React.PropTypes.array,
  hosts: React.PropTypes.array,
  speakers: React.PropTypes.array,
  venue: React.PropTypes.object,
  jobs: React.PropTypes.array
}

export default Data(Index)
