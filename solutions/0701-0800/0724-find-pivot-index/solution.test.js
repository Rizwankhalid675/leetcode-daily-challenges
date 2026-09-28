const test = require('node:test');
const assert = require('node:assert');
const { pivotIndex } = require('./solution');

function brute(nums) {
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  for (let i = 0; i < nums.length; i++) if (sum(nums.slice(0, i)) === sum(nums.slice(i + 1))) return i;
  return -1;
}

test('official examples', () => {
  assert.strictEqual(pivotIndex([1, 7, 3, 6, 5, 6]), 3);
  assert.strictEqual(pivotIndex([1, 2, 3]), -1);
  assert.strictEqual(pivotIndex([2, 1, -1]), 0); // pivot at the left edge
});

test('edge cases', () => {
  assert.strictEqual(pivotIndex([5]), 0);
  assert.strictEqual(pivotIndex([-1, -1, 0, 1, 1, 0]), 5); // pivot at the right edge
  assert.strictEqual(pivotIndex([0, 0, 0]), 0); // leftmost of several
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 7) - 3);
    assert.strictEqual(pivotIndex(nums), brute(nums), JSON.stringify(nums));
  }
});
