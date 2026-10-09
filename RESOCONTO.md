# Resoconto — Pietre Gemelle Resort (8 ottobre 2026)

## Cosa c'è

32 pagine:
- Home
- Il resort
- Appartamenti (indice + 16 schede)
- SPA
- La valle (indice + 4 stagioni)
- Offerte
- Info pratiche
- Contatti
- Privacy, Cookie, Crediti
- 404

**Momenti signature**
- **Le due pietre** — animazione d'apertura (solo al primo arrivo o alla ricarica) e racconto fissato allo scroll in home e nella pagina Il resort.
- **Sedici Quattromila** — la cresta del Monte Rosa disegnata con le quote reali: ogni vetta è un appartamento.
- **Una giornata da noi** — racconta i servizi seguendo l'ora reale di Riva Valdobbia; alba e tramonto sono calcolati.

## Velocità (Lighthouse, home)

| | Vecchio sito | Nuovo sito |
|---|---|---|
| Performance mobile | 58 | 95–97 |
| LCP mobile | 22,7 s | 2,4 s |
| Performance desktop | 75 | 100 |
| Peso della pagina | 6,5 MB | 0,35 MB |
| Richieste | 238 | 14 |
| SEO | 83 | 100 |
| Best practices | 77 | 100 |

## Finto o da collegare

- **Modulo contatti**: mostra "grazie" ma **non invia nulla** (`integrazioni.formEndpoint` è vuoto).
- **Booking engine 5stelle\***: il link funziona con le date. Il formato `rooms=A,A` (adulti) è dedotto dal vecchio link; bambini non gestiti: da confermare con il fornitore.
- **Google Analytics**: non caricato. Servono la scelta della proprietà (ce ne sono due) e un banner di consenso.
- **Webcam**: segnaposto. La fonte del vecchio sito non funziona.
- **Privacy e cookie**: testi provvisori, da far scrivere al consulente.
- **Lyskamm Orientale**: nessuna foto propria (il vecchio sito mostrava quelle di Ludwigshöhe).

## Dati non verificati (sottolineati a puntini nel sito)

- Il documento del 1217 ("de Petris Zumellis") e la divisione del 1475: la fonte è solo il vecchio sito. È confermato da alagna.it che le pietre sono nel giardino.
- La menzione speciale della SPA al concorso "La Ceramica e il Progetto" 2014.
- SPA: 1 h 30 (vecchio sito) o massimo 3 ore (Booking)? Bagno turco e gommage?
- Email: `info@pietregemelle.com` o `mail@pietregemelle.it`?
- CAP: 13021 o 13020?
- Navetta privata del resort oltre allo skibus pubblico?
- Capienza di Punta Parrot e Punta Nordend (4 o 4+1).
- Piantine di Lyskamm Occidentale e Orientale (nomi scambiati sul vecchio sito).
- Offerte: compleanno, anniversario e periodi Happy Ski 2026/27.
- Elenco dei partner ("amici della valle"), fermo al 2024.
- Classificazione: il sito nuovo **non** scrive "4 stelle" da nessuna parte.
- Il padiglione della reception accanto al masso: è una delle due pietre? Serve la foto delle pietre.

## Foto

- Foto originali dal vecchio sito, con una correzione colore uniforme (originali in `_materiali/`).
- Territorio da Wikimedia Commons, con crediti visibili.
- Escluse le circa 50 foto degli hotel di Rimini.
- **Il vero salto di qualità arriva con un servizio fotografico.** Le foto attuali arrivano a 1200 px e gli interni sono datati. Mancano: le due pietre, l'alba dalla camera, i materiali, il giardino, l'autunno.

## Redirect

Tutti i **101 URL** del vecchio sito hanno un redirect 301 verso una pagina esistente (verificato). Le pagine `/en/…` vanno in home con un 302, finché non c'è la versione inglese.

## Prossimi passi

1. Verifiche con il cliente (elenco sopra).
2. Servizio fotografico.
3. Collegamento del modulo contatti, di GA4 con consenso e della webcam.
4. Versione inglese (`/en/`).
5. Pubblicazione su Netlify o Cloudflare Pages, con il dominio che resta su Aruba e i record MX della posta intatti.
