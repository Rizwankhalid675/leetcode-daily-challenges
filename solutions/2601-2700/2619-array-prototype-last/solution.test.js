const test = require('node:test');
const assert = require('node:assert');
// the solution extends Array.prototype; the export below is only a marker
const { Array } = require('./solution');

test('official examples', () => {
  assert.strictEqual([null, {}, 3].last(), 3);
  assert.strictEqual([].last(), -1);
});

test('falsy last elements are returned, not -1', () => {
  assert.strictEqual([1, null].last(), null);
  assert.strictEqual([5, 0].last(), 0);
  assert.strictEqual([false].last(), false);
  const o = {};
  assert.strictEqual([1, o].last(), o);
});

test('marker export is the global Array', () => {
  assert.strictEqual(Array, globalThis.Array);
});
