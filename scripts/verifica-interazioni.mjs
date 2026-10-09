// Controlla le parti interattive: apertura, menu mobile, finestra prenotazione, filtri, movimento ridotto.
import { chromium } from 'playwright-core';
const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const out = '_verifica';
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const log = (...a) => console.log(...a);

// 1. apertura (primo arrivo) e nessuna apertura al cambio pagina
let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let p = await ctx.newPage();
await p.goto(base + '/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(700); await p.screenshot({ path: `${out}/x-intro-1.png` });
await p.waitForTimeout(700); await p.screenshot({ path: `${out}/x-intro-2.png` });
await p.waitForTimeout(2500);
await p.click('.header-nav a[href="/spa/"]'); await p.waitForLoadState('domcontentloaded'); await p.waitForTimeout(300);
log('intro dopo navigazione interna:', await p.evaluate(() => document.documentElement.classList.contains('show-intro')));
await p.reload(); await p.waitForTimeout(300);
log('intro dopo ricarica:', await p.evaluate(() => document.documentElement.classList.contains('show-intro')));
// header: tema sopra sezione scura / chiara e nascondi/mostra
await p.goto(base + '/il-resort/'); await p.waitForTimeout(3500);
for (const y of [0, 900, 2600, 4400]) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(900); log('header @', y, await p.evaluate(() => { const h = document.querySelector('[data-header]'); return h.dataset.headerTheme + ' ' + h.className; })); }
await p.evaluate(() => window.scrollBy(0, -300)); await p.waitForTimeout(900);
log('header dopo risalita:', await p.evaluate(() => document.querySelector('[data-header]').className));
// finestra prenotazione
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(800);
await p.click('.header-cta'); await p.waitForTimeout(600);
await p.screenshot({ path: `${out}/x-prenota.png` });
log('date proposte:', await p.inputValue('[data-arrivo]'), await p.inputValue('[data-partenza]'));
const [nav] = await Promise.all([p.waitForRequest((r) => r.url().includes('secure-reservation.cloud'), { timeout: 8000 }).catch(() => null), p.click('.prenota-cerca')]);
log('link booking:', nav ? nav.url() : 'NESSUNA RICHIESTA');
await ctx.close();

// 2. mobile: menu e filtri
ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
p = await ctx.newPage();
await p.goto(base + '/appartamenti/'); await p.waitForTimeout(3500);
await p.click('[data-menu-toggle]'); await p.waitForTimeout(500);
await p.screenshot({ path: `${out}/x-menu-mobile.png` });
await p.click('[data-menu-toggle]'); await p.waitForTimeout(400);
await p.click('[data-filtro="6-6"]'); await p.waitForTimeout(400);
log('appartamenti visibili per 6:', await p.evaluate(() => [...document.querySelectorAll('.app-grid li')].filter((l) => !l.hidden).length));
await ctx.close();

// 3. movimento ridotto: tutto visibile
ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
p = await ctx.newPage();
await p.goto(base + '/'); await p.waitForTimeout(1200);
log('reduce: intro?', await p.evaluate(() => document.documentElement.classList.contains('show-intro')),
  'elementi invisibili:', await p.evaluate(() => [...document.querySelectorAll('main *')].filter((e) => getComputedStyle(e).opacity === '0' && e.getBoundingClientRect().height > 0).length));
await p.screenshot({ path: `${out}/x-reduce.png`, fullPage: true });
await ctx.close();
await b.close();
