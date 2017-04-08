const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1 hour
})

app.prepare()
.then(() => {
  const server = express()

  // Reset cache when using ?emptyCache
  server.get('*', (req, res, next) => {
    if (req.query.emptyCache !== undefined) {
      // console.log('CACHE RESET')

      ssrCache.reset()
    }

    next()
  })

  server.get('/:page', (req, res, next) => {
    const queryParams = { page: req.params.page }

    if (queryParams.page === '__webpack_hmr') {
      return next()
    }

    renderAndCache(req, res, '/', queryParams)
  })

  server.get('/:category/:slug', (req, res) => {
    console.log(req.params)
    const queryParams = { id: req.params.id }

    renderAndCache(req, res, '/blog', queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err

    console.log('> Ready on http://localhost:3000')
  })
})

function getCacheKey (req) {
  return `${req.url}`
}

function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)
  const skipCache = (req.query.skipCache === undefined) || dev

  if (ssrCache.has(key)) {
    // console.log(`CACHE HIT: ${key}`)

    if (!skipCache) {
      return res.send(ssrCache.get(key))
    } else {
      // console.log('CACHE SKIPPED')
    }
  }

  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // console.log(`CACHE MISS: ${key}`)

      if (!skipCache) {
        ssrCache.set(key, html)
      }

      res.send(html)
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}