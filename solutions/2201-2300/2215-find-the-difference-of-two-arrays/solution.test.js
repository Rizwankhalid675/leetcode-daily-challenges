const test = require('node:test');
const assert = require('node:assert');
const { findDifference } = require('./solution');

const sortBoth = ([x, y]) => [[...x].sort((p, q) => p - q), [...y].sort((p, q) => p - q)];

test('official examples (any order accepted)', () => {
  assert.deepStrictEqual(sortBoth(findDifference([1, 2, 3], [2, 4, 6])), [[1, 3], [4, 6]]);
  assert.deepStrictEqual(sortBoth(findDifference([1, 2, 3, 3], [1, 1, 2, 2])), [[3], []]);
});

test('edge cases', () => {
  assert.deepStrictEqual(findDifference([1], [1]), [[], []]);
  assert.deepStrictEqual(sortBoth(findDifference([-1000, 5, 5], [1000])), [[-1000, 5], [1000]]); // distinct output
});
