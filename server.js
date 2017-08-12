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

app.prepare().then(() => {
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

  server.get('/brief', (req, res) => {
    return res.redirect(
      'https://docs.google.com/document/d/15hy6A502poF19V5pH1A9qAQoeKFWU69DPhloYGkDSM4/edit'
    )
  })

  server.get('/deadlines', (req, res) => {
    return res.redirect(
      'https://trello.com/b/jA5Uxk5L/fec17-informationen-deadlines-für-sponsoren-und-partner'
    )
  })

  server.get('/app', (req, res) => {
    return res.redirect('http://onelink.to/wq2y43')
  })

  server.get('/:page/:detail?', (req, res, next) => {
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

      if (!skipCache) {
        ssrCache.set(key, html)
      }

      res.send(html)
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}
