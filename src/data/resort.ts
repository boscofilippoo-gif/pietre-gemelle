// Tutti i dati della struttura in un unico posto. Le pagine leggono solo da qui.
//
// Convenzione: i campi marcati `verificato: false` (o elencati in `daVerificare`)
// vengono mostrati nel sito con il componente <V>, che li sottolinea in modo
// discreto finché il cliente non li conferma. Fonti: _materiali/analisi/.

export const resort = {
  nome: 'Pietre Gemelle Resort',
  dominio: 'https://www.pietregemelle.it',
  tipo: '16 appartamenti in 4 baite, con SPA',
  posti: 'oltre 70 posti letto',
  telefono: '+39 0163 917006',
  telefonoVisibile: '0163 917006',
  // ⚠️ Conflitto: il sito usa info@pietregemelle.com, il booking engine mail@pietregemelle.it
  email: 'info@pietregemelle.com',
  indirizzo: {
    via: 'Località Pietre Gemelle',
    frazione: 'Riva Valdobbia',
    cap: '13021', // ⚠️ 13020 su pagina contatti e Booking
    comune: 'Alagna Valsesia',
    provincia: 'VC',
    paese: 'IT',
  },
  geo: { lat: 45.837186, lng: 7.948544 },
  mappa: 'https://www.google.com/maps/place/Pietre+Gemelle+Resort/@45.837186,7.948544,17z',
  social: {
    instagram: 'https://www.instagram.com/pietregemelle/',
    facebook: 'https://www.facebook.com/pietregemelle',
  },
  legale: {
    ragioneSociale: 'MGM Hotels Srl',
    sede: 'Via Augusto Righi 10, 47924 Rimini (RN)',
    piva: '04199390404',
    cir: '002114-CIM-00001',
    cin: 'IT002002B4GMGXGTIA',
  },
  gruppo: [
    { nome: 'Hotel Nord Est', citta: 'Rimini', url: 'https://www.hotelnordest.it/' },
    { nome: 'Hotel Golden', citta: 'Rimini', url: 'https://www.hotelgoldenrimini.com/' },
    { nome: 'Hotel Stella Polare', citta: 'Rimini', url: 'https://www.hotelstellapolare.it/' },
    { nome: 'Hotel Re di Roma', citta: 'Rimini', url: 'https://www.hotelrediroma.com/' },
  ],
  // Apertura stagionale: dal popup del vecchio sito (ottobre 2026)
  chiusura: { dal: '2026-10-01', al: '2026-12-03', riapertura: '2026-12-04' },
  orari: {
    checkIn: '15:00–19:30',
    checkOut: '08:00–10:00',
    silenzio: '23:00–09:00',
  },
  tassaSoggiorno: '3 € a persona al giorno', // fonte: booking engine
} as const;

// Booking engine 5stelle* (secure-reservation.cloud). Il sito costruisce il link
// con le date scelte. ⚠️ Il formato del parametro `rooms` (A = adulto) è dedotto
// dal vecchio link: da confermare con il fornitore, soprattutto per i bambini.
export const bookingEngine = {
  base: 'https://www.secure-reservation.cloud/booking-engine/',
  portal: 'pietregemelle-rivavaldobbia',
};

export function linkPrenotazione(arrivo?: string, partenza?: string, adulti = 2) {
  const p = new URLSearchParams({ portal: bookingEngine.portal, lang: 'it' });
  if (arrivo && partenza) {
    p.set('fromDate', arrivo);
    p.set('toDate', partenza);
    p.set('rooms', Array(Math.max(1, adulti)).fill('A').join(','));
  }
  return `${bookingEngine.base}?${p.toString()}`;
}

export const integrazioni = {
  // ⚠️ Due proprietà GA4 sul vecchio sito (G-64JNJ2M2M4, G-6932XNRB35): scegliere quale tenere.
  // Non viene caricato nulla finché non c'è un banner di consenso.
  ga4: null as string | null,
  // Modulo contatti: nessun servizio collegato. Il modulo mostra "grazie" ma NON invia.
  formEndpoint: null as string | null,
  // Webcam: la fonte del vecchio sito non funziona più.
  webcam: null as string | null,
};

export const recensioni = {
  aggiornate: '8 ottobre 2026',
  punteggi: [
    { fonte: 'Booking.com', voto: '9,3', su: '10', numero: '1.311 recensioni', url: 'https://www.booking.com/hotel/it/pietre-gemelle-resort.it.html' },
    { fonte: 'Google', voto: '4,7', su: '5', numero: '444 recensioni', url: 'https://www.google.com/maps/place/Pietre+Gemelle+Resort/@45.837186,7.948544,17z' },
    { fonte: 'Tripadvisor', voto: '4,5', su: '5', numero: '189 recensioni', url: 'https://www.tripadvisor.it/' },
  ],
  dettaglio: [
    { voce: 'Staff', voto: '9,6' },
    { voce: 'Pulizia', voto: '9,5' },
    { voce: 'Comfort', voto: '9,5' },
    { voce: 'Posizione', voto: '9,4' },
  ],
  citazioni: [
    { testo: 'Le mucche fuori e l’asinello, il paesaggio, la pace.', autore: 'Marco', fonte: 'Booking.com' },
    { testo: 'Vista incredibile sul Monte Rosa!', autore: 'Flavio', fonte: 'Booking.com' },
  ],
  temi: [
    'la vista sul Monte Rosa dalla camera',
    'il silenzio e il verde',
    'lo staff, gentile e presente',
    'la pulizia',
    'la SPA, piccola e curata',
    'il cane benvenuto',
    'il parcheggio comodo',
  ],
};

