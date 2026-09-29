const test = require('node:test');
const assert = require('node:assert');
const { minSubarray } = require('./solution');

function brute(a, p) {
  const total = a.reduce((s, x) => s + x, 0);
  if (total % p === 0) return 0;
  let best = -1;
  for (let i = 0; i < a.length; i++) {
    let s = 0;
    for (let j = i; j < a.length; j++) {
      s += a[j];
      const len = j - i + 1;
      if (len < a.length && (total - s) % p === 0 && (best === -1 || len < best)) best = len;
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(minSubarray([3, 1, 4, 2], 6), 1);
  assert.strictEqual(minSubarray([6, 3, 5, 2], 9), 2);
  assert.strictEqual(minSubarray([1, 2, 3], 3), 0);
});

test('whole array cannot be removed', () => {
  assert.strictEqual(minSubarray([1, 2, 3], 7), -1);
  assert.strictEqual(minSubarray([4], 3), -1);
});

test('large values stay exact', () => {
  assert.strictEqual(minSubarray([1e9, 1e9, 1e9], 1e9 - 1), minSubarray([1, 1, 1], 1e9 - 1));
});

test('matches brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => 1 + Math.floor(Math.random() * 20));
    const p = 1 + Math.floor(Math.random() * 15);
    assert.strictEqual(minSubarray(a, p), brute(a, p));
  }
});
