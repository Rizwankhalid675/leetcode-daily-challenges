const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { rob } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(root) {
  const nodes = [], parent = [];
  const walk = (x, p) => {
    if (!x) return;
    const id = nodes.length;
    nodes.push(x); parent.push(p);
    walk(x.left, id); walk(x.right, id);
  };
  walk(root, -1);
  let best = 0;
  for (let mask = 0; mask < 1 << nodes.length; mask++) {
    let ok = true, sum = 0;
    for (let i = 0; i < nodes.length && ok; i++) if (mask >> i & 1) {
      if (parent[i] >= 0 && (mask >> parent[i] & 1)) ok = false;
      sum += nodes[i].val;
    }
    if (ok) best = Math.max(best, sum);
  }
  return best;
}
function randomLevelOrder(len) {
  const a = [ri(0, 20)];
  for (let i = 1; i < len; i++) a.push(Math.random() < 0.3 ? null : ri(0, 20));
  return a;
}

test('official examples', () => {
  assert.strictEqual(rob(buildTree([3, 2, 3, null, 3, null, 1])), 7);
  assert.strictEqual(rob(buildTree([3, 4, 5, 1, 3, null, 1])), 9);
});

test('single node and zero values', () => {
  assert.strictEqual(rob(buildTree([5])), 5);
  assert.strictEqual(rob(buildTree([0, 0, 0])), 0);
});

test('matches enumeration of independent node sets', () => {
  for (let t = 0; t < 300; t++) {
    const root = buildTree(randomLevelOrder(ri(1, 14)));
    assert.strictEqual(rob(root), brute(root));
  }
});

test('10^4-deep chain: no stack overflow, matches linear house robber', () => {
  const vals = rarr(10000, 0, 10000);
  const arr = [];
  vals.forEach((v, i) => { if (i) arr.push(null); arr.push(v); });
  let a = 0, b = 0;
  for (const v of vals) [a, b] = [b, Math.max(b, a + v)];
  const t0 = Date.now();
  assert.strictEqual(rob(buildTree(arr)), b);
  assert.ok(Date.now() - t0 < 1000);
});
