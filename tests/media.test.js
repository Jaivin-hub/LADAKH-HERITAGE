import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaUrl, resolveMedia } from '../src/services/media.js';
const api = 'https://api.ladakhheritage.com/api';
test('legacy localhost and relative uploads use the API origin', () => {
  for (const path of ['/uploads/a.png', 'http://localhost:4000/uploads/a.png', 'http://127.0.0.1:4000/uploads/a.png']) {
    assert.equal(mediaUrl(path, api), 'https://api.ladakhheritage.com/uploads/a.png');
  }
});
test('external images stay unchanged and galleries are resolved', () => {
  assert.equal(mediaUrl('https://cdn.example.com/a.png', api), 'https://cdn.example.com/a.png');
  assert.deepEqual(resolveMedia({ image:'/uploads/a.png', images:['/uploads/b.png'] }, api), {
    image:'https://api.ladakhheritage.com/uploads/a.png', images:['https://api.ladakhheritage.com/uploads/b.png'],
  });
});