// ————————————————————————————————————————————————————————————————
// LE DUE PIETRE
// ————————————————————————————————————————————————————————————————
export const pietre = {
  nomi: [
    { lingua: 'latino', nome: 'Petrae Gemellae' },
    { lingua: 'walser', nome: 'Pressmell' },
    { lingua: 'italiano', nome: 'Pietre Gemelle' },
  ],
  // ⚠️ Fonte: solo il vecchio sito. Da confermare prima della pubblicazione.
  documento: {
    anno: '1217',
    citazione: 'Guidetus filius Johannis de Petris Zumellis',
    fonte: 'Codice Biscioni, Archivio Civico di Vercelli',
    verificato: false,
  },
  divisione: '1475', // separazione tra Alagna e Riva (vecchio sito; alagna.it conferma la comunità unica)
};

// ————————————————————————————————————————————————————————————————
// LE QUATTRO BAITE E I SEDICI APPARTAMENTI
// ————————————————————————————————————————————————————————————————
export const baite = ['Alagna', 'Champoluc', 'Gressoney', 'Zermatt'] as const;

export type Tipo = 'monolocale' | 'bilocale' | 'superior' | 'suite';

export const tipi: Record<Tipo, { nome: string; descrizione: string }> = {
  monolocale: { nome: 'Monolocale', descrizione: 'Un unico ambiente per due' },
  bilocale: { nome: 'Bilocale', descrizione: 'Soggiorno e camera, al piano terra' },
  superior: { nome: 'Bilocale Superior', descrizione: 'Su due piani, con balcone in larice' },
  suite: { nome: 'Suite', descrizione: 'Sotto il tetto, con la balconata walser' },
};

export type Appartamento = {
  slug: string;
  nome: string;
  quota: number; // metri, da it.wikipedia.org/wiki/Monte_Rosa
  tipo: Tipo;
  ospiti: string;
  ospitiMax: number;
  baita?: (typeof baite)[number];
  piano: string;
  frase: string; // una riga, nel nuovo tono
  stanze: { nome: string; testo: string }[];
  dettagli: string[];
  foto: string[]; // chiavi in src/assets/foto/appartamenti/
  piantina?: string;
  vetta: string; // una riga sulla montagna vera
  note?: string; // note interne per la verifica
};

const cucinaBase = 'Due piastre elettriche, microonde, stoviglie, pentole e utensili.';

