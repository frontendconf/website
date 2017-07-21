import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

import ScheduleItem from './scheduleItem'

class Schedule extends Component {
  render () {
    return <section className={this.props.isHome ? 'schedule section--bottom' : 'schedule section'}>
      <div className="grid">
        <div className="schedule__legends">
          <div className="schedule__legend schedule__rusterei">FL 0 <strong>R&uuml;sterei</strong></div>
          <div className="schedule__legend schedule__folium">FL 1 <strong>Folium</strong></div>
          <div className="schedule__legend schedule__papiersaal">FL 2 <strong>Papiersaal</strong></div>
        </div>

        {this.props.schedule.map((item, i) => {
          return <div className="grid__inner eq-height" key={i}>
            <h2>{item.day}</h2>

            {item.slots.map((slot, ii) => {
              return <div className="col-12 schedule__items" key={ii}>
                {slot.talks.map((talk, iii) => {
                  return <ScheduleItem {...talk} key={iii} />
                })}
              </div>
            })}
          </div>
        })}
      </div>
    </section>
  }
}

Schedule.propTypes = {
  schedule: PropTypes.array,
  isHome: PropTypes.bool
}

export default Schedule
