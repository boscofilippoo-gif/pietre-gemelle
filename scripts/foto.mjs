// Seleziona, rinomina e corregge le foto con un'unica correzione colore uniforme.
// Originali intoccati in _materiali/. Output in src/assets/foto/.
// Uso: node scripts/foto.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITO = '_materiali/foto-originali-sito/';
const WM = '_materiali/wikimedia/';
const OUT = 'src/assets/foto/';

// [sorgente, destinazione, tipo] — tipo: 'foto' (correzione), 'piantina' (solo ritaglio)
const map = [
  // Esterni del resort
  [SITO + '202401_imgplace_5451872.jpg', 'esterni/notte-neve-baite.jpg'],
  [SITO + '202401_pg2_5451878.jpg', 'esterni/estate-baite-monte-rosa.jpg'],
  [SITO + '202401_pg3_5451879.jpg', 'esterni/inverno-baite-monte-rosa.jpg'],
  [SITO + '202401_pgestate_5451873.jpg', 'esterni/estate-baita-prato.jpg'],
  [SITO + '202401_pietre_gemelle_21.jpg', 'esterni/inverno-baite-cielo.jpg'],
  [SITO + '202401_pietre_gemelle_01.jpg', 'esterni/notte-reception-masso.jpg'],
  [SITO + '202401_pietre_gemelle_07.jpg', 'esterni/tetti-innevati.jpg'],
  [SITO + '202401_1433955234webcams.jpg', 'esterni/estate-valle-largo.jpg'],
  [SITO + '202402_1433776420complessoturistico.jpg', 'esterni/complesso-largo.jpg'],
  [SITO + '202401_monte_rosa_1.jpg', 'esterni/monte-rosa-dal-resort.jpg'],
  // SPA
  [SITO + '202402_POL4027copia_5531908.jpg', 'spa/sauna-listelli.jpg'],
  [SITO + '202402_POL4018copia_5531907.jpg', 'spa/conca-pietra.jpg'],
  [SITO + '202402_POL4009highcopia_5531906.jpg', 'spa/corridoio-luce.jpg'],
  [SITO + '202402_POL4003copia_5531905.jpg', 'spa/relax-tisaneria.jpg'],
  [SITO + '202402_POL4000copia_5531904.jpg', 'spa/relax-sdraio.jpg'],
  [SITO + '202402_POL4046copia_5531909.jpg', 'spa/teli-cesto.jpg'],
  [SITO + '202402_POL4051copia_5531910.jpg', 'spa/soglia-bianca.jpg'],
  [SITO + '202402_pietregemellespa11_5531901.jpg', 'spa/percorso-idromassaggio.jpg'],
  [SITO + '202402_pietregemellespa07_5531900.jpg', 'spa/percorso-sauna.jpg'],
  [SITO + '202402_pietregemellespa06_5531899.jpg', 'spa/verticale-1.jpg'],
  [SITO + '202402_pietregemellespa12_5531902.jpg', 'spa/verticale-2.jpg'],
  // Interni generici
  [SITO + '202401_pg4_5451880.jpg', 'interni/soggiorno-travi.jpg'],
  [SITO + '202401_pg5_5451881.jpg', 'interni/tavola-colazione.jpg'],
  [SITO + '202401_pg6_5451882.jpg', 'interni/camera-finestra.jpg'],
  [SITO + '202401_pg01121202_5461883.jpg', 'interni/tavola-vista.jpg'],
  [SITO + '202401_pg01121223_5461887.jpg', 'interni/camera-verticale.jpg'],
  // Appartamenti
  [SITO + '202402_Balmenhorn1_5881911.jpg', 'appartamenti/balmenhorn-1.jpg'],
  [SITO + '202402_Balmenhorn2_5881912.jpg', 'appartamenti/balmenhorn-2.jpg'],
  [SITO + '202402_Balmenhorn3_5881913.jpg', 'appartamenti/balmenhorn-3.jpg'],
  [SITO + '202402_Breithorn1_5901921.jpg', 'appartamenti/breithorn-1.jpg'],
  [SITO + '202402_Breithorn2_5901922.jpg', 'appartamenti/breithorn-2.jpg'],
  [SITO + '202402_Breithorn3_5901923.jpg', 'appartamenti/breithorn-3.jpg'],
  [SITO + '202402_thb_1434085761Castore1.jpg', 'appartamenti/castore-1.jpg'],
  [SITO + '202402_Castore2_5911928.jpg', 'appartamenti/castore-2.jpg'],
  [SITO + '202402_Castore3_5911929.jpg', 'appartamenti/castore-3.jpg'],
  [SITO + '202402_CornoNero2_5931932.jpg', 'appartamenti/corno-nero-1.jpg'],
  [SITO + '202402_CornoNero3_5931933.jpg', 'appartamenti/corno-nero-2.jpg'],
  [SITO + '202402_CornoNero1_5931931.jpg', 'appartamenti/corno-nero-3.jpg'],
  [SITO + '202402_Ludwigshohe2_5941937.jpg', 'appartamenti/ludwigshohe-1.jpg'],
  [SITO + '202402_Ludwigshohe1_5941936.jpg', 'appartamenti/ludwigshohe-2.jpg'],
  [SITO + '202402_Ludwigshohe3_5941938.jpg', 'appartamenti/ludwigshohe-3.jpg'],
  [SITO + '202402_thb_1434086938LyskammOccidentale1.jpg', 'appartamenti/lyskamm-occidentale-1.jpg'],
  [SITO + '202402_LyskammOccidentale2_5951942.jpg', 'appartamenti/lyskamm-occidentale-2.jpg'],
  [SITO + '202402_LyskammOccidentale3_5951943.jpg', 'appartamenti/lyskamm-occidentale-3.jpg'],
  [SITO + '202402_piramidevincent1_5971950.jpg', 'appartamenti/piramide-vincent-1.jpg'],
  [SITO + '202402_piramidevincent2_5971951.jpg', 'appartamenti/piramide-vincent-2.jpg'],
  [SITO + '202402_piramidevincent3_5971952.jpg', 'appartamenti/piramide-vincent-3.jpg'],
  [SITO + '202402_polluce1_5981954.jpg', 'appartamenti/polluce-1.jpg'],
  [SITO + '202402_polluce2_5981955.jpg', 'appartamenti/polluce-2.jpg'],
  [SITO + '202402_polluce3_5981956.jpg', 'appartamenti/polluce-3.jpg'],
  [SITO + '202402_Dufour1_5991958.jpg', 'appartamenti/punta-dufour-1.jpg'],
  [SITO + '202402_Dufour2_5991959.jpg', 'appartamenti/punta-dufour-2.jpg'],
  [SITO + '202402_Dufour3_5991960.jpg', 'appartamenti/punta-dufour-3.jpg'],
  [SITO + '202402_PuntaGiordani1_6001963-1.jpg', 'appartamenti/punta-giordani-1.jpg'],
  [SITO + '202402_PuntaGiordani2_6001964.jpg', 'appartamenti/punta-giordani-2.jpg'],
  [SITO + '202402_gnifetti1_6011972.jpg', 'appartamenti/punta-gnifetti-1.jpg'],
  [SITO + '202402_gnifetti2_6011967.jpg', 'appartamenti/punta-gnifetti-2.jpg'],
  [SITO + '202402_gnifetti3_6011968.jpg', 'appartamenti/punta-gnifetti-3.jpg'],
  [SITO + '202402_ptnor0151_6021978-1.jpg', 'appartamenti/punta-nordend-1.jpg'],
  [SITO + '202402_ptnor0201_6021974.jpg', 'appartamenti/punta-nordend-2.jpg'],
  [SITO + '202402_ptnor0441_6021975.jpg', 'appartamenti/punta-nordend-3.jpg'],
  [SITO + '202402_Parrot1_6031979.jpg', 'appartamenti/punta-parrot-1.jpg'],
  [SITO + '202402_Parrot2_6031980-1.jpg', 'appartamenti/punta-parrot-2.jpg'],
  [SITO + '202402_Parrot3_6031981.jpg', 'appartamenti/punta-parrot-3.jpg'],
  [SITO + '202402_Zumstein1_6041983.jpg', 'appartamenti/punta-zumstein-1.jpg'],
  [SITO + '202402_Zumstein2_6041984.jpg', 'appartamenti/punta-zumstein-2.jpg'],
  [SITO + '202402_RocciaNera1_6051986.jpg', 'appartamenti/roccia-nera-1.jpg'],
  [SITO + '202402_RocciaNera2_6051987.jpg', 'appartamenti/roccia-nera-2.jpg'],
  [SITO + '202402_RocciaNera3_6051988.jpg', 'appartamenti/roccia-nera-3.jpg'],
  // Piantine
  ...[
    ['202402_piantinabalmenhorn_5881915.jpg', 'balmenhorn'],
    ['202402_Breithorn_5901925.jpg', 'breithorn'],
    ['202402_castore_5911926.jpg', 'castore'],
    ['202402_Cornonero_5931935.jpg', 'corno-nero'],
    ['202402_Ludwigshohe_5941940.jpg', 'ludwigshohe'],
    ['202402_Lyskammorientale_5951945.jpg', 'lyskamm-orientale'],
    ['202402_piramidevincent_5971953.jpg', 'piramide-vincent'],
    ['202402_polluce_5981957.jpg', 'polluce'],
    ['202402_puntaDufour_5991962.jpg', 'punta-dufour'],
    ['202402_puntagiordani_6001965.jpg', 'punta-giordani'],
    ['202402_puntaGnifetti_6011970.jpg', 'punta-gnifetti'],
    ['202402_puntanordend_6021976.jpg', 'punta-nordend'],
    ['202402_puntaparrot_6031982.jpg', 'punta-parrot'],
    ['202402_puntazumstein_6041985.jpg', 'punta-zumstein'],
    ['202402_RocciaNera_6051990.jpg', 'roccia-nera'],
  ].map(([s, d]) => [SITO + s, `piantine/${d}.png`, 'piantina']),
  // Territorio (Wikimedia Commons — crediti in src/data/crediti.ts)
  [WM + 'monte-rosa-valsesia-alba.jpg', 'territorio/monte-rosa-alba.jpg'],
  [WM + 'alagna-valsesia-monte-rosa.jpg', 'territorio/alagna-monte-rosa-sera.jpg'],
  [WM + 'alagna-valsesia-monte-rosa-via-dei-walser.jpg', 'territorio/alagna-via-dei-walser.jpg'],
  [WM + 'alagna-valsesia-walser-buildings-xvi-xvii-century.jpg', 'territorio/alagna-case-walser-notte.jpg'],
  [WM + 'riva-valdobbia-and-monte-rosa-under-snow.jpg', 'territorio/riva-valdobbia-neve.jpg'],
  [WM + 'riva-valdobbia-chiesa-di-san-michele-02.jpg', 'territorio/riva-san-michele.jpg'],
  [WM + 'riva-valdobbia-plains-vogna-valley.jpg', 'territorio/riva-valdobbia-estate.jpg'],
  [WM + 'riva-valdobbia-dalla-sinistra-del-fiume-sesia.jpg', 'territorio/riva-valdobbia-incisione.jpg', 'storica'],
];

