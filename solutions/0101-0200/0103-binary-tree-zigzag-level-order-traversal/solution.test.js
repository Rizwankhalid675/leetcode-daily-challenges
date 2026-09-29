const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { zigzagLevelOrder } = require('./solution');

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
  return out.map((row, d) => (d % 2 ? row.reverse() : row));
}

test('official examples', () => {
  assert.deepStrictEqual(zigzagLevelOrder(buildTree([3, 9, 20, null, null, 15, 7])), [[3], [20, 9], [15, 7]]);
  assert.deepStrictEqual(zigzagLevelOrder(buildTree([1])), [[1]]);
  assert.deepStrictEqual(zigzagLevelOrder(buildTree([])), []);
});

test('four full levels', () => {
  assert.deepStrictEqual(
    zigzagLevelOrder(buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])),
    [[1], [3, 2], [4, 5, 6, 7], [15, 14, 13, 12, 11, 10, 9, 8]],
  );
});

test('matches DFS-by-depth oracle', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomTree(rint(0, 40), () => rint(-100, 100));
    assert.deepStrictEqual(zigzagLevelOrder(root), oracle(root));
  }
});
