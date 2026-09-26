/* eslint-disable @typescript-eslint/no-var-requires */
// Ne charger .env qu'en développement pour ne pas écraser l'env du serveur
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { createServer } = require("http");
const next = require("next");
const { ensureDefaultPages } = require("./lib/ensure-default-pages");
const { ensureDefaultEntities } = require("./lib/ensure-default-entities");

// Logs vers stdout/stderr : capturés par `docker logs` (plus de fichier
// passenger.log spécifique à cPanel).

// Configuration du serveur
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Charger et valider les variables d'environnement
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

// For NextAuth v5, ensure new env names are present in prod
if (!process.env.AUTH_URL && NEXTAUTH_URL) {
  process.env.AUTH_URL = NEXTAUTH_URL;
}
if (!process.env.AUTH_SECRET && NEXTAUTH_SECRET) {
  process.env.AUTH_SECRET = NEXTAUTH_SECRET;
}
process.env.AUTH_TRUST_HOST = process.env.AUTH_TRUST_HOST || "true";

try {
  if (!/^https?:\/\//.test(NEXTAUTH_URL)) {
    throw new Error(`Invalid protocol in NEXTAUTH_URL: "${NEXTAUTH_URL}"`);
  }
  new URL(NEXTAUTH_URL);
} catch (error) {
  console.error(`Invalid NEXTAUTH_URL: "${NEXTAUTH_URL}"`, error);
  process.exit(1);
}

if (!NEXTAUTH_SECRET) {
  console.error("NEXTAUTH_SECRET is missing");
  process.exit(1);
}

// Logs pour le débogage
console.log("Server Configuration:");
console.log("NEXTAUTH_URL:", NEXTAUTH_URL);
console.log("AUTH_URL:", process.env.AUTH_URL);
console.log("PORT:", port);

// Seed default pages before starting the server (non-blocking if it fails)
app
  .prepare()
  .then(() => {
    return ensureDefaultPages()
      .then(() => console.log("> Default pages ensured"))
      .catch((e) => console.error("> Failed to ensure default pages", e));
  })
  .then(() => {
    return ensureDefaultEntities({ postsPerEntity: 5 })
      .then(() => console.log("> Default entities ensured"))
      .catch((e) => console.error("> Failed to ensure default entities", e));
  })
  .then(() => {
    createServer((req, res) => {
      try {
        console.log("Raw request URL:", req.url);
        const rawUrl = req.url || "/";

        // Vérification et nettoyage de l'URL
        const cleanedUrl = rawUrl.replace(/^https?,\s*/, "http://");
        console.log("Cleaned URL:", cleanedUrl);

        const parsedUrl = cleanedUrl.startsWith("http")
          ? new URL(cleanedUrl)
          : new URL(cleanedUrl, NEXTAUTH_URL);

        console.log("Handling request:", parsedUrl.href);

        const pathname = parsedUrl.pathname;
        const query = Object.fromEntries(parsedUrl.searchParams);
        handle(req, res, { pathname, query });
      } catch (error) {
        const cleanedUrl = req.url
          ? req.url.replace(/^https?,\s*/, "http://")
          : "/";
        console.error("Error handling request:", {
          url: req.url,
          cleanedUrl,
          baseUrl: NEXTAUTH_URL,
          message: error.message,
          stack: error.stack,
        });
        res.statusCode = 400;
        res.end("Bad Request");
      }
    }).listen(port, (err) => {
      if (err) {
        console.error("Server startup error:", err);
        throw err;
      }
      console.log(`> Server listening at ${NEXTAUTH_URL}`);
    });
  })
  .catch((err) => {
    console.error(
      "Error during Next.js app preparation:",
      err.message,
      err.stack,
    );
    process.exit(1);
  });
