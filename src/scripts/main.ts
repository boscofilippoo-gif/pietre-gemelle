import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { sole } from '../lib/sole';
import { resort, giornata, linkPrenotazione } from '../data/resort';

gsap.registerPlugin(ScrollTrigger, SplitText);

const html = document.documentElement;
const reduce = html.classList.contains('reduce');
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

// ————————————————————————————————————————————————— scroll morbido
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ————————————————————————————————————————————————— ora di Riva Valdobbia
const TZ = 'Europe/Rome';
const fmt = (d: Date) => new Intl.DateTimeFormat('it-IT', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).format(d);
const oreDecimali = (d: Date) => {
  const [h, m] = fmt(d).split(':').map(Number);
  return h + m / 60;
};
const ymdRoma = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d); // YYYY-MM-DD

function statoStagione(oggi = new Date()) {
  const g = ymdRoma(oggi);
  const chiuso = g >= resort.chiusura.dal && g <= resort.chiusura.al;
  const riapre = new Date(resort.chiusura.riapertura + 'T12:00:00');
  const quando = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long' }).format(riapre);
  return { chiuso, testo: chiuso ? `Ora siamo chiusi per la pausa d’autunno. Riapriamo il ${quando}.` : '' };
}

function momentoAttuale(now = new Date()) {
  const t = sole(now, resort.geo.lat, resort.geo.lng);
  const alba = oreDecimali(t.alba);
  const h = oreDecimali(now);
  const r = (v: number | string) => (v === 'alba' ? alba : (v as number));
  const id = giornata.find((m) => {
    const da = r(m.da), a = r(m.a);
    return da < a ? h >= da && h < a : h >= da || h < a;
  })?.id ?? 'notte';
  return { id, ora: fmt(now), alba: fmt(t.alba), tramonto: fmt(t.tramonto) };
}

function aggiornaOrologio() {
  const m = momentoAttuale();
  $$('[data-ora-ora]').forEach((el) => (el.textContent = m.ora));
  $$('[data-ora-alba]').forEach((el) => (el.textContent = m.alba));
  $$('[data-ora-tramonto]').forEach((el) => (el.textContent = m.tramonto));
  $$('[data-momento]').forEach((el) => el.classList.toggle('is-adesso', el.dataset.momento === m.id));
  const adesso = giornata.find((g) => g.id === m.id)?.adesso;
  $$('[data-ora-momento]').forEach((el) => (el.textContent = adesso ? `: ${adesso}.` : '.'));
  const s = statoStagione();
  $$('[data-stato-chiuso]').forEach((el) => { el.textContent = s.testo; el.hidden = !s.chiuso; });
}
aggiornaOrologio();
setInterval(aggiornaOrologio, 30_000);

// ————————————————————————————————————————————————— header
const header = $('[data-header]');
const mobileBar = $('[data-mobile-bar]');
let lastY = window.scrollY;
let acc = 0;
function aggiornaHeader() {
  if (!header) return;
  const y = window.scrollY;
  const hh = header.offsetHeight;
  const probe = Math.min(hh / 2, 40);
  let tema = 'light';
  for (const s of $$('[data-theme]')) {
    const r = s.getBoundingClientRect();
    if (r.top <= probe && r.bottom > probe) { tema = s.dataset.theme!; break; }
  }
  header.dataset.headerTheme = tema;
  header.classList.toggle('is-compact', y > 40);
  // nascondi scendendo, mostra risalendo (con soglia, senza sfarfallio)
  const d = y - lastY;
  acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
  if (!header.classList.contains('menu-open')) {
    if (y < 120) header.classList.remove('is-hidden');
    else if (acc > 24) header.classList.add('is-hidden');
    else if (acc < -16) header.classList.remove('is-hidden');
  }
  lastY = y;
  // la barra mobile si toglie di mezzo sopra il footer
  const footer = $('footer');
  if (mobileBar && footer) mobileBar.classList.toggle('is-away', footer.getBoundingClientRect().top < window.innerHeight - 40);
}
if (lenis) lenis.on('scroll', aggiornaHeader);
else window.addEventListener('scroll', aggiornaHeader, { passive: true });
window.addEventListener('resize', aggiornaHeader);
aggiornaHeader();