export const appartamenti: Appartamento[] = [
  {
    slug: 'breithorn', nome: 'Breithorn', quota: 4165, tipo: 'bilocale', ospiti: '4', ospitiMax: 4,
    baita: 'Champoluc', piano: 'Piano terra',
    frase: 'Il soggiorno guarda Riva Valdobbia, la camera guarda il Rosa.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Pavimento in legno e finestre a tutta altezza verso il paese. Divano letto matrimoniale.' },
      { nome: 'Cucina', testo: `In luserna, tra soggiorno e camera, separabile con porte scorrevoli in legno. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Letto matrimoniale, scrivania, e la vista sul Monte Rosa.' },
      { nome: 'Bagno', testo: 'Pavimento e doccia in luserna, antibagno con cassettiere.' },
    ],
    dettagli: ['TV satellitare', 'Punto internet in camera', 'Tende oscuranti'],
    foto: ['breithorn-1', 'breithorn-2', 'breithorn-3'], piantina: 'breithorn',
    vetta: 'Tra il Cervino e il Monte Rosa, sopra Zermatt e Cervinia.',
  },
  {
    slug: 'roccia-nera', nome: 'Roccia Nera', quota: 4075, tipo: 'superior', ospiti: '4 + 1', ospitiMax: 5,
    baita: 'Zermatt', piano: 'Primo e secondo piano',
    frase: 'Si dorme nel sottotetto, davanti all’intera catena del Rosa.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Larice e vetrate a tutta altezza. Divano letto matrimoniale e un pouf che di notte diventa un letto per i più piccoli. Esce sulla balconata a sud, costruita a incastri.' },
      { nome: 'Cucina', testo: `Accanto al soggiorno, con le finestre sul Monte Rosa. ${cucinaBase}` },
      { nome: 'Camera', testo: 'In mansarda, raggiunta da una scala in legno. Vetrate oscurabili e il panorama di tutta la catena.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Balcone privato a sud', 'Scala interna in legno', 'TV satellitare', 'Punto internet in camera'],
    foto: ['roccia-nera-1', 'roccia-nera-2', 'roccia-nera-3'], piantina: 'roccia-nera',
    vetta: 'Uno sperone scuro sulla cresta tra Breithorn e Polluce.',
  },
  {
    slug: 'polluce', nome: 'Polluce', quota: 4091, tipo: 'bilocale', ospiti: '4', ospitiMax: 4,
    piano: 'Piano terra',
    frase: 'Si entra dal prato. Anche dal bagno si vede il Rosa.',
    stanze: [
      { nome: 'Soggiorno e cucina', testo: `Un ambiente ampio con la porta-finestra sul prato. Divano letto matrimoniale. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Pavimento in larice, letto matrimoniale e vista sul Monte Rosa.' },
      { nome: 'Bagno', testo: 'Una piccola finestra sopra il lavabo, sul Monte Rosa. Luserna e doccia.' },
    ],
    dettagli: ['Accesso diretto dal prato', 'TV satellitare', 'Punto internet'],
    foto: ['polluce-1', 'polluce-2', 'polluce-3'], piantina: 'polluce',
    vetta: 'Il gemello minore di Castore: anche lassù, due cime che si guardano.',
  },
  {
    slug: 'castore', nome: 'Castore', quota: 4221, tipo: 'superior', ospiti: '4 + 1', ospitiMax: 5,
    piano: 'Primo e secondo piano',
    frase: 'Una scala di legno, una camera romantica, il Rosa nella vetrata.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Larice e vetrate. Divano letto matrimoniale, pouf-letto per i bambini, e il balcone in larice a incastri verso Riva.' },
      { nome: 'Cucina', testo: `In luserna, illuminata da finestre a tutta altezza sul Monte Rosa. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Al piano di sopra, con le vetrate sul Rosa e tende che fanno il buio vero.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Balcone privato', 'Scala interna in legno', 'TV satellitare', 'Punto internet in camera'],
    foto: ['castore-1', 'castore-2', 'castore-3'], piantina: 'castore',
    vetta: 'Il gemello maggiore: Castore e Polluce, come le nostre due pietre.',
  },
  {
    slug: 'lyskamm-occidentale', nome: 'Lyskamm Occidentale', quota: 4481, tipo: 'superior', ospiti: '4 + 1', ospitiMax: 5,
    baita: 'Zermatt', piano: 'Primo e secondo piano',
    frase: 'Sotto le travi del tetto c’è una piccola balconata segreta.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Larice, divano letto matrimoniale e pouf-letto. La balconata in legno esposta a sud porta molta luce.' },
      { nome: 'Cucina', testo: `Con grandi finestre verso il Monte Rosa. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Nel sottotetto, tra le grandi travi, con una piccola balconata incastrata tra colmo e sottotetto.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Balconata a sud', 'Balconcino in mansarda', 'Scala interna in legno', 'TV satellitare'],
    foto: ['lyskamm-occidentale-1', 'lyskamm-occidentale-2', 'lyskamm-occidentale-3'],
    vetta: 'La lunga cresta di neve del Lyskamm: questa è la cima ovest.',
    note: 'Sul vecchio sito la piantina di questa pagina si chiama “Lyskammorientale”: verificare.',
  },
  {
    slug: 'lyskamm-orientale', nome: 'Lyskamm Orientale', quota: 4527, tipo: 'bilocale', ospiti: '4', ospitiMax: 4,
    baita: 'Zermatt', piano: 'Piano terra',
    frase: 'La parete sud del Rosa riempie la finestra della camera.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Porte-finestra a sud, pavimento in legno, divano letto matrimoniale.' },
      { nome: 'Cucina', testo: `In luserna con le pareti color prugna, separabile con porte scorrevoli. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Letto matrimoniale (si può dividere in due singoli) e la parete sud del Monte Rosa davanti.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Letti separabili su richiesta', 'TV satellitare', 'Punto internet'],
    foto: [], piantina: 'lyskamm-orientale',
    vetta: 'La cima est del Lyskamm, la più alta delle due.',
    note: 'Sul vecchio sito questa pagina mostra le foto di Ludwigshöhe: servono foto proprie.',
  },
  {
    slug: 'punta-giordani', nome: 'Punta Giordani', quota: 4046, tipo: 'monolocale', ospiti: '2', ospitiMax: 2,
    baita: 'Alagna', piano: 'Piano terra',
    frase: 'Un solo ambiente, la luserna, e il Rosa davanti al lavabo.',
    stanze: [
      { nome: 'Giorno e notte', testo: `Pavimento in luserna e finestre a tutta altezza sul prato. Divano letto matrimoniale. ${cucinaBase}` },
      { nome: 'Bagno', testo: 'Una finestrella proprio davanti al lavabo, sul Monte Rosa.' },
    ],
    dettagli: ['TV satellitare', 'Punto internet'],
    foto: ['punta-giordani-1', 'punta-giordani-2'], piantina: 'punta-giordani',
    vetta: 'Sullo sperone del Rosa che scende verso la Valsesia.',
  },
  {
    slug: 'piramide-vincent', nome: 'Piramide Vincent', quota: 4215, tipo: 'bilocale', ospiti: '4', ospitiMax: 4,
    piano: 'Piano terra',
    frase: 'Dalla camera e dal bagno, la stessa vista: il Monte Rosa.',
    stanze: [
      { nome: 'Soggiorno e cucina', testo: `Finestre a tutta altezza verso Riva, divano letto matrimoniale. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Larice e grandi finestre verso Alagna e il Monte Rosa.' },
      { nome: 'Bagno', testo: 'Una piccola finestra sul Rosa, sanitari di design e luserna.' },
    ],
    dettagli: ['TV satellitare', 'Punto internet'],
    foto: ['piramide-vincent-1', 'piramide-vincent-2', 'piramide-vincent-3'], piantina: 'piramide-vincent',
    vetta: 'Salita per la prima volta nel 1819 da due alpinisti di Gressoney, i Vincent.',
  },
  {
    slug: 'balmenhorn', nome: 'Balmenhorn', quota: 4167, tipo: 'bilocale', ospiti: '4', ospitiMax: 4,
    baita: 'Champoluc', piano: 'Piano terra',
    frase: 'Ci si sveglia con il Rosa nella porta-finestra.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Larice e vetrate a tutta altezza, divano letto matrimoniale, tende completamente oscuranti.' },
      { nome: 'Cucina', testo: `In luserna, tra soggiorno e camera, con porte scorrevoli in legno. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Rivestita in legno, con la grande porta-finestra sul Monte Rosa e uno scrittoio.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Scrittoio', 'TV satellitare', 'Punto internet in camera'],
    foto: ['balmenhorn-1', 'balmenhorn-2', 'balmenhorn-3'], piantina: 'balmenhorn',
    vetta: 'Uno spuntone di roccia con in cima il Cristo delle Vette.',
  },
  {
    slug: 'corno-nero', nome: 'Corno Nero', quota: 4322, tipo: 'superior', ospiti: '4 + 1', ospitiMax: 5,
    piano: 'Primo e secondo piano',
    frase: 'Il soggiorno sul balcone, la camera sotto il tetto.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Larice e vetrate, divano letto matrimoniale e pouf-letto. Il balcone in larice a incastri guarda Riva.' },
      { nome: 'Cucina', testo: `In luserna, con finestre a tutta altezza sul Monte Rosa. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Al piano di sopra, con il panorama sul Rosa nelle vetrate.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Balcone privato', 'Scala interna in legno', 'TV satellitare'],
    foto: ['corno-nero-1', 'corno-nero-2', 'corno-nero-3'], piantina: 'corno-nero',
    vetta: 'Una piccola punta scura tra la Ludwigshöhe e il Balmenhorn.',
  },
  {
    slug: 'ludwigshohe', nome: 'Ludwigshöhe', quota: 4342, tipo: 'bilocale', ospiti: '4', ospitiMax: 4,
    baita: 'Zermatt', piano: 'Piano terra',
    frase: 'Soggiorno al sole di Riva, camera alla luce del Rosa.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Porte-finestra a sud, verso Riva Valdobbia. Divano letto matrimoniale.' },
      { nome: 'Cucina', testo: `In luserna, separabile con porte scorrevoli in legno. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Una grande porta-finestra sul Monte Rosa, tende coprenti, scrivania.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Scrivania', 'TV satellitare', 'Punto internet in camera'],
    foto: ['ludwigshohe-1', 'ludwigshohe-2', 'ludwigshohe-3'], piantina: 'ludwigshohe',
    vetta: 'Il topografo Ludwig von Welden la salì nel 1822 e le diede il nome.',
  },
  {
    slug: 'punta-parrot', nome: 'Punta Parrot', quota: 4436, tipo: 'bilocale', ospiti: '4 + 1', ospitiMax: 5,
    baita: 'Gressoney', piano: 'Piano terra',
    frase: 'Una panca ad angolo intorno al tavolo, per le cene lunghe.',
    stanze: [
      { nome: 'Soggiorno e cucina', testo: `Luserna e legno, finestre a tutta altezza, panca ad angolo. Divano letto e pouf-letto. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Rivestita in legno, con le vetrate verso Riva Valdobbia e una scrivania.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Panca ad angolo', 'Pouf-letto per bambini', 'TV satellitare'],
    foto: ['punta-parrot-1', 'punta-parrot-2', 'punta-parrot-3'], piantina: 'punta-parrot',
    vetta: 'Una cupola di neve sul confine con la Svizzera.',
    note: 'Il vecchio sito dice “4 posti letto” ma descrive anche il pouf-letto: confermare capienza.',
  },
  {
    slug: 'punta-gnifetti', nome: 'Punta Gnifetti', quota: 4559, tipo: 'suite', ospiti: '6', ospitiMax: 6,
    baita: 'Gressoney', piano: 'Primo piano',
    frase: 'Travi a vista, pietra tra le travi, la balconata a sud.',
    stanze: [
      { nome: 'Cucina e pranzo', testo: 'Soffitto spiovente, la pietra del tetto che si vede tra le travi, la balconata costruita secondo le tecniche walser. Lavastoviglie, bollitore e tostapane.' },
      { nome: 'Soggiorno', testo: 'Larice e vetrate a tutta altezza. Due divani letto matrimoniali.' },
      { nome: 'Camera', testo: 'Matrimoniale, si apre anche lei sulla balconata a sud.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, con una porta-finestra che esce sul balcone.' },
    ],
    dettagli: ['Balconata privata a sud', 'Lavastoviglie', 'Tetto a vista', 'TV satellitare'],
    foto: ['punta-gnifetti-2', 'punta-gnifetti-1', 'punta-gnifetti-3'], piantina: 'punta-gnifetti',
    vetta: 'Lassù c’è la Capanna Margherita, il rifugio più alto d’Europa.',
  },
  {
    slug: 'punta-zumstein', nome: 'Punta Zumstein', quota: 4563, tipo: 'monolocale', ospiti: '2 + 1', ospitiMax: 3,
    baita: 'Gressoney', piano: 'Piano terra',
    frase: 'Legno, luserna e il paese di Riva oltre la porta-finestra.',
    stanze: [
      { nome: 'Giorno e notte', testo: `Un unico ambiente con porte-finestra su Riva Valdobbia. Divano letto matrimoniale e pouf-letto. ${cucinaBase}` },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Pouf-letto per bambini', 'TV satellitare', 'Punto internet'],
    foto: ['punta-zumstein-1', 'punta-zumstein-2'], piantina: 'punta-zumstein',
    vetta: 'Porta il nome di Joseph Zumstein, che la salì nel 1820.',
  },
  {
    slug: 'punta-dufour', nome: 'Punta Dufour', quota: 4634, tipo: 'suite', ospiti: '6', ospitiMax: 6,
    baita: 'Gressoney', piano: 'Secondo piano',
    frase: 'La più alta delle vette, il più alto dei nostri appartamenti.',
    stanze: [
      { nome: 'Soggiorno', testo: 'Larice, vetrate, due divani letto matrimoniali, e la balconata in larice a incastri.' },
      { nome: 'Cucina e pranzo', testo: 'Sotto il tetto spiovente, tra travi e pietra, con il tavolo al centro e la vista su Riva. Lavastoviglie, bollitore e tostapane.' },
      { nome: 'Camera', testo: 'Matrimoniale, con il soffitto in legno e la porta-finestra sulla balconata.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, con una porta-finestra sul balcone.' },
    ],
    dettagli: ['Mansarda', 'Balconata privata', 'Lavastoviglie', 'TV satellitare'],
    foto: ['punta-dufour-1', 'punta-dufour-2', 'punta-dufour-3'], piantina: 'punta-dufour',
    vetta: 'Il tetto della Svizzera e la vetta più alta di tutto il Monte Rosa.',
  },
  {
    slug: 'punta-nordend', nome: 'Punta Nordend', quota: 4609, tipo: 'bilocale', ospiti: '4 + 1', ospitiMax: 5,
    baita: 'Gressoney', piano: 'Piano terra',
    frase: 'La camera si apre sul prato. Al tavolo c’è posto per tutti.',
    stanze: [
      { nome: 'Soggiorno e cucina', testo: `Luserna e legno, panca ad angolo intorno al tavolo, divano letto e pouf-letto. ${cucinaBase}` },
      { nome: 'Camera', testo: 'Rivestita in legno, con la porta-finestra a tutta altezza sul prato e uno scrittoio.' },
      { nome: 'Bagno', testo: 'Luserna e doccia, antibagno con cassettiere.' },
    ],
    dettagli: ['Accesso sul prato', 'Panca ad angolo', 'Pouf-letto per bambini'],
    foto: ['punta-nordend-1', 'punta-nordend-2', 'punta-nordend-3'], piantina: 'punta-nordend',
    vetta: 'La vetta più a nord del massiccio, sul confine con la Svizzera.',
    note: 'Il vecchio sito dice “4 posti letto” ma descrive anche il pouf-letto: confermare capienza.',
  },
];

