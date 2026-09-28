const test = require('node:test');
const assert = require('node:assert');
const { firstStableIndex } = require('./solution');

test('official examples', () => {
  assert.strictEqual(firstStableIndex([5, 0, 1, 4], 3), 3);
  assert.strictEqual(firstStableIndex([3, 2, 1], 1), -1);
  assert.strictEqual(firstStableIndex([0], 0), 0);
});

test('edge cases', () => {
  assert.strictEqual(firstStableIndex([1, 2, 3], 0), 0); // sorted: score at 0 is 1 - 1 = 0
  assert.strictEqual(firstStableIndex([7, 7, 7], 0), 0);
  assert.strictEqual(firstStableIndex([1e9, 0], 1e9), 0); // score exactly k counts
  assert.strictEqual(firstStableIndex([1e9, 0], 1e9 - 1), -1);
});
