/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const { exec } = require('child_process');
const fs = require('fs');

// Ne charger .env qu'en développement pour ne pas écraser l'env du serveur
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const logPath =
  process.env.NEXTAUTH_URL === 'https://www.ecole-st-augustin.fr'
    ? '/home/bdeh8989/prod.ecole-st-augustin.fr/v2/passenger.log'
    : '/home/bdeh8989/dev.ecole-st-augustin.fr/v2/passenger.log';

console.log(`Démarrage du serveur avec les logs vers ${logPath}`);

const command = `NODE_ENV=production node server.js > ${logPath} 2>&1 &`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors du démarrage du serveur: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erreur stderr: ${stderr}`);
  }
  console.log(`Serveur démarré avec succès: ${stdout}`);
});
