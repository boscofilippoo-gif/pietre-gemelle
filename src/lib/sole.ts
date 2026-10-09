// Alba e tramonto (algoritmo NOAA semplificato, precisione di 1–2 minuti).
// Restituisce Date in UTC; il fuso si applica solo in visualizzazione.
const rad = Math.PI / 180;

export function sole(data: Date, lat: number, lng: number) {
  const giorno = Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate());
  const n = (giorno - Date.UTC(data.getUTCFullYear(), 0, 0)) / 86400000; // giorno dell'anno
  const g = (2 * Math.PI / 365) * (n - 1);
  const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const zenit = 90.833 * rad;
  const ha = Math.acos(Math.cos(zenit) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl)) / rad;
  const alba = 720 - 4 * (lng + ha) - eqTime; // minuti UTC
  const tramonto = 720 - 4 * (lng - ha) - eqTime;
  return { alba: new Date(giorno + alba * 60000), tramonto: new Date(giorno + tramonto * 60000) };
}
