// Verifica visiva: per ogni pagina, desktop (1440) e mobile (390), scorre a piccoli passi
// (così le animazioni legate allo scroll partono davvero) e salva uno screenshot per schermata.
// Controlla anche errori in console, scroll orizzontale ed elementi fuori schermo.
// Uso: node scripts/verifica.mjs [base] [pagina1 pagina2 ...]
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const pagine = process.argv.slice(3).length ? process.argv.slice(3) : [
  '/', '/il-resort/', '/appartamenti/', '/appartamenti/punta-gnifetti/', '/appartamenti/lyskamm-orientale/',
  '/spa/', '/la-valle/', '/la-valle/inverno/', '/offerte/', '/info-pratiche/', '/contatti/', '/privacy/', '/404.html',
];
const out = '_verifica';
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const devices = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};
const report = [];
for (const p of pagine) {
  for (const [nome, dev] of Object.entries(devices)) {
    const ctx = await browser.newContext({ ...dev, locale: 'it-IT', timezoneId: 'Europe/Rome' });
    const page = await ctx.newPage();
    const errori = [];
    page.on('console', (m) => m.type() === 'error' && errori.push(m.text().slice(0, 200)));
    page.on('pageerror', (e) => errori.push('JS: ' + e.message.slice(0, 200)));
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3800); // animazione d'apertura
    const slug = p.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
    const vh = dev.viewport.height;
    let i = 0;
    let y = 0;
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: `${out}/${slug}-${nome}-${String(i++).padStart(2, '0')}.png` });
    const fuori = new Set();
    while (y < H - vh) {
      for (let k = 0; k < 6; k++) { await page.evaluate((d) => window.scrollBy(0, d), vh / 7); await page.waitForTimeout(90); }
      await page.waitForTimeout(700);
      y = await page.evaluate(() => window.scrollY);
      const nuovoH = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.screenshot({ path: `${out}/${slug}-${nome}-${String(i++).padStart(2, '0')}.png` });
      const f = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        return [...document.querySelectorAll('main *, footer *')].filter((el) => {
          const r = el.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > innerHeight) return false;
          const st = getComputedStyle(el);
          if (st.position === 'fixed' || el.closest('.cresta-scroll')) return false;
          return r.right > w + 1 || r.left < -1;
        }).slice(0, 5).map((el) => el.tagName.toLowerCase() + '.' + [...el.classList].join('.'));
      });
      f.forEach((x) => fuori.add(x));
      if (i > 60 || y + vh >= nuovoH - 2) break;
    }
    const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    report.push({ pagina: p, device: nome, schermate: i, overflowX, errori, fuori: [...fuori].slice(0, 8) });
    await ctx.close();
  }
}
await browser.close();
for (const r of report) console.log(JSON.stringify(r));
