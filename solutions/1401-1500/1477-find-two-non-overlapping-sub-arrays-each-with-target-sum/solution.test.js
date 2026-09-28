const test = require('node:test');
const assert = require('node:assert');
const { minSumOfLengths } = require('./solution');

// Reference: list every subarray with the target sum, then try every disjoint pair.
function brute(arr, target) {
  const found = [];
  for (let i = 0; i < arr.length; i++) {
    let s = 0;
    for (let j = i; j < arr.length; j++) {
      s += arr[j];
      if (s === target) found.push([i, j]);
    }
  }
  let best = Infinity;
  for (const [a, b] of found) for (const [c, d] of found) if (b < c) best = Math.min(best, b - a + 1 + d - c + 1);
  return best === Infinity ? -1 : best;
}

test('official examples', () => {
  assert.strictEqual(minSumOfLengths([3, 2, 2, 4, 3], 3), 2);
  assert.strictEqual(minSumOfLengths([7, 3, 4, 7], 7), 2);
  assert.strictEqual(minSumOfLengths([4, 3, 2, 6, 2, 3, 4], 6), -1);
});

test('edge cases', () => {
  assert.strictEqual(minSumOfLengths([5], 5), -1); // only one subarray exists
  assert.strictEqual(minSumOfLengths([1, 1], 1), 2);
  assert.strictEqual(minSumOfLengths([1, 1, 1, 2, 2, 2, 4, 4], 6), 6);
});

test('matches brute force on random arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 4));
    const target = 1 + Math.floor(Math.random() * 8);
    assert.strictEqual(minSumOfLengths(arr, target), brute(arr, target), JSON.stringify([arr, target]));
  }
});
