import React, { Component } from 'react'
import Layout from '../components/layout'
import Data from '../components/data'

class News extends Component {

  // componentWillMount () {
  //   this.setState({
  //     items: this.props.products
  //   })
  // }

  render () {
    return <Layout {...this.props}>
      News
    </Layout>
  }
}

News.propTypes = {
}

export default Data(News)
