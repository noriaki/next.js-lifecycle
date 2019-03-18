const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const createLogger = require('../lib/logger');

const port = parseInt(process.env.PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    res.logger = createLogger({ req, res });
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) { throw err; }
    console.log(`> Ready on http://localhost:${port}`);
  })
})
