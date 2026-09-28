const test = require('node:test');
const assert = require('node:assert');
const { resultArray } = require('./solution');

// Reference: apply each update, then scan prefixes from `start` directly.
function brute(nums, k, queries) {
  const a = [...nums];
  return queries.map(([index, value, start, x]) => {
    a[index] = value;
    let p = 1 % k;
    let count = 0;
    for (let j = start; j < a.length; j++) {
      p = (p * (a[j] % k)) % k;
      if (p === x) count++;
    }
    return count;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(resultArray([1, 2, 3, 4, 5], 3, [[2, 2, 0, 2], [3, 3, 3, 0], [0, 1, 0, 1]]), [2, 2, 2]);
  assert.deepStrictEqual(resultArray([1, 2, 4, 8, 16, 32], 4, [[0, 2, 0, 2], [0, 2, 0, 1]]), [1, 0]);
  assert.deepStrictEqual(resultArray([1, 1, 2, 1, 1], 2, [[2, 1, 0, 1]]), [5]);
});

test('edge cases', () => {
  assert.deepStrictEqual(resultArray([5], 1, [[0, 3, 0, 0]]), [1]); // k = 1
  assert.deepStrictEqual(resultArray([2, 3], 5, [[1, 4, 1, 4]]), [1]); // start at the last element
});

test('matches brute force on random inputs', () => {
  for (let t = 0; t < 400; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const k = 1 + Math.floor(Math.random() * 5);
    const nums = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));
    const queries = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => [
      Math.floor(Math.random() * n),
      1 + Math.floor(Math.random() * 1e9),
      Math.floor(Math.random() * n),
      Math.floor(Math.random() * k),
    ]);
    assert.deepStrictEqual(resultArray(nums, k, queries), brute(nums, k, queries), JSON.stringify([nums, k, queries]));
  }
});

test('n = 1e5 with 2e4 queries is fast', () => {
  const n = 1e5;
  const nums = Array.from({ length: n }, (_, i) => (i % 7) + 1);
  const queries = Array.from({ length: 2e4 }, (_, i) => [(i * 7919) % n, (i % 9) + 1, (i * 104729) % n, i % 5]);
  const t0 = Date.now();
  resultArray(nums, 5, queries);
  assert.ok(Date.now() - t0 < 2000);
});
