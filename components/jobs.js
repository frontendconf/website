import React, { Component } from 'react'

class Jobs extends Component {
  render () {
    return <section className="job-board section">
      <div className="grid">
        <div className="grid__inner">
          <div className="col-12">
            <h2>
              Jobs
            </h2>
          </div>
          {this.props.jobs.map((item, i) => {
            return <div className="col-4">
              <a className="job-board__job" href={item.url}>
                <span className="job-board__job-title">
                  {item.name}
                </span>
                <span className="job-board__company">
                  {item.description}
                </span>
              </a>
            </div>
          })}
          <div className="col-4">
            <a className="job-board__job job-board__job--all" href="javascript:void(0)">
              <span className="job-board__job-title job-board__job-title--all">
                All jobs
              </span>
            </a>
          </div>
          <div className="col-12">
            <div className="job-board__freshjobs-container">
              <span>Powered by our friends from </span>
              <a className="job-board__freshjobs-link" href="javascript:void(0)">
                <svg className="job-board__freshjobs-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.5 103.77">
                  <path className="cls-1"
                      d="M22.9,33.86c0,3.6-2.7,6.8-8.1,6.8-6.1,0-12.4-7.4-12.4-16.4,0-11.2,7.5-21.6,21.8-21.6A74.47,74.47,0,0,1,40,4.26c25.2,4.5,32.8,5.2,42.5,5.3a6.61,6.61,0,0,1,1.2,3.8c0,6.3-6.1,10.5-13.6,10.5A51.17,51.17,0,0,1,57,22.06a94.92,94.92,0,0,0-3.4,14.7,38,38,0,0,0,4.3.5,36.15,36.15,0,0,0,10.5-1.5,5.74,5.74,0,0,1,1.8,3.9c0,6.6-5,9.8-11.8,9.8a40.56,40.56,0,0,1-6.8-.9c-.3,1.7-2.5,10.6-2.8,12-4,17.8-12.9,30.8-27.1,30.8-10,0-15.3-5.6-15.3-14.3,0-7.5,4.7-15.9,28.4-31.7a7.32,7.32,0,0,1-2.7-5.5,4.83,4.83,0,0,1,2.7-4.4,8.61,8.61,0,0,1,3.5-.8,55.75,55.75,0,0,1,6.5-15.6c-10.6-3.4-17.8-4.5-23.2-4.5s-7.9,2.6-7.9,7.3C13.7,25.86,16,29.86,22.9,33.86Zm-3.8,41.8c0,4.1,1.5,5.6,3.7,5.6,3.7,0,7.6-8.2,10.7-25.3C22,66.66,19.1,72,19.1,75.66Z"/>
                  <path className="cls-1"
                      d="M101.5,43.66c0,2-1.1,4.4-2.7,7.6-2.3,4.6-4.3,9.5-4.3,12,0,1.4.4,2.4,1.7,2.4,2.8,0,9.8-6.2,15.1-14.5,2.5,0,4.2,1.6,4.2,3.1,0,6.3-17.1,24.1-26.3,24.1-6.1,0-9.5-2.7-9.5-8.4,0-6.6,4.9-15.1,4.9-17.7,0-1.2-1.1-1.8-3.3-2.7a59.45,59.45,0,0,1-8.7,13.1,3.81,3.81,0,0,1-4-3.9,4.2,4.2,0,0,1,.7-2.4c2.6-3.7,4.5-6.2,6.2-10.3A5.94,5.94,0,0,1,74,42c0-7,10.5-16.9,16.1-16.9,3.4,0,5.7,1.6,5.7,4.3a6.46,6.46,0,0,1-.3,2,14.22,14.22,0,0,0-5.8,5,27.28,27.28,0,0,0,4.7,1.8C100.3,39.86,101.5,41.26,101.5,43.66Z"/>
                  <path className="cls-1"
                      d="M107.3,60.36c0-15.1,12.3-30.5,22-30.5,6.9,0,10.7,3.3,10.7,10.3,0,8.4-4.9,14.9-18.6,18,0,4.5.9,7,4.8,7,6.8,0,15.6-5.8,21.3-14.5,2.4.1,3.8,1.7,3.8,3.3,0,7.4-16.7,23.3-29.7,23.3C111.8,77.26,107.3,71.16,107.3,60.36Zm19.5-20c-1.4,0-4.1,3.4-4.8,10.4,5.6-1,6.8-4.1,6.8-7.1C128.8,41.56,128,40.36,126.8,40.36Z"/>
                  <path className="cls-1"
                      d="M188.4,22.86a85.38,85.38,0,0,0-11.6-1.3c-3.7,0-5.9,2.5-6.1,7.3,5.8,0,9.1,1.2,9.1,4.2,0,3.8-4.1,9.5-7.9,9.5-2.1,0-4.2-1.5-5.9-3.7a54.45,54.45,0,0,0,2.3,5.1c4.2,8.5,6,14.4,6,18.7,0,10.4-7.8,15.8-17.7,15.8-7.8,0-15.1-5.3-15.1-15.2,0-5.9,1.6-15.6,6.5-15.6,3.5,0,6.3,4.5,6.3,7,0,2.1-.9,3.6-2.6,5.5.8,4.4,4.2,7.4,6.5,7.4a2,2,0,0,0,2.1-2.3c0-5.1-6-19.2-6-25.4,0-4.2,2.2-7.8,7.6-10.1a16.3,16.3,0,0,1-.3-3.1c0-9.9,6.2-16.9,16.9-16.9,3.3,0,6,.7,12.7,3.5,2.9-7.5,6.4-11.1,11.1-11.1,4.3,0,9.5,3.5,9.5,7.5s-2.9,7.2-10.8,13.7a151.3,151.3,0,0,0-3.5,20c7.2-6.6,14.2-10.4,18.1-10.4s5.8,2.4,5.8,5.9c0,3.1-.9,6.2-2.4,10-1.7,4.4-5,12.5-5,15,0,1.1.5,1.5,1.4,1.5,1.8,0,8-4.9,14.5-14.2,1.9,0,3.9,1.3,3.9,3.3,0,6.3-17,23.8-26.2,23.8-5.9,0-7.9-2.6-7.9-8.1,0-6.6,5.2-18.1,5.2-20.3,0-.8-.3-1.6-1.4-1.6-1.7,0-4.1,1.1-6.8,3.4-.7,5.2-1.7,17.2-1.8,23.9a4.42,4.42,0,0,1-3.7,1.4c-5.8,0-10.4-4.3-10.5-9.5a30.47,30.47,0,0,1,2.7-12C184.8,42,186.4,31.16,188.4,22.86Z"/>
                  <path className="cls-1"
                      d="M240,84.06c-1.8,13.5-10.1,19.7-18,19.7-7.3,0-12.1-5.5-12.1-13.4,0-4.6,1.5-7.1,9.7-12.3l8-5.1c.5-5.6,1.4-13.1,2.4-18.1a16.47,16.47,0,0,1-1-6.2c0-5.9,10.1-17.1,16.3-17.1,3.8,0,4.9,1.5,4.9,4.7,0,2.9-1.6,7.7-5.3,14-.7,3.3-1.8,9.3-2.6,14.8a52.47,52.47,0,0,0,14.2-13.9,4.1,4.1,0,0,1,3.9,3.8c0,4.9-10.5,15.1-19.3,20.8C240.7,79,240.3,82.16,240,84.06Zm-16.3.3c-2,1.3-2.8,2.2-2.8,3.7,0,2.9,1.5,4.8,3.5,4.8,1.5,0,2-1.2,2.2-4,.3-3.7.6-6.9.6-6.9Zm23.5-80.5c4,0,8.4,4.4,8.4,7.5,0,2.4-.8,6.2-5.6,12.1-4.7,0-6.8-4.3-6.8-10C243.2,5.66,244.5,3.86,247.2,3.86Z"/>
                  <path className="cls-1"
                      d="M289.8,43.46c0,4.8-1,8.7-3.1,14.2a2.9,2.9,0,0,0,2,.7c2.9,0,5.8-2.3,9.1-7.6a3.92,3.92,0,0,1,3.9,3.6c0,4.2-6.7,13.6-15.2,13.6a6.78,6.78,0,0,1-4-1c-4.8,6.5-10.1,10.1-17.1,10.1s-12.7-4.7-12.7-14.5c0-16.6,11-32,21.6-32,2.6,0,5.8,1.1,5.9,4.4a4.32,4.32,0,0,1,3.5-1.4C287.8,33.56,289.8,39,289.8,43.46Zm-19.3,21.7c2.4,0,4.8-2.3,6.6-6.8a34.55,34.55,0,0,1-1.1-8.7c0-3.4.7-8.7,2.2-11.6-6.2,2.9-11.3,12.6-11.3,20.8C266.9,63.76,268.7,65.16,270.5,65.16Z"/>
                  <path className="cls-1"
                      d="M307.2,77.66c-8.1,0-12.4-5.5-12.4-18.2,0-24.8,12.8-56.3,25.6-56.3,4,0,6.5,2,6.5,6.8,0,4-3.6,11.5-15.8,28.6a132.91,132.91,0,0,0-1.7,17.2c0,8.7.5,10.1,1.7,10.1,3.7,0,9.2-9.3,9.2-15.9,0-3.8-1-5.2-4.6-6.3a10.49,10.49,0,0,1-.3-2.4c0-5.2,4.6-10.1,9.9-10.1s8.1,3.3,8.1,10.9C333.4,57.46,320.3,77.66,307.2,77.66Z"/>
                  <path className="cls-1"
                      d="M345.2,54.66c0,2.1-.9,3.6-2.6,5.5.8,4.4,4.2,7.4,6.5,7.4a2,2,0,0,0,2.1-2.3c0-5.1-5.8-17.2-5.8-23.4,0-8.4,6.8-14.2,15.9-14.2,5.8,0,9.2,2.5,9.2,7.3a8,8,0,0,1-2.1,5.4,13.87,13.87,0,0,0-5.3-1.2c-2.1,0-3.2.6-3.2,2.4,0,4.5,5.7,12.8,5.7,20.1,0,12.1-10.3,16.8-19.3,16.8-7.8,0-13.9-5.3-13.9-15.2,0-5.9,1.6-15.6,6.5-15.6C342.4,47.66,345.2,52.16,345.2,54.66Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

Jobs.propTypes = {
  jobs: React.PropTypes.array
}

export default Jobs