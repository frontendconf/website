import { createClient } from 'contentful'
import marked from 'marked'
import truncate from 'trunc-html'
import config from '../config'

const client = createClient({
  space: config.CONTENTFUL_SPACE,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN
})

function getBlock (id, entries) {
  try {
    return entries.find(entry => {
      return entry.sys.contentType.sys.id === 'block'
    }).fields.content
  } catch (err) {
    return ''
  }
}

function transformEntry (entry, entries) {
  Object.keys(entry.fields).forEach(key => {
    // Transform markdown fields into HTML
    if (
      [
        'body',
        'leadAccomodations',
        'leadHotels',
        'leadRestaurants',
        'abstract',
        'bio'
      ].includes(key)
    ) {
      let markup = marked(entry.fields[key])

      entry.fields[key] = markup

      if (key === 'body') {
        const content = entry.fields[key]

        entry.fields[`bodyShortened`] = truncate(markup, 200).text

        entry.fields[key] = content.replace(
          /<!--(?:\s*)block(?:\s*):(?:\s*)(.*?)(?:\s*)-->/gi,
          (match, id) => {
            const block = getBlock(id, entries)
            const html = marked(block)

            return html
          }
        )
      }
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
    .then(entries => entries.map(entry => transformEntry(entry, entries)))
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
