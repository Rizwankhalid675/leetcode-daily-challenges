const test = require('node:test');
const assert = require('node:assert');
const { pathSum } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

// Reference: from every node, walk every downward path (O(n^2)).
function brute(root, target) {
  let count = 0;
  const down = (n, s) => {
    if (!n) return;
    s += n.val;
    if (s === target) count++;
    down(n.left, s);
    down(n.right, s);
  };
  const each = (n) => {
    if (!n) return;
    down(n, 0);
    each(n.left);
    each(n.right);
  };
  each(root);
  return count;
}

test('official examples', () => {
  assert.strictEqual(pathSum(buildTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]), 8), 3);
  assert.strictEqual(pathSum(buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]), 22), 3);
});

test('edge cases', () => {
  assert.strictEqual(pathSum(buildTree([]), 0), 0);
  assert.strictEqual(pathSum(buildTree([0, 0, 0]), 0), 5); // zeros create overlapping paths
  assert.strictEqual(pathSum(buildTree([1e9, 1e9, null, 1e9]), -1000), 0); // large sums stay exact
});

test('matches brute force on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const vals = Array.from({ length: 1 + Math.floor(Math.random() * 15) }, (_, i) => (i > 0 && Math.random() < 0.2 ? null : Math.floor(Math.random() * 7) - 3));
    const target = Math.floor(Math.random() * 7) - 3;
    const root = buildTree(vals);
    assert.strictEqual(pathSum(root, target), brute(root, target), JSON.stringify([vals, target]));
  }
});
