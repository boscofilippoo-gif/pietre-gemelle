import { appartamenti } from '../data/resort';

// Profilo schematico del Monte Rosa: le 16 vette in ordine lungo la cresta
// (da ovest a est, come in appartamenti[]), alle loro quote reali.
export const W = 1600;
export const H = 360;
const QMIN = 3500;
const QMAX = 4700;
const TOP = 40; // margine sopra la vetta più alta

export function y(q: number) {
  return H - ((q - QMIN) / (QMAX - QMIN)) * (H - TOP);
}

// pseudo-casuale deterministico, per creste sempre uguali
function rnd(i: number) {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export type Picco = { slug: string; nome: string; quota: number; x: number; y: number; xp: number; yp: number };

export function cresta() {
  const n = appartamenti.length;
  const margin = 70;
  const step = (W - margin * 2) / (n - 1);
  const picchi: Picco[] = appartamenti.map((a, i) => {
    const x = margin + i * step + (rnd(i) - 0.5) * step * 0.35;
    const yy = y(a.quota);
    return { slug: a.slug, nome: a.nome, quota: a.quota, x, y: yy, xp: (x / W) * 100, yp: (yy / H) * 100 };
  });

  // tra due vette: un colle più basso, con qualche spigolo di roccia
  const pts: [number, number][] = [[0, y(3560)], [margin * 0.5, y(3720)]];
  picchi.forEach((p, i) => {
    pts.push([p.x, p.y]);
    const next = picchi[i + 1];
    if (!next) return;
    const colle = Math.min(p.quota, next.quota) - 110 - rnd(i + 3) * 160;
    const dx = next.x - p.x;
    pts.push([p.x + dx * (0.22 + rnd(i + 7) * 0.12), y((p.quota + colle) / 2 + 30)]);
    pts.push([p.x + dx * (0.5 + (rnd(i + 11) - 0.5) * 0.2), y(colle)]);
    pts.push([p.x + dx * (0.74 + rnd(i + 13) * 0.1), y((next.quota + colle) / 2 + 20)]);
  });
  pts.push([W - margin * 0.5, y(3700)], [W, y(3540)]);

  const linea = 'M' + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L');
  const area = `${linea} L${W} ${H} L0 ${H} Z`;
  return { picchi, linea, area };
}
