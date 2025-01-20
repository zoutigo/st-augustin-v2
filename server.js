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

console.log = function (...args) {
  logStream.write(
    new Date().toISOString() + ' [INFO] ' + args.join(' ') + '\n'
  );
  process.stdout.write(
    new Date().toISOString() + ' [INFO] ' + args.join(' ') + '\n'
  );
};

console.error = function (...args) {
  logStream.write(
    new Date().toISOString() + ' [ERROR] ' + args.join(' ') + '\n'
  );
  process.stderr.write(
    new Date().toISOString() + ' [ERROR] ' + args.join(' ') + '\n'
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
} catch {
  throw new Error(
    `NEXT_PUBLIC_BASE_URL is not a valid URL: "${NEXT_PUBLIC_BASE_URL}". Example: https://www.example.com`
  );
}

if (!NEXTAUTH_SECRET) {
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
        const parsedUrl = new URL(req.url || '', NEXT_PUBLIC_BASE_URL);
        console.log('Handling request:', parsedUrl.href);

        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);
        handle(req, res, { pathname, query });
      } catch (error) {
        console.error('Error handling request:', req.url, error.message);
        res.statusCode = 400;
        res.end('Bad Request');
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(
        `> Server listening at ${
          dev ? `http://localhost:${port}` : NEXT_PUBLIC_BASE_URL
        }`
      );
    });
  })
  .catch((err) => {
    console.error('Error during Next.js app preparation:', err.message);
    process.exit(1);
  });
