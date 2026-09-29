const test = require('node:test');
const assert = require('node:assert');
const { checkSubarraySum } = require('./solution');

function brute(a, k) {
  for (let i = 0; i < a.length; i++) {
    let s = a[i];
    for (let j = i + 1; j < a.length; j++) {
      s += a[j];
      if (s % k === 0) return true;
    }
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(checkSubarraySum([23, 2, 4, 6, 7], 6), true);
  assert.strictEqual(checkSubarraySum([23, 2, 6, 4, 7], 6), true);
  assert.strictEqual(checkSubarraySum([23, 2, 6, 4, 7], 13), false);
});

test('length-one subarrays do not count', () => {
  assert.strictEqual(checkSubarraySum([6], 6), false);
  assert.strictEqual(checkSubarraySum([1, 6], 6), false);
  assert.strictEqual(checkSubarraySum([0, 0], 1), true);
  assert.strictEqual(checkSubarraySum([5, 0, 0, 0], 3), true);
});

test('matches brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 10));
    const k = 1 + Math.floor(Math.random() * 12);
    assert.strictEqual(checkSubarraySum(a, k), brute(a, k));
  }
});
