import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProducts } from '../src/utils/catalogue.js';
import { categoryFromSearch } from '../src/data/collections.js';

const fixture = [
  {
    id: 'a',
    title: 'Amber',
    category: 'Pendants',
    parentCategory: 'Silver Jewellery',
    materials: 'Stone',
    origin: 'Varkala',
    description: 'Warm colour',
    priceINR: 20,
  },
  {
    id: 'b',
    title: 'Blue',
    category: 'Pendants',
    parentCategory: 'Silver Jewellery',
    materials: 'Silver',
    origin: 'Varkala',
    description: 'Cool colour',
    priceINR: null,
  },
  {
    id: 'c',
    title: 'Carving',
    category: 'Heritage Objects',
    materials: 'Wood',
    origin: 'Varkala',
    description: 'Carved detail',
    priceINR: 10,
  },
];

test('category URLs retain existing silver subcategory routes', () => {
  assert.equal(
    categoryFromSearch('?category=Silver%20Jewellery&subcategory=vintage-pendants'),
    'Vintage Silver Pendants',
  );
  assert.equal(
    categoryFromSearch('?category=Silver%20Jewellery&subcategory=vintage-necklaces'),
    'Vintage Silver Necklaces',
  );
  assert.equal(
    categoryFromSearch('?category=Silver%20Jewellery&subcategory=marcasite-bracelets'),
    'Marcasite Vintage Silver Bracelets',
  );
  assert.equal(
    categoryFromSearch('?category=Victorys%20vintage%20jewelrys'),
    'Victorys vintage jewelrys',
  );
});

test('parent category filtering includes children and combines with case-insensitive search', () => {
  assert.deepEqual(
    filterProducts(fixture, 'Silver Jewellery', '', 'featured').map((p) => p.id),
    ['a', 'b'],
  );
  assert.deepEqual(
    filterProducts(fixture, 'Silver Jewellery', 'WARM', 'featured').map((p) => p.id),
    ['a'],
  );
  assert.deepEqual(filterProducts(fixture, 'Pendants', 'wood', 'featured'), []);
});

test('price sorting leaves request-only prices last without changing source order', () => {
  assert.deepEqual(
    filterProducts(fixture, 'All Treasures', '', 'price-low').map((p) => p.id),
    ['c', 'a', 'b'],
  );
  assert.deepEqual(
    filterProducts(fixture, 'All Treasures', '', 'price-high').map((p) => p.id),
    ['a', 'c', 'b'],
  );
  assert.deepEqual(
    fixture.map((p) => p.id),
    ['a', 'b', 'c'],
  );
});