// ————————————————————————————————————————————————————————————————
// SPA
// ————————————————————————————————————————————————————————————————
export const spa = {
  servizi: ['Minipiscina idromassaggio', 'Sauna', 'Bagno turco', 'Docce emozionali', 'Area relax e tisaneria', 'Massaggi su prenotazione'],
  // ⚠️ Conflitti: 1 h 30 (vecchio sito) contro "massimo 3 ore" (Booking); bagno turco e gommage non sempre elencati
  prezzo: '15 € a persona',
  durata: '1 ora e 30 minuti',
  fasce: '16:00–19:30, su prenotazione',
  regole: [
    'Solo per gli ospiti del resort, su prenotazione.',
    'Non è consentito l’ingresso ai minori di 14 anni.',
    'Sconsigliata in caso di disturbi cardiaci o circolatori, febbre, gravidanza: chiedete al vostro medico.',
  ],
  massaggi: 'Su prenotazione. Giorni e orari variano con la stagione: chiedete in reception.',
  // ⚠️ Fonte: solo il vecchio sito. Da confermare.
  premio: {
    testo: 'Menzione speciale al concorso “La Ceramica e il Progetto” 2014, Confindustria Ceramica.',
    progetto: 'Architetti Claudia Colla, Davide Gavinelli e Corrado Gavinelli',
    giuria: '“Una vera e propria sequenza di aperture”',
    verificato: false,
  },
};

