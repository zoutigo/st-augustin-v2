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
  logStream.write(
    new Date().toISOString() + ' [INFO] ' + formatLogArgs(args) + '\n'
  );
  process.stdout.write(
    new Date().toISOString() + ' [INFO] ' + formatLogArgs(args) + '\n'
  );
};

console.warn = function (...args) {
  logStream.write(
    new Date().toISOString() + ' [WARN] ' + formatLogArgs(args) + '\n'
  );
  process.stderr.write(
    new Date().toISOString() + ' [WARN] ' + formatLogArgs(args) + '\n'
  );
};

console.error = function (...args) {
  const stack = new Error().stack.split('\n').slice(2).join('\n');
  logStream.write(
    new Date().toISOString() +
      ' [ERROR] ' +
      formatLogArgs(args) +
      '\nStack Trace:\n' +
      stack +
      '\n'
  );
  process.stderr.write(
    new Date().toISOString() +
      ' [ERROR] ' +
      formatLogArgs(args) +
      '\nStack Trace:\n' +
      stack +
      '\n'
  );
};

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Charger et valider les variables d'environnement
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
let NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.trim()?.replace(/,+$/, '') ||
  'http://localhost:3000';

try {
  new URL(NEXT_PUBLIC_BASE_URL); // Valide l'URL
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

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        console.log('Incoming request URL:', req.url);
        const parsedUrl = new URL(req.url || '', NEXT_PUBLIC_BASE_URL);
        console.log('Handling request:', parsedUrl.href);

        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);
        handle(req, res, { pathname, query });
      } catch (error) {
        console.error('Error handling request:', req.url, error);
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
