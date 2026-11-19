import fs from 'node:fs';
const manifestPath = new URL(
  '../docs/assets/manifests/victory-generation-manifest.json',
  import.meta.url,
);
const manifest = JSON.parse(fs.readFileSync(manifestPath));
const products = [];
for (const p of manifest) {
  if (!fs.existsSync(new URL(`../public/products/${p.slug}.png`, import.meta.url))) continue;
  products.push({
    id: p.id,
    title: p.title,
    category: 'Victorys vintage jewelrys',
    materials: 'Decorative metalwork and coloured stones; materials to be confirmed by the store.',
    description:
      p.type === 'Earrings'
        ? 'A matching pair of vintage-style earrings from our Varkala collection.'
        : 'An ornate vintage-style ring from our Varkala collection.',
    priceINR: null,
    origin: 'Ladakh Heritage · Varkala',
    badge: 'In the Store',
    image: `/products/${p.slug}.png`,
    originalImage: '/products/victory-vintage-original.jpeg',
  });
  p.status = 'listed';
}
fs.writeFileSync(
  new URL('../src/data/products/victoryProducts.js', import.meta.url),
  `export const victoryProducts = ${JSON.stringify(products, null, 2)};\n`,
);
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${products.length}/${manifest.length} Victory products listed`);
