const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { isSymmetric } = require('./solution');

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
function mirrorArr(root) {
  const copy = (nd) => (nd ? new TreeNode(nd.val, copy(nd.right), copy(nd.left)) : null);
  return toArr(copy(root));
}

test('official examples', () => {
  assert.strictEqual(isSymmetric(buildTree([1, 2, 2, 3, 4, 4, 3])), true);
  assert.strictEqual(isSymmetric(buildTree([1, 2, 2, null, 3, null, 3])), false);
});

test('single node and shape-only asymmetry', () => {
  assert.strictEqual(isSymmetric(buildTree([1])), true);
  assert.strictEqual(isSymmetric(buildTree([1, 2, 2, 2, null, 2])), false);
});

test('matches "equals its own mirror"', () => {
  for (let t = 0; t < 2000; t++) {
    let root;
    if (Math.random() < 0.4) {
      // build a symmetric tree from a random half, occasionally perturbed
      const half = randomTree(rint(0, 5), () => rint(0, 2));
      const copy = (nd) => (nd ? new TreeNode(nd.val, copy(nd.left), copy(nd.right)) : null);
      const mir = (nd) => (nd ? new TreeNode(nd.val, mir(nd.right), mir(nd.left)) : null);
      root = new TreeNode(9, copy(half), mir(half));
      if (half && Math.random() < 0.3) root.left.val += 1;
    } else root = randomTree(rint(1, 7), () => rint(0, 1));
    const want = JSON.stringify(toArr(root)) === JSON.stringify(mirrorArr(root));
    assert.strictEqual(isSymmetric(root), want);
  }
});
