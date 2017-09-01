import { createClient } from 'contentful'
import marked from 'marked'
import config from '../config'

const client = createClient({
  space: config.CONTENTFUL_SPACE,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN
})

function transformEntry (entry) {
  Object.keys(entry.fields).forEach(key => {
    // Transform markdown fields into HTML
    if (['body', 'leadHotels', 'leadRestaurants', 'abstract'].includes(key)) {
      let markup = marked(entry.fields[key])

      entry.fields[key] = markup
    }
  })

  return entry
}

function getEntries (contentType) {
  return client
    .getEntries({
      content_type: contentType,
      limit: 1000
    })
    .then(data => data.items)
    .then(data => data.map(transformEntry))
}

function getEntry (id) {
  return client
    .getEntries({
      'sys.id': id
    })
    .then(
      data =>
        data.items.length
          ? data.items[0]
          : new Error("Entry with id '" + id + "' not found")
    )
    .then(transformEntry)
}

export default {
  getEntries,
  getEntry
}
