const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { averageOfLevels } = require('./solution');

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
  const sums = [], cnts = [];
  const go = (nd, d) => {
    if (!nd) return;
    sums[d] = (sums[d] || 0) + nd.val;
    cnts[d] = (cnts[d] || 0) + 1;
    go(nd.left, d + 1);
    go(nd.right, d + 1);
  };
  go(root, 0);
  return sums.map((s, i) => s / cnts[i]);
}
function close(a, b) {
  assert.strictEqual(a.length, b.length);
  for (let i = 0; i < a.length; i++) assert.ok(Math.abs(a[i] - b[i]) <= 1e-5 * Math.max(1, Math.abs(b[i])), a[i] + ' vs ' + b[i]);
}

test('official examples', () => {
  close(averageOfLevels(buildTree([3, 9, 20, null, null, 15, 7])), [3, 14.5, 11]);
  close(averageOfLevels(buildTree([3, 9, 20, 15, 7])), [3, 14.5, 11]);
});

test('32-bit extremes do not overflow', () => {
  const M = 2147483647;
  close(averageOfLevels(buildTree([M, M, M])), [M, M]);
  close(averageOfLevels(buildTree([-M - 1, -M - 1, M])), [-M - 1, -0.5]);
});

test('matches DFS per-depth sums', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomTree(rint(1, 30), () => rint(-(2 ** 31), 2 ** 31 - 1));
    close(averageOfLevels(root), oracle(root));
  }
});
