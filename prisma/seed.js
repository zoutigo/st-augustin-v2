/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { ensureDefaultPages } = require('../lib/ensure-default-pages');
const { ensureDefaultEntities } = require('../lib/ensure-default-entities');

async function main() {
  await ensureDefaultPages();
  await ensureDefaultEntities({ postsPerEntity: 5 });
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
