/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { ensureDefaultPages } = require('../lib/ensure-default-pages');

async function main() {
  await ensureDefaultPages();
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seed terminé');
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Seed erreur', e);
    process.exit(1);
  });

