const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { invertTree } = require('./solution');

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
  assert.deepStrictEqual(toArr(invertTree(buildTree([4, 2, 7, 1, 3, 6, 9]))), [4, 7, 2, 9, 6, 3, 1]);
  assert.deepStrictEqual(toArr(invertTree(buildTree([2, 1, 3]))), [2, 3, 1]);
  assert.strictEqual(invertTree(buildTree([])), null);
});

test('matches recursive mirror copy', () => {
  for (let t = 0; t < 1000; t++) {
    const a = randomTree(rint(0, 12), () => rint(-100, 100));
    const want = mirrorArr(a);
    assert.deepStrictEqual(toArr(invertTree(a)), want);
  }
});
