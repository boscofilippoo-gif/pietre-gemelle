// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// I redirect 301 dai vecchi URL NON stanno qui: in un sito statico Astro li
// genererebbe come meta-refresh. Sono in public/_redirects (Netlify / Cloudflare)
// e public/.htaccess (Aruba), generati da scripts/redirects.mjs.
// ANTEPRIMA=1: build separata per mostrare la proposta, non indicizzabile (vedi scripts/anteprima.mjs).
const anteprima = process.env.ANTEPRIMA === '1';

export default defineConfig({
  site: 'https://www.pietregemelle.it',
  outDir: anteprima ? './dist-anteprima' : './dist',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    layout: 'constrained',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
