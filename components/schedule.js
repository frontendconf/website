import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
                    ref={`tab-${i}`}
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
                    <div className='col-12 schedule__items' key={ii}>
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