// ————————————————————————————————————————————————————————————————
// LA GIORNATA (servizi raccontati come momenti)
// ————————————————————————————————————————————————————————————————
// `da` / `a` sono ore locali (19.5 = 19:30); 'alba' viene calcolata per Riva Valdobbia.
export const giornata = [
  { id: 'alba', titolo: 'Alba', adesso: 'il Rosa si accende', da: 'alba', a: 9, testo: 'La parete del Rosa si accende di rosa. Si vede dal letto.', foto: 'territorio/monte-rosa-alba' },
  { id: 'mattina', titolo: 'Mattina', adesso: 'è mattina', da: 9, a: 13, testo: 'Lo skibus si ferma qui davanti. D’estate, il sentiero lungo il Sesia porta ad Alagna.', foto: 'esterni/inverno-baite-monte-rosa' },
  { id: 'pomeriggio', titolo: 'Pomeriggio', adesso: 'è pomeriggio', da: 13, a: 16, testo: 'Il prato, i giochi dei bambini, il cane che corre. Nessuno ha fretta.', foto: 'esterni/estate-baite-monte-rosa' },
  { id: 'spa', titolo: 'Dalle 16', adesso: 'è l’ora della SPA', da: 16, a: 19.5, testo: 'Si apre la SPA. Sauna, acqua calda, una tisana.', foto: 'spa/sauna-listelli' },
  { id: 'sera', titolo: 'Sera', adesso: 'è sera', da: 19.5, a: 23, testo: 'Cena nella propria cucina, o due passi fino in paese.', foto: 'interni/tavola-vista' },
  { id: 'notte', titolo: 'Notte', adesso: 'è notte', da: 23, a: 'alba', testo: 'Le baite accese sotto la neve. Silenzio fino alle nove.', foto: 'esterni/notte-neve-baite' },
] as const;

