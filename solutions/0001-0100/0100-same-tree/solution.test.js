const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { isSameTree } = require('./solution');

function toArr(root) {
  const out = [], q = [root];
  for (let h = 0; h < q.length; h++) {
    const nd = q[h];
    if (nd) { out.push(nd.val); q.push(nd.left, nd.right); } else out.push(null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function randomTree(n, val) {
  let root = null;
  for (let i = 0; i < n; i++) {
    const nd = new TreeNode(val(i));
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return root;
}
const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

test('official examples', () => {
  assert.strictEqual(isSameTree(buildTree([1, 2, 3]), buildTree([1, 2, 3])), true);
  assert.strictEqual(isSameTree(buildTree([1, 2]), buildTree([1, null, 2])), false);
  assert.strictEqual(isSameTree(buildTree([1, 2, 1]), buildTree([1, 1, 2])), false);
});

test('empty trees', () => {
  assert.strictEqual(isSameTree(null, null), true);
  assert.strictEqual(isSameTree(null, buildTree([0])), false);
});

test('matches level-order serialization comparison', () => {
  for (let t = 0; t < 2000; t++) {
    const a = randomTree(rint(0, 6), () => rint(0, 2));
    const b = Math.random() < 0.3 ? buildTree(toArr(a)) : randomTree(rint(0, 6), () => rint(0, 2));
    assert.strictEqual(isSameTree(a, b), JSON.stringify(toArr(a)) === JSON.stringify(toArr(b)));
  }
});
