/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Configurations et variables d'environnement
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.trim();

// Vérifications des variables d'environnement
if (!NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is not defined');
}
if (!NEXT_PUBLIC_BASE_URL || !/^https?:\/\/.+$/.test(NEXT_PUBLIC_BASE_URL)) {
  throw new Error(
    'NEXT_PUBLIC_BASE_URL is not defined or is not a valid URL. Example: https://www.example.com'
  );
}

// Log des variables pour débogage
console.log('Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', port);
console.log('NEXT_PUBLIC_BASE_URL:', NEXT_PUBLIC_BASE_URL);
console.log('NEXTAUTH_SECRET: [REDACTED]');

// Démarrage de l'application
app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        // Valider et parser l'URL
        const parsedUrl = new URL(req.url || '', NEXT_PUBLIC_BASE_URL);
        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);

        console.log(`Handling request: ${pathname}`, query);

        // Gérer la requête avec Next.js
        handle(req, res, { pathname, query });
      } catch (err) {
        // Log des erreurs
        console.error('Error handling request:', req.url, err.message);
        res.statusCode = 400;
        res.end('Bad Request');
      }
    }).listen(port, (err) => {
      if (err) {
        console.error('Server startup error:', err.message);
        process.exit(1);
      }
      console.log(
        `> Server listening at ${
          dev ? `http://localhost:${port}` : NEXT_PUBLIC_BASE_URL
        }`
      );
    });
  })
  .catch((err) => {
    // Gestion des erreurs de préparation
    console.error('Error during Next.js app preparation:', err.message);
    process.exit(1);
  });
