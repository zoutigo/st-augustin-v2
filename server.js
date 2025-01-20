/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

// Redirection des logs vers un fichier
const logStream = fs.createWriteStream(
  '/home/bdeh8989/prod.ecole-st-augustin.fr/v2/passenger.log',
  { flags: 'a' }
);

// Function to safely convert arguments to string
function formatLogArgs(args) {
  return args
    .map((arg) => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (err) {
          return '[Unserializable Object]';
        }
      }
      return arg;
    })
    .join(' ');
}

// Overriding console methods for detailed logging
console.log = function (...args) {
  const formattedMessage =
    new Date().toISOString() + ' [INFO] ' + formatLogArgs(args);
  logStream.write(formattedMessage + '\n');
  console.info(formattedMessage);
};

console.warn = function (...args) {
  const formattedMessage =
    new Date().toISOString() + ' [WARN] ' + formatLogArgs(args);
  logStream.write(formattedMessage + '\n');
  console.warn(formattedMessage);
};

console.error = function (...args) {
  const stack = new Error().stack.split('\n').slice(2).join('\n');
  const formattedMessage =
    new Date().toISOString() +
    ' [ERROR] ' +
    formatLogArgs(args) +
    '\nStack Trace:\n' +
    stack;
  logStream.write(formattedMessage + '\n');
  console.error(formattedMessage);
};

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Charger et valider les variables d'environnement
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
let NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim()
    ?.replace(/,+$/, '')
    .replace(/\s+/g, '') || 'http://localhost:3000';

// Validate NEXT_PUBLIC_BASE_URL
if (!/^https?:\/\/.+/.test(NEXT_PUBLIC_BASE_URL)) {
  console.error(
    `Invalid URL format in NEXT_PUBLIC_BASE_URL: "${NEXT_PUBLIC_BASE_URL}"`
  );
  throw new Error('NEXT_PUBLIC_BASE_URL must start with http:// or https://');
}

try {
  new URL(NEXT_PUBLIC_BASE_URL);
} catch (error) {
  console.error(`Invalid NEXT_PUBLIC_BASE_URL: ${NEXT_PUBLIC_BASE_URL}`, error);
  throw new Error(
    `NEXT_PUBLIC_BASE_URL is not a valid URL: "${NEXT_PUBLIC_BASE_URL}". Example: https://www.example.com`
  );
}

if (!NEXTAUTH_SECRET) {
  console.error('NEXTAUTH_SECRET is missing');
  throw new Error('NEXTAUTH_SECRET environment variable is not defined');
}

// Logs pour le débogage
console.log('Server Configuration:');
console.log('NEXT_PUBLIC_BASE_URL:', NEXT_PUBLIC_BASE_URL);
console.log('PORT:', port);
console.log(
  'Raw environment NEXT_PUBLIC_BASE_URL:',
  process.env.NEXT_PUBLIC_BASE_URL
);
console.log('Processed NEXT_PUBLIC_BASE_URL:', NEXT_PUBLIC_BASE_URL);

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        console.log('Raw request URL:', req.url);
        const parsedUrl = new URL(req.url || '', NEXT_PUBLIC_BASE_URL);
        console.log('Handling request:', parsedUrl.href);

        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);
        handle(req, res, { pathname, query });
      } catch (error) {
        console.error('Error handling request:', {
          url: req.url,
          baseUrl: NEXT_PUBLIC_BASE_URL,
          message: error.message,
          stack: error.stack,
        });
        res.statusCode = 400;
        res.end('Bad Request');
      }
    }).listen(port, (err) => {
      if (err) {
        console.error('Server startup error:', err);
        throw err;
      }
      console.log(
        `> Server listening at ${
          dev ? `http://localhost:${port}` : NEXT_PUBLIC_BASE_URL
        }`
      );
    });
  })
  .catch((err) => {
    console.error('Error during Next.js app preparation:', err);
    process.exit(1);
  });
