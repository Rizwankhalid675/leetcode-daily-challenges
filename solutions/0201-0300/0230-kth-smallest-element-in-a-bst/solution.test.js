const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { kthSmallest } = require('./solution');

function randomBST(n, maxVal) {
  const vals = new Set();
  while (vals.size < n) vals.add(Math.floor(Math.random() * (maxVal + 1)));
  let root = null;
  for (const v of vals) {
    const nd = new TreeNode(v);
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = v < cur.val ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return { root, sorted: [...vals].sort((a, b) => a - b) };
}
function chain(vals, side) {
  let root = null;
  for (let i = vals.length - 1; i >= 0; i--) {
    const nd = new TreeNode(vals[i]);
    nd[side] = root;
    root = nd;
  }
  return root;
}
const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

test('official examples', () => {
  assert.strictEqual(kthSmallest(buildTree([3, 1, 4, null, 2]), 1), 1);
  assert.strictEqual(kthSmallest(buildTree([5, 3, 6, 2, 4, null, null, 1]), 3), 3);
});

test('matches sorted values for every k', () => {
  for (let t = 0; t < 300; t++) {
    const { root, sorted } = randomBST(rint(1, 30), 1e4);
    for (let k = 1; k <= sorted.length; k++) assert.strictEqual(kthSmallest(root, k), sorted[k - 1]);
  }
});

test('10^4-node chains', () => {
  const vals = Array.from({ length: 1e4 }, (_, i) => i);
  assert.strictEqual(kthSmallest(chain([...vals].reverse(), 'left'), 1e4), 9999);
  assert.strictEqual(kthSmallest(chain(vals, 'right'), 1e4), 9999);
});
