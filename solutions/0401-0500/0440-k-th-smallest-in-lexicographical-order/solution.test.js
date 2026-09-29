const test = require('node:test');
const assert = require('node:assert');
const { findKthNumber } = require('./solution');

function brute(n, k) {
  const arr = Array.from({ length: n }, (_, i) => String(i + 1)).sort();
  return Number(arr[k - 1]);
}

test('official examples', () => {
  assert.strictEqual(findKthNumber(13, 2), 10);
  assert.strictEqual(findKthNumber(1, 1), 1);
});

test('matches string sort for every k on small n', () => {
  for (const n of [1, 2, 9, 10, 11, 19, 20, 99, 100, 101, 120, 999, 1000, 1234]) {
    const arr = Array.from({ length: n }, (_, i) => String(i + 1)).sort();
    for (let k = 1; k <= n; k++) assert.strictEqual(findKthNumber(n, k), Number(arr[k - 1]));
  }
});

test('random n up to 5000', () => {
  for (let t = 0; t < 200; t++) {
    const n = 1 + Math.floor(Math.random() * 5000);
    const k = 1 + Math.floor(Math.random() * n);
    assert.strictEqual(findKthNumber(n, k), brute(n, k));
  }
});

test('max n = 10^9', () => {
  assert.strictEqual(findKthNumber(1e9, 1), 1);
  assert.strictEqual(findKthNumber(1e9, 2), 10);
  assert.strictEqual(findKthNumber(1e9, 1e9), 999999999);
  assert.strictEqual(findKthNumber(1e9, 10), 1000000000);
});
