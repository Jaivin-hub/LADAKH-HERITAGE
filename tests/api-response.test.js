import test from 'node:test';
import assert from 'node:assert/strict';
import { readApiResponse } from '../src/services/response.js';

test('HTML hosting errors explain how to fix API routing', async () => {
  await assert.rejects(
    readApiResponse(new Response('<!doctype html>', {
      status: 404, headers: { 'Content-Type': 'text/html' },
    })), /VITE_CATALOGUE_API_URL/,
  );
});
test('JSON API errors keep the server message', async () => {
  await assert.rejects(
    readApiResponse(Response.json({ error: 'Admin API is disabled' }, { status: 403 })),
    /Admin API is disabled/,
  );
});
test('successful JSON responses are preserved', async () => {
  assert.deepEqual(await readApiResponse(Response.json({ products: [] })), { products: [] });
});
