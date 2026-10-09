// Screenshot "a colpo d'occhio" (prima schermata) del nuovo sito, per il confronto con il vecchio.
import { chromium } from 'playwright-core';
const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const pagine = { home: '/', appartamenti: '/appartamenti/', 'appartamento': '/appartamenti/punta-gnifetti/', spa: '/spa/', contatti: '/contatti/' };
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const [dev, opt] of Object.entries({ desktop: { viewport: { width: 1440, height: 900 } }, mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } })) {
  for (const [k, p] of Object.entries(pagine)) {
    const ctx = await b.newContext(opt); const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: 'networkidle' }); await page.waitForTimeout(4200);
    await page.screenshot({ path: `_confronto/nuovo/${k}-${dev}.png` }); await ctx.close();
  }
}
await b.close();
