const test = require('node:test');
const assert = require('node:assert');
const { isEmpty } = require('./solution');

test('official examples', () => {
  assert.strictEqual(isEmpty({ x: 5, y: 42 }), false);
  assert.strictEqual(isEmpty({}), true);
  assert.strictEqual(isEmpty([null, false, 0]), false);
});

test('arrays and falsy-valued keys', () => {
  assert.strictEqual(isEmpty([]), true);
  assert.strictEqual(isEmpty({ a: undefined }), false);
  assert.strictEqual(isEmpty([[]]), false);
});

test('matches Object.keys on random JSON values', () => {
  for (let t = 0; t < 200; t++) {
    const n = Math.floor(Math.random() * 3);
    const v = Math.random() < 0.5 ? Array.from({ length: n }, () => 0) : Object.fromEntries(Array.from({ length: n }, (_, i) => ['k' + i, i]));
    assert.strictEqual(isEmpty(JSON.parse(JSON.stringify(v))), Object.keys(v).length === 0);
  }
});
