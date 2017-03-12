const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')
const nowLogs = require('now-logs')

nowLogs('frontendconf')

const app = next({ dev: (process.env.NODE_ENV !== 'production') })
const handle = app.getRequestHandler()
const route = pathMatch()
const pageMatch = route('/:page')
const newsMatch = route('/news/:id')
const hostMatch = route('/hosts/:id')
const speakerMatch = route('/speakers/:id')
const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname } = parse(req.url)
    const pageParams = pageMatch(pathname)
    const newsParams = newsMatch(pathname)
    const hostParams = hostMatch(pathname)
    const speakerParams = speakerMatch(pathname)

    if (pageParams) {
      app.render(req, res, '/index', pageParams)

      return
    }

    if (newsParams) {
      app.render(req, res, '/news', newsParams)

      return
    }

    if (hostParams) {
      app.render(req, res, '/host', hostParams)

      return
    }

    if (speakerParams) {
      app.render(req, res, '/speaker', speakerParams)

      return
    }

    handle(req, res)
  }).listen(port, (err) => {
    if (err) throw err

    console.log('> Ready on http://localhost:' + port)
  })
})
