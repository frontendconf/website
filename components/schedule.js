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
				<div className="schedule__legends">
					<div className="schedule__legend">FL0 <strong>R&uuml;sterei</strong></div>
					<div className="schedule__legend schedule__folium">FL1 <strong>Folium</strong></div>
					<div className="schedule__legend schedule__papiersaal">FL2 <strong>Papiersaal</strong></div>
				</div>
        <div className="grid__inner eq-height">
					<h2>Thursday, 31 Aug</h2>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '8'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '9'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '10'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '11'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '12'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '13'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '14'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '15'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '16'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0831' && day.sortTime == '17'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
				</div>

        <div className="grid__inner eq-height">
					<h2>Friday, 1 Sep</h2>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '8'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '9'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '10'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '11'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '12'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '13'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '14'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '15'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '16'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
					<div className="col-12 schedule__items">
						{this.props.schedule.filter(function (day) { return day.day === '0901' && day.sortTime == '17'; }).map((item, i) => {
							return <ScheduleItem {...item} />
						})}
					</div>
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
