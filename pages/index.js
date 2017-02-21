import React, { Component } from 'react'
import Layout from '../components/layout'
import Data from '../components/data'
import Intro from '../components/intro'

class Index extends Component {

  // componentWillMount () {
  //   this.setState({
  //     items: this.props.products
  //   })
  // }

  render () {
    return <Layout {...this.props}>
      <Intro {...this.props.intro} />
    </Layout>
  }
}

Index.propTypes = {
  intro: React.PropTypes.object
}

export default Data(Index)