// ————————————————————————————————————————————————————————————————
// LA VALLE, STAGIONE PER STAGIONE
// ————————————————————————————————————————————————————————————————
export type Stagione = {
  slug: 'inverno' | 'primavera' | 'estate' | 'autunno';
  nome: string;
  frase: string;
  foto: string;
  attivita: { nome: string; testo: string; amici?: string[] }[];
};

export const stagioni: Stagione[] = [
  {
    slug: 'inverno', nome: 'Inverno', foto: 'territorio/alagna-monte-rosa-sera',
    frase: 'Gli impianti a due chilometri, la neve fino alla porta.',
    attivita: [
      { nome: 'Sci in pista', testo: 'Il Monterosa Ski parte da Alagna e collega Valsesia, Gressoney e Ayas. Gli impianti salgono fino a Punta Indren, oltre i 3000 metri.', amici: ['scuola-sci', 'sky-shuttle'] },
      { nome: 'Freeride', testo: 'Alagna è conosciuta come “Freeride Paradise”: fuoripista con le guide del paese.', amici: ['guide-alagna'] },
      { nome: 'Heliski', testo: 'Per chi vuole partire più in alto, con le guide alpine.', amici: ['guide-alagna'] },
      { nome: 'Sci alpinismo', testo: 'Salite con le pelli, da soli o accompagnati.', amici: ['guide-alagna'] },
      { nome: 'Sci di fondo', testo: 'Anelli di fondo in valle, a pochi minuti.' },
      { nome: 'Cascate di ghiaccio', testo: 'Arrampicata sul ghiaccio con le guide.', amici: ['guide-alagna'] },
      { nome: 'Ciaspole', testo: 'Passeggiate sulla neve fresca, anche per chi non scia.', amici: ['fuselli'] },
      { nome: 'Pattinaggio', testo: 'La pista di ghiaccio di Alagna, per una sera diversa.' },
    ],
  },
  {
    slug: 'primavera', nome: 'Primavera', foto: 'territorio/riva-valdobbia-estate',
    frase: 'Il Sesia si gonfia di neve sciolta. È la stagione dell’acqua.',
    attivita: [
      { nome: 'Rafting, canoa e kayak', testo: 'Il Sesia è uno dei fiumi più amati d’Europa per gli sport d’acqua.', amici: ['eddyline'] },
      { nome: 'Hydrospeed e torrentismo', testo: 'Dentro l’acqua e dentro le gole, con istruttori.', amici: ['eddyline'] },
      { nome: 'Sci alpinismo', testo: 'In quota la neve dura ancora a lungo.', amici: ['guide-alagna'] },
      { nome: 'Pesca', testo: 'Si riapre la stagione nei torrenti della valle (con licenza).' },
    ],
  },
  {
    slug: 'estate', nome: 'Estate', foto: 'esterni/estate-baite-monte-rosa',
    frase: 'Prati in fiore, sentieri walser, i ghiacciai sopra la testa.',
    attivita: [
      { nome: 'Escursioni', testo: 'Valle Vogna, Valle Otro, il Parco Naturale Alta Valsesia: sentieri per tutte le gambe. In reception ci sono le cartine.', amici: ['fuselli'] },
      { nome: 'Alpinismo', testo: 'Fino alla Capanna Margherita, sulla Punta Gnifetti, con le guide alpine.', amici: ['guide-alagna'] },
      { nome: 'Tour del Monte Rosa e GTA', testo: 'Due grandi traversate passano di qui.' },
      { nome: 'Mountain bike', testo: 'Sentieri e discese, con o senza guida.', amici: ['guida-mtb'] },
      { nome: 'Arrampicata', testo: 'Falesie e pareti in valle.', amici: ['guide-alagna'] },
      { nome: 'Parapendio', testo: 'Il volo biposto sopra Alagna.', amici: ['free-fly'] },
      { nome: 'Equitazione', testo: 'Passeggiate a cavallo in alta valle.' },
      { nome: 'Pesca', testo: 'Torrenti e laghetti di montagna (con licenza).' },
    ],
  },
  {
    slug: 'autunno', nome: 'Autunno', foto: 'esterni/monte-rosa-dal-resort',
    frase: 'I larici diventano d’oro. La valle è tutta per voi.',
    attivita: [
      { nome: 'Escursioni nei colori', testo: 'Il momento migliore per camminare: aria ferma, boschi accesi, poca gente.', amici: ['fuselli'] },
      { nome: 'Funghi', testo: 'Si raccolgono con il permesso dell’Unione Montana Valsesia.' },
      { nome: 'Pesca', testo: 'Le ultime settimane della stagione.' },
    ],
  },
];

