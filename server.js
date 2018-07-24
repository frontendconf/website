const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'

console.log('Is dev environment:', dev)

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1 hour
})

app
  .prepare()
  .then(() => {
    const server = express()

    // Static files
    server.use('/static', express.static('.next/static')) // See issue with ExtractTextPlugin in next.config.js
    server.use('/static', express.static('static'))

    // Reset cache when using ?emptyCache
    server.get('*', (req, res, next) => {
      if (req.query.emptyCache !== undefined) {
        // console.log('CACHE RESET')

        ssrCache.reset()
      }

      next()
    })

    server.get('/', (req, res, next) => {
      renderAndCache(req, res, '/', req.params)
    })

    server.get('/:page/:detail?/:custom?', (req, res, next) => {
      if (
        ['favicon.ico', '_webpack', '__webpack_hmr', '_next'].includes(
          req.params.page
        )
      ) {
        return next()
      }

      renderAndCache(req, res, '/', req.params)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err

      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(console.log)

function getCacheKey (req) {
  return `${req.url}`
}

function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)
  const skipCache = req.query.skipCache !== undefined || dev

  if (ssrCache.has(key)) {
    // console.log(`CACHE HIT: ${key}`)

    if (!skipCache) {
      return res.send(ssrCache.get(key))
    } else {
      // console.log('CACHE SKIPPED')
    }
  }

  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // console.log(`CACHE MISS: ${key}`)

      if (html && !skipCache) {
        ssrCache.set(key, html)
      }

      res.send(html)
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}
