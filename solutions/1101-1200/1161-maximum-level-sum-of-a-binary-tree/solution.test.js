const test = require('node:test');
const assert = require('node:assert');
const { maxLevelSum } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

test('official examples', () => {
  assert.strictEqual(maxLevelSum(buildTree([1, 7, 0, 7, -8, null, null])), 2);
  assert.strictEqual(maxLevelSum(buildTree([989, null, 10250, 98693, -89388, null, null, null, -32127])), 2);
});

test('edge cases', () => {
  assert.strictEqual(maxLevelSum(buildTree([-5])), 1); // negative root, single level
  assert.strictEqual(maxLevelSum(buildTree([1, 1, 0])), 1); // tie: smallest level wins
  assert.strictEqual(maxLevelSum(buildTree([-1, -2, -3])), 1); // all negative: must not start best at 0
});
