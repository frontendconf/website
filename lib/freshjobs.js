import fetch from 'isomorphic-fetch'
import config from '../config'

function getEntries () {
  return fetch(config.FRESHJOBS_API).then(function (response) {
    if (response.status >= 400) {
      return response.json().then(function (err) {
        throw new Error(err.message)
      })
    }

    return response.json()
  })
}

export default {
  getEntries
}
