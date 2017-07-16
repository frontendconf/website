import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Talk extends Component {
	formatDate (date) {
    return new Date(date).toLocaleDateString('de', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
    })
  }

  render () {
		const startDate = this.formatDate(this.props.fields.from)
		const endDate = this.formatDate(this.props.fields.to)

    return <div className="talk">
			<div className="grid__inner">
				<div className="col-8">
					<p className="talk__at">Talk at FEC17</p>
		      <h2 className="talk__title">{this.props.fields.title}</h2>
					<h4 className="talk__room">{startDate} – {endDate}, {this.props.fields.room}</h4>
		      <p className="talk__abstract">{this.props.fields.abstract}</p>
				</div>
			</div>
    </div>
  }
}

Talk.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
	from: PropTypes.string,
	to: PropTypes.string
}

export default Talk
