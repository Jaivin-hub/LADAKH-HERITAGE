import fs from 'node:fs';
import { pendantProducts } from '../src/pendantProducts.js';
const manifest = JSON.parse(fs.readFileSync(new URL('../pendant-generation-manifest.json', import.meta.url)));
const existing = new Map(pendantProducts.map(p => [p.id, p]));
const products = [];
for (const item of manifest) {
  if (!fs.existsSync(new URL(`../public/products/${item.slug}.png`, import.meta.url))) continue;
  products.push(existing.get(item.id) || {
    id: item.id, title: item.title, category: 'Marcasite Vintage Pendants',
    materials: 'Marcasite-style decorative metalwork; stone identities and metal composition to be confirmed by the store.',
    description: item.subject.charAt(0).toUpperCase() + item.subject.slice(1) + '.',
    priceINR: null, origin: 'Ladakh Heritage · Varkala', badge: 'In the Store',
    image: `/products/${item.slug}.png`, originalImage: '/products/marcasite-pendants-original.jpeg'
  });
  item.status = 'listed';
}
fs.writeFileSync(new URL('../src/pendantProducts.js', import.meta.url), `export const pendantProducts = ${JSON.stringify(products, null, 2)};\n`);
fs.writeFileSync(new URL('../pendant-generation-manifest.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
console.log(`${products.length}/${manifest.length} pendants listed`);