// menu mobile
const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
const menu = $('[data-menu]');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu!.hidden = !open;
  header!.classList.toggle('menu-open', open);
  if (open) lenis?.stop(); else lenis?.start();
});

// ————————————————————————————————————————————————— verifica disponibilità
const dialog = $<HTMLDialogElement>('[data-prenota]');
const form = $<HTMLFormElement>('[data-prenota-form]');
const iso = (d: Date) => ymdRoma(d);
const addDays = (s: string, n: number) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return iso(d); };
$$('[data-apri-prenota]').forEach((b) => b.addEventListener('click', () => {
  if (!dialog || !form) return;
  const oggi = iso(new Date());
  const s = statoStagione();
  const arrivo = form.querySelector<HTMLInputElement>('[data-arrivo]')!;
  const partenza = form.querySelector<HTMLInputElement>('[data-partenza]')!;
  arrivo.min = oggi;
  if (!arrivo.value) arrivo.value = s.chiuso ? resort.chiusura.riapertura : addDays(oggi, 7);
  partenza.min = addDays(arrivo.value, 1);
  if (!partenza.value || partenza.value <= arrivo.value) partenza.value = addDays(arrivo.value, 2);
  lenis?.stop();
  dialog.showModal();
}));
form?.querySelector('[data-arrivo]')?.addEventListener('change', (e) => {
  const a = (e.target as HTMLInputElement).value;
  const p = form.querySelector<HTMLInputElement>('[data-partenza]')!;
  p.min = addDays(a, 1);
  if (p.value <= a) p.value = addDays(a, 2);
});
dialog?.addEventListener('close', () => {
  lenis?.start();
  if (dialog.returnValue !== 'cerca' || !form) return;
  const f = new FormData(form);
  window.location.href = linkPrenotazione(String(f.get('arrivo')), String(f.get('partenza')), Number(f.get('adulti')));
});

// ————————————————————————————————————————————————— modulo contatti (segnaposto)
$$<HTMLFormElement>('[data-form-contatti]').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!f.reportValidity()) return;
  f.hidden = true;
  const ok = $('[data-form-grazie]');
  if (ok) { ok.hidden = false; ok.focus(); }
}));

// ————————————————————————————————————————————————— filtri appartamenti
$$('[data-filtri]').forEach((wrap) => {
  const btns = $$<HTMLButtonElement>('[data-filtro]', wrap);
  btns.forEach((b) => b.addEventListener('click', () => {
    const [min, max] = (b.dataset.filtro ?? '0-9').split('-').map(Number);
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('[data-ospiti]').forEach((el) => {
      const n = Number(el.dataset.ospiti);
      const ok = n >= min && n <= max;
      if (el.matches('.vetta')) el.classList.toggle('is-dim', !ok);
      else el.hidden = !ok;
    });
    ScrollTrigger.refresh();
  }));
});

// ————————————————————————————————————————————————— animazioni
function intro(): Promise<void> {
  return new Promise((resolve) => {
    if (!html.classList.contains('show-intro')) return resolve();
    const el = $('[data-intro]')!;
    lenis?.stop();
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => { html.classList.remove('show-intro'); lenis?.start(); resolve(); },
    });
    tl.from($$('.pietra', el), { opacity: 0, scale: 0.9, transformOrigin: '50% 60%', duration: 0.6, ease: 'power2.out' })
      .to($('.pietra-sx', el), { x: -34, rotate: -4, transformOrigin: '20% 100%', duration: 1 }, '+=0.05')
      .to($('.pietra-dx', el), { x: 34, rotate: 4, transformOrigin: '80% 100%', duration: 1 }, '<')
      .to($('.intro-logo', el), { opacity: 1, duration: 0.6, ease: 'power2.out' }, '<0.25')
      .to(el, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '+=0.35');
  });
}

