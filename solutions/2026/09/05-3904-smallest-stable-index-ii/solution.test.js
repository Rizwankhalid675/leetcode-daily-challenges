const test = require('node:test');
const assert = require('node:assert');
const { firstStableIndex } = require('./solution');
const { firstStableIndex: quadratic } = require('../04-3903-smallest-stable-index-i/solution');

test('official examples', () => {
  assert.strictEqual(firstStableIndex([5, 0, 1, 4], 3), 3);
  assert.strictEqual(firstStableIndex([3, 2, 1], 1), -1);
  assert.strictEqual(firstStableIndex([0], 0), 0);
});

test('agrees with the O(n^2) Part I solution on random arrays', () => {
  for (let t = 0; t < 2000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const a = Array.from({ length: n }, () => Math.floor(Math.random() * 20));
    const k = Math.floor(Math.random() * 20);
    assert.strictEqual(firstStableIndex(a, k), quadratic(a, k), JSON.stringify([a, k]));
  }
});

test('n = 1e5 runs in linear time', () => {
  const a = Array.from({ length: 1e5 }, (_, i) => 1e5 - i); // strictly decreasing: no stable index for k = 0
  const t0 = Date.now();
  assert.strictEqual(firstStableIndex(a, 0), -1);
  assert.ok(Date.now() - t0 < 500);
});
