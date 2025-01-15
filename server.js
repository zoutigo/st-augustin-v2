/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createServer } = require('http');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require('url');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is not defined');
}

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(
        `> Server listening at ${
          dev ? `http://localhost:${port}` : NEXT_PUBLIC_BASE_URL
        }`
      );
    });
    //   `> Server listening atNEXT_PUBLIC_BASE_URL in ${
    //     dev ? 'development' : NEXT_PUBLIC_BASE_URL
    //   } mode`
  })
  .catch((err) => {
    console.error('Error starting Next.js server:', err);
  });