function reveal(el: HTMLElement) {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', delay: Number(el.dataset.reveal || 0),
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  });
}
function revealImg(el: HTMLElement) {
  gsap.to(el, {
    clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
}
function split(el: HTMLElement) {
  const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'riga' });
  gsap.from(s.lines, {
    yPercent: 105, duration: 1.15, ease: 'expo.out', stagger: 0.08,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  });
}
function draw(el: SVGPathElement) {
  const len = el.getTotalLength();
  gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len }, {
    strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut',
    scrollTrigger: { trigger: el.closest('svg') ?? el, start: 'top 90%', once: true },
  });
}
function parallax(el: HTMLElement) {
  gsap.fromTo(el, { yPercent: -6 }, {
    yPercent: 6, ease: 'none',
    scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

// Le due pietre: si separano mentre scorre il racconto
function pinPietre(sec: HTMLElement) {
  const sx = $('.pietra-sx', sec), dx = $('.pietra-dx', sec);
  const frasi = $$('[data-frase]', sec);
  const mobile = window.innerWidth < 768;
  const dist = mobile ? 26 : 70;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: sec, start: 'top top', end: `+=${frasi.length * 85}%`, pin: true, scrub: 0.6, anticipatePin: 1 },
  });
  tl.to(sx, { x: -dist, rotate: -5, transformOrigin: '20% 100%', duration: frasi.length }, 0)
    .to(dx, { x: dist, rotate: 5, transformOrigin: '80% 100%', duration: frasi.length }, 0);
  frasi.forEach((f, i) => {
    if (i > 0) tl.fromTo(f, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35 }, i - 0.15);
    if (i < frasi.length - 1) tl.to(f, { opacity: 0, y: -30, duration: 0.35 }, i + 0.65);
  });
}

// La giornata: le foto si alternano al ritmo dei momenti
function pinGiornata(sec: HTMLElement) {
  const voci = $$('[data-momento]', sec);
  const foto = $$('[data-momento-foto]', sec);
  const set = (i: number) => {
    voci.forEach((v, k) => v.classList.toggle('is-on', k === i));
    foto.forEach((f, k) => f.classList.toggle('is-on', k === i));
  };
  set(0);
  ScrollTrigger.create({
    trigger: sec, start: 'top top', end: `+=${voci.length * 60}%`, pin: true, anticipatePin: 1,
    onUpdate: (st) => set(Math.min(voci.length - 1, Math.floor(st.progress * voci.length))),
  });
}

// SPA: soglie che si aprono una dopo l'altra
function pinSoglie(sec: HTMLElement) {
  const frames = $$('[data-soglia]', sec);
  const caps = $$('[data-soglia-cap]', sec);
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: sec, start: 'top top', end: `+=${frames.length * 70}%`, pin: true, scrub: 0.6, anticipatePin: 1 },
  });
  frames.forEach((f, i) => {
    if (i === 0) return;
    tl.fromTo(f, { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, i - 1)
      .fromTo($('img', f), { scale: 1.15 }, { scale: 1, duration: 1 }, i - 1)
      .to(caps[i - 1], { opacity: 0, y: -16, duration: 0.3 }, i - 0.9)
      .fromTo(caps[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, i - 0.4);
  });
}

async function avvia() {
  if (reduce) {
    $$('[data-momento]').forEach((v, i) => v.classList.toggle('is-on', i === 0));
    $$('[data-momento-foto]').forEach((f, i) => f.classList.toggle('is-on', i === 0));
    return;
  }
  // Gli ScrollTrigger vengono creati nell'ordine in cui gli elementi compaiono nella pagina
  const sel = '[data-reveal],[data-reveal-img],[data-split],[data-draw],[data-parallax],[data-pin-pietre],[data-pin-giornata],[data-pin-soglie]';
  for (const el of $$(sel)) {
    if (el.matches('[data-pin-pietre]')) pinPietre(el);
    else if (el.matches('[data-pin-giornata]')) pinGiornata(el);
    else if (el.matches('[data-pin-soglie]')) pinSoglie(el);
    else if (el.matches('[data-split]')) split(el);
    else if (el.matches('[data-reveal-img]')) revealImg(el);
    else if (el.matches('[data-draw]')) draw(el as unknown as SVGPathElement);
    else if (el.matches('[data-parallax]')) parallax(el);
    else if (el.matches('[data-reveal]')) reveal(el);
  }
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  await intro();
  gsap.fromTo('[data-hero]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09 });
  ScrollTrigger.refresh();
}

document.fonts.ready.then(avvia);
