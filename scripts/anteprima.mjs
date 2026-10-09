// Dopo `npm run build:anteprima`: blocca l'indicizzazione della versione di anteprima.
import { writeFile, rm } from 'node:fs/promises';
const dir = 'dist-anteprima';
await writeFile(`${dir}/robots.txt`, 'User-agent: *\nDisallow: /\n');
await writeFile(`${dir}/_headers`, '/*\n  X-Robots-Tag: noindex, nofollow\n');
// In anteprima i redirect del vecchio dominio non servono e la sitemap non va esposta
for (const f of ['_redirects', '.htaccess', 'sitemap-index.xml', 'sitemap-0.xml']) await rm(`${dir}/${f}`, { force: true });
console.log(`Anteprima pronta in ${dir}/ (noindex, robots.txt Disallow, X-Robots-Tag)`);
