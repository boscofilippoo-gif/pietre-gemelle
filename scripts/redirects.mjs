// Genera i redirect 301 dai vecchi URL WordPress ai nuovi, in due formati:
// public/_redirects (Netlify, Cloudflare Pages) e public/.htaccess (Aruba / Apache).
// Fonte unica: src/data/redirects.json (dalla tabella in _materiali/analisi/redirect-301.md).
import { readFile, writeFile } from 'node:fs/promises';

const list = JSON.parse(await readFile('src/data/redirects.json', 'utf8')).filter((r) => r.da !== '/' && r.da !== r.a);

const netlify = [
  '# Redirect 301 dal vecchio sito WordPress — generato da scripts/redirects.mjs',
  ...list.map((r) => `${r.da}  ${r.a}  301`),
  ...list.map((r) => `${r.da.replace(/\/$/, '')}  ${r.a}  301`),
  '# Versione inglese del vecchio sito: provvisorio finché non c’è /en/',
  '/en/*  /  302',
  '/it_it/*  /  301',
  '/wp-content/*  /  410',
  '/wp-json/*  /  410',
  '/feed/*  /  410',
  '/comments/feed/*  /  410',
].join('\n');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const apache = [
  '# Redirect 301 dal vecchio sito WordPress — generato da scripts/redirects.mjs',
  'RewriteEngine On',
  ...list.map((r) => `RewriteRule ^${esc(r.da.replace(/^\//, '').replace(/\/$/, ''))}/?$ ${r.a} [R=301,L]`),
  'RewriteRule ^en/ / [R=302,L]',
  'RewriteRule ^it_it/ / [R=301,L]',
  'RewriteRule ^(wp-content|wp-json|feed|comments/feed)(/|$) - [G,L]',
  'ErrorDocument 404 /404.html',
].join('\n');

await writeFile('public/_redirects', netlify + '\n');
await writeFile('public/.htaccess', apache + '\n');
console.log(`${list.length} redirect scritti in public/_redirects e public/.htaccess`);
