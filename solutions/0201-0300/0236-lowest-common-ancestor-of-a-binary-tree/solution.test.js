const test = require('node:test');
const assert = require('node:assert');
const { lowestCommonAncestor } = require('./solution');
const { buildTree } = require('../../../tests/helpers/tree');

const find = (n, v) => (!n ? null : n.val === v ? n : find(n.left, v) || find(n.right, v));
const lca = (vals, a, b) => {
  const root = buildTree(vals);
  return lowestCommonAncestor(root, find(root, a), find(root, b)).val;
};

// Reference: classic recursive LCA.
const recursive = (n, p, q) => {
  if (!n || n === p || n === q) return n;
  const l = recursive(n.left, p, q);
  const r = recursive(n.right, p, q);
  return l && r ? n : l || r;
};

test('official examples', () => {
  assert.strictEqual(lca([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1), 3);
  assert.strictEqual(lca([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4), 5); // a node is its own ancestor
  assert.strictEqual(lca([1, 2], 1, 2), 1);
});

test('matches recursive LCA on random trees and pairs', () => {
  for (let t = 0; t < 300; t++) {
    const n = 2 + Math.floor(Math.random() * 20);
    const vals = Array.from({ length: n }, (_, i) => i); // unique values, complete-ish tree
    const root = buildTree(vals);
    const a = Math.floor(Math.random() * n);
    let b = Math.floor(Math.random() * n);
    if (b === a) b = (a + 1) % n;
    const p = find(root, a);
    const q = find(root, b);
    assert.strictEqual(lowestCommonAncestor(root, p, q), recursive(root, p, q));
  }
});
