/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const winston = require('winston');

// Configuration de Winston pour les logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: '/home/bdeh8989/prod.ecole-st-augustin.fr/v2/passenger.log',
    }),
    new winston.transports.Console(),
  ],
});

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
  logger.error(`Invalid NEXT_PUBLIC_BASE_URL: ${NEXT_PUBLIC_BASE_URL}`, {
    stack: error.stack,
  });
  throw new Error(
    `NEXT_PUBLIC_BASE_URL is not a valid URL: "${NEXT_PUBLIC_BASE_URL}". Example: https://www.example.com`
  );
}

if (!NEXTAUTH_SECRET) {
  logger.error('NEXTAUTH_SECRET is missing');
  throw new Error('NEXTAUTH_SECRET environment variable is not defined');
}

// Logs pour le débogage
logger.info('Server Configuration:');
logger.info(`NEXT_PUBLIC_BASE_URL: ${NEXT_PUBLIC_BASE_URL}`);
logger.info(`PORT: ${port}`);

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        logger.info(`Incoming request URL: ${req.url}`);
        const parsedUrl = new URL(req.url || '', NEXT_PUBLIC_BASE_URL);
        logger.info(`Handling request: ${parsedUrl.href}`);

        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);
        handle(req, res, { pathname, query });
      } catch (error) {
        logger.error('Error handling request', {
          requestedUrl: req.url,
          baseUrl: NEXT_PUBLIC_BASE_URL,
          errorMessage: error.message,
          stack: error.stack,
        });
        res.statusCode = 400;
        res.end('Bad Request');
      }
    }).listen(port, (err) => {
      if (err) {
        logger.error('Server startup error:', {
          message: err.message,
          stack: err.stack,
        });
        throw err;
      }
      logger.info(
        `> Server listening at ${
          dev ? `http://localhost:${port}` : NEXT_PUBLIC_BASE_URL
        }`
      );
    });
  })
  .catch((err) => {
    logger.error('Error during Next.js app preparation:', {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });
