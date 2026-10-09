import type { ImageMetadata } from 'astro';

// Tutte le foto elaborate da scripts/foto.mjs, indicizzate per "cartella/nome" senza estensione.
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/foto/**/*.{jpg,png}', { eager: true });

const byKey = new Map<string, ImageMetadata>();
for (const [p, mod] of Object.entries(files)) {
  const key = p.replace('/src/assets/foto/', '').replace(/\.(jpg|png)$/, '');
  byKey.set(key, mod.default);
}

export function foto(key: string): ImageMetadata {
  const img = byKey.get(key);
  if (!img) throw new Error(`Foto non trovata: ${key}`);
  return img;
}

export function haFoto(key: string) {
  return byKey.has(key);
}
