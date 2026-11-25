import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchCategories, fetchProducts } from '../src/services/catalogue.js';
test('categories load from server without static fallback', async () => {
  assert.deepEqual(
    await fetchCategories('/api', undefined, async () => ({
      ok: true,
      json: async () => ({ categories: [] }),
    })),
    [],
  );
});
test('product filtering and pagination are sent to server', async () => {
  let requested;
  const data = {
    products: [{ id: '1', title: 'Pendant', category: 'Silver' }],
    pagination: { page: 2, limit: 8, total: 9, totalPages: 2 },
  };
  const result = await fetchProducts(
    '/api/',
    { category: 'silver', page: 2, limit: 8, search: 'stone & pearl', sort: 'price-low' },
    undefined,
    async (url) => {
      requested = new URL(url, 'https://example.test');
      return { ok: true, json: async () => data };
    },
  );
  assert.equal(requested.pathname, '/api/products');
  assert.equal(requested.searchParams.get('category'), 'silver');
  assert.equal(requested.searchParams.get('search'), 'stone & pearl');
  assert.equal(requested.searchParams.get('page'), '2');
  assert.equal(result.pagination.total, 9);
});
test('malformed responses and failed API calls reject', async () => {
  await assert.rejects(
    fetchCategories('/api', undefined, async () => ({ ok: false, status: 503 })),
  );
  await assert.rejects(
    fetchCategories('/api', undefined, async () => ({
      ok: true,
      json: async () => ({ categories: [{}] }),
    })),
  );
  await assert.rejects(
    fetchProducts('/api', { page: 1, limit: 8, sort: 'featured' }, undefined, async () => ({
      ok: true,
      json: async () => ({ products: [] }),
    })),
  );
});
