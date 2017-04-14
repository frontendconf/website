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

function getContentfulEntries () {
  return getData(config.API + '/contentful/entries')
}

function getContentfulEntry (id) {
  return getData(config.URL + '/contentful/entry/' + id)
}

function getFreshjobsEntries () {
  return getData(config.API + '/freshjobs/entries')
}

export default {
  getContentfulEntries,
  getContentfulEntry,
  getFreshjobsEntries
}
