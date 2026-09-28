const test = require('node:test');
const assert = require('node:assert');
const { averageOfSubtree } = require('./solution');
const { buildTree } = require('../../../../tests/helpers/tree');

test('official examples', () => {
  assert.strictEqual(averageOfSubtree(buildTree([4, 8, 5, 0, 1, null, 6])), 5);
  assert.strictEqual(averageOfSubtree(buildTree([1])), 1);
});

test('edge cases', () => {
  assert.strictEqual(averageOfSubtree(buildTree([0])), 1);
  // floor matters: subtree {1, 2} has average 1.5 -> 1, which equals the root
  assert.strictEqual(averageOfSubtree(buildTree([1, 2])), 2);
  // subtree {2, 1} averages 1.5 -> 1, not equal to root 2; the leaf matches itself
  assert.strictEqual(averageOfSubtree(buildTree([2, 1])), 1);
  // a 1000-node chain (recursion depth 1000) is fine
  const chain = buildTree([5, ...Array.from({ length: 999 }, () => [null, 5]).flat()]);
  assert.strictEqual(averageOfSubtree(chain), 1000);
});
