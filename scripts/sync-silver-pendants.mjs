import fs from 'node:fs';
const manifestPath = new URL(
  '../docs/assets/manifests/vintage-silver-pendant-manifest.json',
  import.meta.url,
);
const m = JSON.parse(fs.readFileSync(manifestPath));
const products = [];
for (const p of m) {
  if (!fs.existsSync(new URL(`../public/products/${p.slug}.png`, import.meta.url))) continue;
  products.push({
    id: p.id,
    title: p.title,
    category: 'Vintage Silver Pendants',
    parentCategory: 'Silver Jewellery',
    materials:
      'Silver-toned metalwork and decorative stones; metal purity and stone identities to be confirmed by the store.',
    description: p.subject.charAt(0).toUpperCase() + p.subject.slice(1) + '.',
    priceINR: null,
    origin: 'Ladakh Heritage · Varkala',
    badge: 'In the Store',
    image: `/products/${p.slug}.png`,
    originalImage: '/products/vintage-silver-pendants-original.jpeg',
  });
  p.status = 'listed';
}
fs.writeFileSync(
  new URL('../src/data/products/silverPendantProducts.js', import.meta.url),
  'export const silverPendantProducts = ' + JSON.stringify(products, null, 2) + ';\n',
);
fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + '\n');
console.log(`${products.length}/${m.length} listed`);
