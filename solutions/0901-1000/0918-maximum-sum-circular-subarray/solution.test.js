const test = require('node:test');
const assert = require('node:assert');
const { maxSubarraySumCircular } = require('./solution');

function brute(a) {
  const n = a.length;
  let best = -Infinity;
  for (let i = 0; i < n; i++) { let s = 0; for (let len = 1; len <= n; len++) { s += a[(i + len - 1) % n]; best = Math.max(best, s); } }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxSubarraySumCircular([1, -2, 3, -2]), 3);
  assert.strictEqual(maxSubarraySumCircular([5, -3, 5]), 10);
  assert.strictEqual(maxSubarraySumCircular([-3, -2, -3]), -2);
});

test('matches circular brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 21) - 10);
    assert.strictEqual(maxSubarraySumCircular(a), brute(a));
  }
});
