import React, { Component } from 'react'
import Layout from '../components/layout'
import Data from '../components/data'

class Host extends Component {

  // componentWillMount () {
  //   this.setState({
  //     items: this.props.products
  //   })
  // }

  render () {
    return <Layout {...this.props}>
      Host
    </Layout>
  }
}

Host.propTypes = {
}

export default Data(Host)
