import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dateFormatter from '../lib/dateFormatter'

import ScheduleItem from './scheduleItem'

class Schedule extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 0
    }
  }

  selectTab (i) {
    this.setState({
      selectedTab: i
    })
  }

  formatTab (text) {
    const parts = text.split(',')

    return (
      <span>
        <strong>{parts[0]}</strong>,
        {parts[1]}
      </span>
    )
  }

  getCurrentTab () {
    const currentDay = dateFormatter.formatDate(new Date(), 'YYYY-MM-DD')
    const currentTab = this.props.schedule.find(item => {
      const date = dateFormatter.parse(item.day, 'dddd, D MMM')
      const day = dateFormatter.formatDate(date, 'YYYY-MM-DD')

      return day === currentDay
    })

    return currentTab
  }

  getCurrentSlot (slots) {
    const currentHour = parseInt(dateFormatter.format(new Date(), 'H'), 10)
    const currentSlot = slots.slice(0).reverse().find(item => {
      const hour = parseInt(item.slot.fromTime, 10)

      return hour <= currentHour
    })

    return currentSlot
  }

  componentDidMount () {
    const currentTab = this.getCurrentTab()

    if (currentTab) {
      const currentSlot = this.getCurrentSlot(currentTab.slots)

      // Select current day
      currentTab.node.click()

      // Scroll to current time
      if (currentSlot) {
        setTimeout(() => {
          currentSlot.node.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }, 1000)
      }
    }
  }

  render () {
    return (
      <section className='schedule section'>
        <div className='grid'>
          <div className='schedule__header'>
            <div className='schedule__legends'>
              <div className='schedule__legend schedule__rusterei'>
                FL 0 <strong>R&uuml;sterei</strong>
              </div>
              <div className='schedule__legend schedule__folium'>
                FL 1 <strong>Folium</strong>
              </div>
              <div className='schedule__legend schedule__papiersaal'>
                FL 2 <strong>Papiersaal</strong>
              </div>
            </div>

            <div className='schedule__tabs' role='tablist'>
              {this.props.schedule.map((item, i) => {
                return (
                  <button
                    key={i}
                    className='schedule__tab'
                    role='tab'
                    ref={node => (this.props.schedule[i].node = node)} // eslint-disable-line no-return-assign
                    id={`tab-${i}`}
                    aria-selected={this.state.selectedTab === i}
                    aria-controls={`tabpanel-${i}`}
                    onClick={this.selectTab.bind(this, i)}
                  >
                    {this.formatTab(item.day)}
                  </button>
                )
              })}
            </div>
          </div>

          {this.props.schedule.map((item, i) => {
            return (
              <div
                key={i}
                className='grid__inner eq-height schedule__tabpanel'
                role='tabpanel'
                tabIndex='0'
                aria-labelledby={`tab-${i}`}
                hidden={this.state.selectedTab !== i}
              >
                <h2 className='visuallyhidden'>{item.day}</h2>

                {item.slots.map((slot, ii) => {
                  return (
                    <div
                      className='col-12 schedule__items'
                      key={ii}
                      ref={node => (item.slots[ii].node = node)} // eslint-disable-line no-return-assign
                    >
                      {slot.talks.map((talk, iii) => {
                        return <ScheduleItem {...talk} key={iii} />
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

Schedule.propTypes = {
  schedule: PropTypes.array
}

export default Schedule
