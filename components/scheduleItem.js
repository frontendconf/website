import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScheduleItem extends Component {
	time (date) {
    return new Date(date).toLocaleTimeString('de', {
			hour: '2-digit',
			minute: '2-digit'
    })
  }

  render () {
		const startDate = this.time(this.props.from)
		const endDate = this.time(this.props.to)
		const room = this.props.room.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    return <div className="schedule">
			<div className="schedule__time">
				<span className="schedule__from">{startDate} –</span>
				<span className="schedule__to">{endDate}</span>
			</div>
			<div className={ `schedule__details schedule__${room}` }>
				<h2 className="schedule__title">{this.props.title}</h2>
      	<p className="schedule__talk">{this.props.time}, {this.props.from}</p>
			</div>
      <p className="schedule__abstract">{this.props.abstract}</p>
    </div>
  }
}

ScheduleItem.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
	from: PropTypes.string,
	to: PropTypes.string,
	room: PropTypes.string
}

export default ScheduleItem
