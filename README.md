# Pietre Gemelle Resort — proposta di nuovo sito

Sito statico multipagina in Astro 7, Tailwind CSS 4, GSAP (ScrollTrigger e SplitText) e Lenis. Font self-hosted con Fontsource.

## Comandi

```bash
npm install
npm run dev        # sviluppo, http://localhost:4321
npm run build      # genera dist/
npx astro preview  # anteprima della build
npm run build:anteprima  # versione da mostrare al cliente in dist-anteprima/, non indicizzabile
```

## Dove sono le cose

- **Dati della struttura** (contatti, appartamenti, SPA, offerte, info, crediti): `src/data/resort.ts`. Tutte le pagine leggono da qui.
- **Dati da verificare**: nel sito sono avvolti nel componente `<V>` (sottolineatura punteggiata, con la nota al passaggio del mouse). Elenco completo in `RESOCONTO.md`.
- **Foto**: `scripts/foto.mjs` seleziona, rinomina e corregge il colore, e scrive in `src/assets/foto/`. Gli originali sono in `_materiali/foto-originali-sito/` e `_materiali/wikimedia/`.
- **Redirect 301 dal vecchio sito**: `src/data/redirects.json` → `node scripts/redirects.mjs` genera `public/_redirects` (Netlify, Cloudflare Pages) e `public/.htaccess` (Aruba).
- **Analisi e proposta**: `_materiali/analisi/`.
- **Verifica visiva**: `node scripts/verifica.mjs` (screenshot desktop e mobile in `_verifica/`) e `node scripts/verifica-interazioni.mjs`.
- **Confronto prima/dopo**: `_confronto/`.
