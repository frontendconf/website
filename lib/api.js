import fetch from 'isomorphic-fetch'
import config from '../config'

function getData (url) {
  return fetch(url).then(function (response) {
    if (response.status >= 400) {
      return response.json().then(function (err) {
        throw new Error(err.message)
      })
    }

    return response.json()
  })
}

function getEntries () {
  return getData(config.API + '/entries')
}

function getEntry (id) {
  return getData(config.URL + '/entry/' + id)
}

export default {
  getEntries,
  getEntry
}
