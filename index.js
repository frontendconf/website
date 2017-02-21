const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')
const nowLogs = require('now-logs')

nowLogs('frontendconf')

const app = next({ dev: (process.env.NODE_ENV !== 'production') })
const handle = app.getRequestHandler()
const route = pathMatch()
const match = route('/wine/:id')
const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname } = parse(req.url)
    const params = match(pathname)

    if (params === false) {
      handle(req, res)

      return
    }

    app.render(req, res, '/wine', params)
  }).listen(port, (err) => {
    if (err) throw err

    console.log('> Ready on http://localhost:' + port)
  })
})
