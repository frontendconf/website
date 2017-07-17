import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScheduleItem from './scheduleItem'
import InternalLink from './link'

class Schedule extends Component {
	day (date) {
    return new Date(date).toLocaleDateString('de', {
			day: 'numeric',
			month: 'numeric'
    })
  }

  render () {
    return <section className={this.props.isHome ? 'schedule section--bottom' : 'schedule section'}>
      <div className="grid">
        <div className="grid__inner eq-height">
					{this.props.schedule.map((item, i) => {
						return <div className="col-12" key={i}>
							<ScheduleItem {...item} />
						</div>
					})}
        </div>
      </div>
    </section>
  }
}

Schedule.propTypes = {
  talks: PropTypes.array,
  isHome: PropTypes.bool
}

export default Schedule
