import fetch from 'isomorphic-fetch'
import Cache from 'node-cache'
import config from '../config'

const cache = new Cache()

function getData (url, cacheKey) {
  const cachedResponse = cache.get(cacheKey)

  if (cachedResponse) {
    return Promise.resolve(cachedResponse)
  } else {
    return fetch(url).then(function (response) {
      if (response.status >= 400) {
        return response.json().then(function (err) {
          throw new Error(err.message)
        })
      }

      return response.json()
    }).then(function (response) {
      cache.set(cacheKey, response)

      return response
    })
  }
}

function getEntries () {
  return getData(config.api.url + '/entries', 'all')
}

function getEntry (id) {
  return getData(config.api.url + '/entry/' + id, id)
}

export default {
  getEntries,
  getEntry
}
