import React, { Component } from 'react'
import PropTypes from 'prop-types'

// You've got to be kidding me, React
class MenuToggle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: this.props.checked
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps () {
    this.setState({
      checked: this.props.checked
    })
  }

  handleChange (event) {
    this.setState({
      checked: event.target.checked
    })
  }

  render () {
    return (
      <input
        type='checkbox'
        id='right'
        className='toggle-input show-right'
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    )
  }
}

MenuToggle.propTypes = {
  checked: PropTypes.bool
}

export default MenuToggle
