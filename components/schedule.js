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
        <div className="grid__inner eq-height">
          <h2>Thursday, 31 Aug</h2>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '0830' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '0930' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1000' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1100' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1200' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1300' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1400' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1500' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1530' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1630' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '31 Aug' && item.sortTime === '1730' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
        </div>

        <div className="grid__inner eq-height">
          <h2>Friday, 1 Sep</h2>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '0900' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '0930' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1030' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1130' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1200' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1300' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1400' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1500' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1530' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1630' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
          <div className="col-12 schedule__items">
            {this.props.schedule.filter((item) => { return dateFormatter.formatDate(item.day) === '1 Sep' && item.sortTime === '1730' }).map((item, i) => {
              return <ScheduleItem {...item} key={i} />
            })}
          </div>
        </div>
      </div>
    </section>
  }
}

Schedule.propTypes = {
  schedule: PropTypes.array,
  isHome: PropTypes.bool
}

export default Schedule
