const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { levelOrder } = require('./solution');

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
function oracle(root) {
  const out = [];
  const go = (nd, d) => {
    if (!nd) return;
    (out[d] = out[d] || []).push(nd.val);
    go(nd.left, d + 1);
    go(nd.right, d + 1);
  };
  go(root, 0);
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(levelOrder(buildTree([3, 9, 20, null, null, 15, 7])), [[3], [9, 20], [15, 7]]);
  assert.deepStrictEqual(levelOrder(buildTree([1])), [[1]]);
  assert.deepStrictEqual(levelOrder(buildTree([])), []);
});

test('matches DFS-by-depth oracle', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomTree(rint(0, 40), () => rint(-1000, 1000));
    assert.deepStrictEqual(levelOrder(root), oracle(root));
  }
});
