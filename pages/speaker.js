import React, { Component } from 'react'
import Layout from '../components/layout'
import Data from '../components/data'

class Speaker extends Component {

  // componentWillMount () {
  //   this.setState({
  //     items: this.props.products
  //   })
  // }

  render () {
    return <Layout {...this.props}>
      Speaker
    </Layout>
  }
}

Speaker.propTypes = {
}

export default Data(Speaker)
