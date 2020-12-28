const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) => {
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
}).listen(8080)