// Correzione uniforme: bilanciamento del bianco parziale (gray-world al 35%,
// limitato), leggera riduzione della saturazione, curva di contrasto morbida.
async function correggi(src) {
  const img = sharp(src).rotate();
  const { channels } = await img.clone().stats();
  const [r, g, b] = channels.map((c) => c.mean);
  const grigio = (r + g + b) / 3;
  const k = (m) => Math.min(1.12, Math.max(0.9, 1 + ((grigio / m) - 1) * 0.35));
  return img
    .recomb([
      [k(r), 0, 0],
      [0, k(g), 0],
      [0, 0, k(b)],
    ])
    .modulate({ saturation: 0.9 })
    .linear(1.04, -4);
}

let n = 0;
for (const [src, dest, tipo = 'foto'] of map) {
  const out = path.join(OUT, dest);
  await mkdir(path.dirname(out), { recursive: true });
  if (tipo === 'piantina') {
    // Ritaglia il fondo grigio vuoto, tiene la piantina
    await sharp(src).trim({ threshold: 12 }).png().toFile(out);
  } else if (tipo === 'storica') {
    await sharp(src).grayscale().jpeg({ quality: 90, mozjpeg: true }).toFile(out);
  } else {
    const p = await correggi(src);
    await p.jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  }
  n++;
}
await writeFile(path.join(OUT, 'LEGGIMI.txt'),
  'Foto generate da scripts/foto.mjs: non modificare a mano.\nOriginali in _materiali/foto-originali-sito e _materiali/wikimedia.\n');
console.log(`${n} immagini elaborate in ${OUT}`);
