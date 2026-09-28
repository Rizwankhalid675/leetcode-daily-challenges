const test = require('node:test');
const assert = require('node:assert');
const { maxDepth } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

const recursive = (n) => (n ? 1 + Math.max(recursive(n.left), recursive(n.right)) : 0);

test('official examples', () => {
  assert.strictEqual(maxDepth(buildTree([3, 9, 20, null, null, 15, 7])), 3);
  assert.strictEqual(maxDepth(buildTree([1, null, 2])), 2);
});

test('edge cases', () => {
  assert.strictEqual(maxDepth(buildTree([])), 0);
  assert.strictEqual(maxDepth(buildTree([0])), 1);
  // 10^4-node right chain: fine iteratively
  const chain = buildTree([0, ...Array.from({ length: 9999 }, () => [null, 0]).flat()]);
  assert.strictEqual(maxDepth(chain), 10000);
});

test('matches recursive definition on random trees', () => {
  for (let t = 0; t < 300; t++) {
    const vals = Array.from({ length: Math.floor(Math.random() * 20) }, (_, i) => (i > 0 && Math.random() < 0.3 ? null : i));
    const root = buildTree(vals);
    assert.strictEqual(maxDepth(root), recursive(root));
  }
});
