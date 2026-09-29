const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { hasPathSum } = require('./solution');

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
function leafSums(root) {
  const out = [];
  const go = (nd, s) => {
    if (!nd) return;
    s += nd.val;
    if (!nd.left && !nd.right) out.push(s);
    go(nd.left, s);
    go(nd.right, s);
  };
  go(root, 0);
  return out;
}

test('official examples', () => {
  assert.strictEqual(hasPathSum(buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]), 22), true);
  assert.strictEqual(hasPathSum(buildTree([1, 2, 3]), 5), false);
  assert.strictEqual(hasPathSum(buildTree([]), 0), false);
});

test('path must end at a leaf', () => {
  assert.strictEqual(hasPathSum(buildTree([1, 2]), 1), false);
  assert.strictEqual(hasPathSum(buildTree([1, 2]), 3), true);
  assert.strictEqual(hasPathSum(buildTree([-2, null, -3]), -5), true);
});

test('matches enumeration of root-to-leaf sums', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomTree(rint(0, 15), () => rint(-5, 5));
    const target = rint(-10, 10);
    assert.strictEqual(hasPathSum(root, target), leafSums(root).includes(target));
  }
});

test('5000-node chain', () => {
  let root = null;
  for (let i = 0; i < 5000; i++) root = new TreeNode(1, root, null);
  assert.strictEqual(hasPathSum(root, 5000), true);
  assert.strictEqual(hasPathSum(root, 4999), false);
});