// Partner del vecchio sito ("Le attività che collaborano con noi").
// ⚠️ Elenco del 2024: da riconfermare con la struttura.
export const amici: Record<string, { nome: string; cosa: string; url?: string }> = {
  'guide-alagna': { nome: 'Corpo Guide Alagna', cosa: 'Guide alpine', url: 'http://www.guidealagna.com/' },
  'scuola-sci': { nome: 'Scuola Sci di Alagna', cosa: 'Lezioni di sci', url: 'https://scuolascialagna.it/' },
  'ski-academy': { nome: 'Ski Academy Alagna Monterosa', cosa: 'Scuola di sci', url: 'https://www.skiacademyalagnamonterosa.it/' },
  'sky-shuttle': { nome: 'Monterosa Sky Shuttle', cosa: 'Transfer', url: 'http://www.monterosaskyshuttle.it/' },
  eddyline: { nome: 'Eddyline', cosa: 'Canoa e sport fluviali', url: 'http://www.eddyline.it/' },
  'guida-mtb': { nome: 'Guida MTB', cosa: 'Mountain bike', url: 'http://www.guidamtb.com/' },
  'free-fly': { nome: 'Free Fly Paradise Monterosa', cosa: 'Parapendio' },
  fuselli: { nome: 'Marzia Fuselli', cosa: 'Guida naturalistica' },
  'alagna-outdoor': { nome: 'Alagna Outdoor', cosa: 'Articoli sportivi' },
  'autonoleggio': { nome: 'Autonoleggio Monterosa', cosa: 'Noleggio auto', url: 'http://www.autonoleggiomonterosa.it/' },
  alpenstop: { nome: 'Alpenstop', cosa: 'Bar ristorante a 2050 m, Alpe Pianalunga' },
  'montagna-di-luce': { nome: 'Montagna di Luce', cosa: 'Cucina tipica valsesiana' },
  'caffe-guide': { nome: 'Caffè delle Guide', cosa: 'Bar in paese' },
  tavernetta: { nome: 'La Tavernetta', cosa: 'Cocktail bar' },
  tabaccheria: { nome: 'Tabaccheria di Barbara Giordano', cosa: 'Tabacchi e giornali' },
};

// ————————————————————————————————————————————————————————————————
// OFFERTE — ⚠️ tutte da riconfermare per la stagione 2026/27
// ————————————————————————————————————————————————————————————————
export const offerte = [
  {
    titolo: 'Happy Ski Monterosa',
    sconto: '−30% sullo skipass',
    testo: 'Soggiornando almeno 3 notti nei periodi indicati da Monterosa Ski, si riceve un codice sconto del 30% sullo skipass. Prenotazione diretta con caparra.',
    nota: 'Periodi 2026/27 da confermare.',
  },
  {
    titolo: 'Il vostro compleanno',
    sconto: '−10% sul soggiorno',
    testo: 'Se il compleanno cade durante la vostra settimana da noi, diteci la data quando prenotate.',
    nota: 'Da confermare con la struttura.',
  },
  {
    titolo: 'Anniversario',
    sconto: '−5% sul soggiorno',
    testo: 'Un weekend di almeno due notti per festeggiare. Il massaggio, se volete, si prenota a parte.',
    nota: 'Da confermare con la struttura.',
  },
];

