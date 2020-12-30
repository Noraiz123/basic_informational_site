const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true)
  let filename = (query.pathname === '/' ? './index.html' : '.' + query.pathname)

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      return res.end('404 Not Found')
    }
    if (filename === '') {
      filename = 'index.html'
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    return res.end()
  })
})

server.listen(8080, 'localhost', () => {
  console.log('Server is running.')
})
