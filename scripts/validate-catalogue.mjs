import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { productsData } from '../src/data/products/index.js';
import {
  collections,
  categoryTabs,
  silverBraceletCollection,
  silverNecklaceCollection,
  silverPendantCollection,
} from '../src/data/collections.js';
import { heroImages } from '../src/config/media.js';

const assets = new Set([...heroImages, '/heritage-story.png', '/ladakh-heritage-logo.png']);
const ids = new Set();
for (const product of productsData) {
  assert.ok(product.id && !ids.has(product.id), `Missing or duplicate product ID: ${product.id}`);
  ids.add(product.id);
  for (const key of ['title', 'materials', 'origin', 'description']) {
    assert.equal(typeof product[key], 'string', `${product.id}: missing ${key}`);
  }
  assert.ok(categoryTabs.includes(product.category), `${product.id}: unknown category`);
  if (product.parentCategory) assert.ok(categoryTabs.includes(product.parentCategory));
  assert.ok(
    product.priceINR == null || (Number.isFinite(product.priceINR) && product.priceINR >= 0),
  );
  for (const image of [product.image, ...(product.images || []), product.originalImage].filter(
    Boolean,
  ))
    assets.add(image);
}
for (const collection of [
  ...collections,
  silverBraceletCollection,
  silverNecklaceCollection,
  silverPendantCollection,
])
  assets.add(collection.image);
for (const asset of assets) {
  assert.ok(asset.startsWith('/'), `Expected a local public asset: ${asset}`);
  assert.ok(existsSync(new URL(`../public${asset}`, import.meta.url)), `Missing asset: ${asset}`);
}
console.log(`Validated ${ids.size} products and ${assets.size} referenced assets.`);
