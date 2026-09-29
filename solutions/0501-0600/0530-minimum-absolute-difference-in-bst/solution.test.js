const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { getMinimumDifference } = require('./solution');

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
function oracle(vals) {
  let best = Infinity;
  for (let i = 0; i < vals.length; i++) for (let j = i + 1; j < vals.length; j++) best = Math.min(best, Math.abs(vals[i] - vals[j]));
  return best;
}

test('official examples', () => {
  assert.strictEqual(getMinimumDifference(buildTree([4, 2, 6, 1, 3])), 1);
  assert.strictEqual(getMinimumDifference(buildTree([1, 0, 48, null, null, 12, 49])), 1);
});

test('closest pair is not parent-child', () => {
  assert.strictEqual(getMinimumDifference(buildTree([236, 104, 701, null, 227, null, 911])), 9);
});

test('matches all-pairs brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const { root, sorted } = randomBST(rint(2, 25), rint(30, 1e5));
    assert.strictEqual(getMinimumDifference(root), oracle(sorted));
  }
});

test('10^4-node chain', () => {
  const vals = Array.from({ length: 1e4 }, (_, i) => i * 10);
  vals[5000] = 49995; // one close pair: 49990 / 49995
  assert.strictEqual(getMinimumDifference(chain(vals, 'right')), 5);
});
