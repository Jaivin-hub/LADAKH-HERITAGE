import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchCatalogue } from '../src/services/catalogue.js';

test('loads both API collections and preserves server image URLs', async () => {
  const calls = [];
  const result = await fetchCatalogue('https://example.test/api/', undefined, async (url) => {
    calls.push(url);
    return {
      ok: true,
      json: async () =>
        url.endsWith('/products')
          ? {
              products: [
                {
                  id: 'new',
                  title: 'New pendant',
                  category: 'Pendants',
                  image: 'https://example.test/new.jpg',
                },
              ],
            }
          : { categories: [{ title: 'Pendants', image: 'https://example.test/category.jpg' }] },
    };
  });
  assert.equal(calls.length, 2);
  assert.equal(result.products[0].image, 'https://example.test/new.jpg');
  assert.equal(result.products[0].priceINR, null);
  assert.equal(result.categories[0].title, 'Pendants');
});

test('empty API catalogue stays empty instead of using archived products', async () => {
  const result = await fetchCatalogue('/api', undefined, async () => ({
    ok: true,
    json: async () => ({ products: [], categories: [] }),
  }));
  assert.deepEqual(result, { products: [], categories: [] });
});

test('rejects failed or malformed API responses', async () => {
  await assert.rejects(fetchCatalogue('/api', undefined, async () => ({ ok: false })));
  await assert.rejects(
    fetchCatalogue('/api', undefined, async () => ({ ok: true, json: async () => ({}) })),
  );
});
