const test = require('node:test');
const assert = require('node:assert');
const { kidsWithCandies } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(kidsWithCandies([2, 3, 5, 1, 3], 3), [true, true, true, false, true]);
  assert.deepStrictEqual(kidsWithCandies([4, 2, 1, 1, 2], 1), [true, false, false, false, false]);
  assert.deepStrictEqual(kidsWithCandies([12, 1, 12], 10), [true, false, true]);
});

test('edge cases', () => {
  assert.deepStrictEqual(kidsWithCandies([1, 1], 1), [true, true]); // ties count as greatest
  assert.deepStrictEqual(kidsWithCandies([100, 1], 50), [true, false]);
  assert.deepStrictEqual(kidsWithCandies([50, 100], 50), [true, true]); // exactly reaches the max
});
