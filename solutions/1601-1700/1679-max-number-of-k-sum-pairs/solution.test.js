const test = require('node:test');
const assert = require('node:assert');
const { maxOperations } = require('./solution');

// Reference: sort + two pointers (a different algorithm).
function sorted(nums, k) {
  const a = [...nums].sort((x, y) => x - y);
  let lo = 0, hi = a.length - 1, ops = 0;
  while (lo < hi) {
    const s = a[lo] + a[hi];
    if (s === k) ops++, lo++, hi--;
    else if (s < k) lo++;
    else hi--;
  }
  return ops;
}

test('official examples', () => {
  assert.strictEqual(maxOperations([1, 2, 3, 4], 5), 2);
  assert.strictEqual(maxOperations([3, 1, 3, 4, 3], 6), 1);
});

test('edge cases', () => {
  assert.strictEqual(maxOperations([3, 3, 3, 3], 6), 2); // x pairs with itself
  assert.strictEqual(maxOperations([1], 2), 0);
  assert.strictEqual(maxOperations([1e9, 1e9], 2e9), 1);
});

test('matches sort + two-pointer reference', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 1 + Math.floor(Math.random() * 6));
    const k = 2 + Math.floor(Math.random() * 10);
    assert.strictEqual(maxOperations(nums, k), sorted(nums, k), JSON.stringify([nums, k]));
  }
});
