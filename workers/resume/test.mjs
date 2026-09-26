import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './src/index.js';

const bytes = new TextEncoder().encode('%PDF-1.7\n');
const bucket = {
  async get(key) {
    assert.equal(key, 'resume.pdf');
    return { size: bytes.length, body: new Response(bytes).body };
  },
  async head(key) {
    assert.equal(key, 'resume.pdf');
    return { size: bytes.length };
  },
};
const request = (path, method = 'GET') => new Request(`https://srivastava.dev${path}`, { method });

test('GET serves the current R2 PDF without caching', async () => {
  const response = await worker.fetch(request('/resume?source=application'), { RESUME_BUCKET: bucket });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/pdf');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('content-length'), String(bytes.length));
  assert.equal(await response.text(), new TextDecoder().decode(bytes));
});

test('HEAD returns PDF metadata but no body', async () => {
  const response = await worker.fetch(request('/resume/', 'HEAD'), { RESUME_BUCKET: bucket });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-length'), String(bytes.length));
  assert.equal(response.body, null);
});

test('only the resume path and read methods are exposed', async () => {
  const missing = await worker.fetch(request('/resume-old.pdf'), { RESUME_BUCKET: bucket });
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('cache-control'), 'no-store');

  const rejected = await worker.fetch(request('/resume', 'PUT'), { RESUME_BUCKET: bucket });
  assert.equal(rejected.status, 405);
  assert.equal(rejected.headers.get('allow'), 'GET, HEAD');
});

test('missing R2 object returns an uncached 404', async () => {
  const missing = await worker.fetch(request('/resume'), { RESUME_BUCKET: { get: async () => null } });
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('cache-control'), 'no-store');
});