// ————————————————————————————————————————————————————————————————
// INFO PRATICHE
// ————————————————————————————————————————————————————————————————
export const info = [
  {
    titolo: 'Arrivo e partenza',
    righe: [
      `Check-in ${resort.orari.checkIn}. Fateci sapere l’orario di arrivo.`,
      `Check-out ${resort.orari.checkOut}.`,
      'Al check-in servono un documento con foto e una carta di credito.',
    ],
  },
  {
    titolo: 'Come arrivare',
    righe: [
      'Siamo sulla strada provinciale 299, tra Riva Valdobbia e Alagna, lungo il Sesia.',
      'Alagna è a circa 2,5 km, gli impianti a circa 2 km.',
      'Parcheggio privato gratuito.',
    ],
  },
  {
    titolo: 'Skibus e navetta',
    righe: [
      'D’inverno lo skibus pubblico gratuito (linea Rossa, Riva Valdobbia–Piazzale Funivia) ferma a Pietre Gemelle.',
      'Stagione 2025/26: dal 6 dicembre al 21 aprile. Informazioni: +39 0163 922988.',
    ],
    verifica: 'Il vecchio sito parla anche di una navetta privata gratuita del resort: da confermare.',
  },
  {
    titolo: 'Cani e animali',
    righe: ['Gli animali sono i benvenuti, su richiesta. Potrebbe essere previsto un supplemento.'],
  },
  {
    titolo: 'Bambini',
    righe: [
      'I bambini sono benvenuti. Culla gratuita su richiesta fino a 3 anni.',
      'Non sono disponibili letti aggiuntivi oltre a quelli dell’appartamento.',
      'La SPA è vietata ai minori di 14 anni.',
    ],
  },
  {
    titolo: 'Negli appartamenti',
    righe: [
      'Angolo cottura attrezzato, riscaldamento autonomo, lenzuola e asciugamani.',
      'TV satellitare, WiFi gratuito.',
      'Lavastoviglie nelle due suite.',
    ],
  },
  {
    titolo: 'In comune',
    righe: ['Giardino con giochi per i bambini e barbecue.', 'Deposito sci riscaldato.', 'Reception con personale di accoglienza.'],
  },
  {
    titolo: 'Tassa di soggiorno',
    righe: [`${resort.tassaSoggiorno}, non inclusa nel prezzo.`],
  },
  {
    titolo: 'Silenzio e regole',
    righe: [`Silenzio dalle ${resort.orari.silenzio.replace('–', ' alle ')}.`, 'Non si fuma negli appartamenti. Non sono ammesse feste ed eventi.'],
  },
];

export const crediti = [
  { file: 'territorio/monte-rosa-alba', titolo: 'Monte Rosa Valsesia alba', autore: 'Maxinmilan', licenza: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Monte_Rosa_Valsesia_alba.JPG' },
  { file: 'territorio/alagna-monte-rosa-sera', titolo: 'Alagna Valsesia, Monte Rosa', autore: 'Massimo Beltrame', licenza: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Alagna_Valsesia,_Monte_Rosa.jpg' },
  { file: 'territorio/alagna-via-dei-walser', titolo: 'Alagna Valsesia, Monte Rosa, Via dei Walser', autore: 'Massimo Beltrame', licenza: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Alagna_Valsesia,_Monte_Rosa,_Via_dei_Walser.jpg' },
  { file: 'territorio/alagna-case-walser-notte', titolo: 'Alagna Valsesia Walser buildings XVI-XVII century', autore: 'Massimo Beltrame', licenza: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Alagna_Valsesia_Walser_buildings_XVI-XVII_century.JPG' },
  { file: 'territorio/riva-valdobbia-neve', titolo: 'Riva Valdobbia and Monte Rosa under snow', autore: 'Fabiorivavaldobbia', licenza: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Riva_Valdobbia_and_Monte_Rosa_under_snow.jpg' },
  { file: 'territorio/riva-valdobbia-estate', titolo: 'Riva Valdobbia Plains-Vogna Valley', autore: 'Fabiorivavaldobbia', licenza: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Riva_Valdobbia_Plains-Vogna_Valley.jpg' },
  { file: 'territorio/riva-san-michele', titolo: 'Riva Valdobbia Chiesa di San Michele', autore: 'Francoerbi', licenza: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Riva_Valdobbia_Chiesa_di_San_Michele_02.jpg' },
  { file: 'territorio/riva-valdobbia-incisione', titolo: 'Riva Valdobbia, dalla sinistra del fiume Sesia', autore: 'Francesco Canedi', licenza: 'Pubblico dominio', url: 'https://commons.wikimedia.org/wiki/File:Riva_Valdobbia,_dalla_sinistra_del_fiume_Sesia.jpg' },
];

export const nav = [
  { href: '/il-resort/', label: 'Il resort' },
  { href: '/appartamenti/', label: 'Appartamenti' },
  { href: '/spa/', label: 'SPA' },
  { href: '/la-valle/', label: 'La valle' },
  { href: '/info-pratiche/', label: 'Info' },
  { href: '/contatti/', label: 'Contatti' },
];
