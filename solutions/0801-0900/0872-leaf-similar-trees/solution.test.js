const test = require('node:test');
const assert = require('node:assert');
const { leafSimilar } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

test('official examples', () => {
  assert.strictEqual(
    leafSimilar(buildTree([3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]), buildTree([3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8])),
    true,
  );
  assert.strictEqual(leafSimilar(buildTree([1, 2, 3]), buildTree([1, 3, 2])), false); // order matters
});

test('edge cases', () => {
  assert.strictEqual(leafSimilar(buildTree([1]), buildTree([1])), true);
  assert.strictEqual(leafSimilar(buildTree([1, 2]), buildTree([2, 2])), true); // different shapes, same leaves
  assert.strictEqual(leafSimilar(buildTree([1, 2, 3]), buildTree([1, 2])), false); // different leaf counts
  assert.strictEqual(leafSimilar(buildTree([1, 2, 200]), buildTree([1, 2, 20, null, null, 0])), false); // [2,200] vs [2,0]
});
