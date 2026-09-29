const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { trimBST } = require('./solution');

function serialize(root) {
  const out = [];
  const q = [root];
  for (let h = 0; h < q.length; h++) {
    const node = q[h];
    if (node === null) { out.push(null); continue; }
    out.push(node.val);
    q.push(node.left, node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

function refTrim(node, low, high) {
  if (!node) return null;
  if (node.val < low) return refTrim(node.right, low, high);
  if (node.val > high) return refTrim(node.left, low, high);
  const copy = new TreeNode(node.val);
  copy.left = refTrim(node.left, low, high);
  copy.right = refTrim(node.right, low, high);
  return copy;
}

function randomBST(n) {
  const vals = new Set();
  while (vals.size < n) vals.add(Math.floor(Math.random() * 40));
  let root = null;
  for (const v of vals) {
    const leaf = new TreeNode(v);
    if (!root) { root = leaf; continue; }
    let cur = root;
    for (;;) {
      if (v < cur.val) { if (!cur.left) { cur.left = leaf; break; } cur = cur.left; }
      else { if (!cur.right) { cur.right = leaf; break; } cur = cur.right; }
    }
  }
  return root;
}

test('official examples', () => {
  assert.deepStrictEqual(serialize(trimBST(buildTree([1, 0, 2]), 1, 2)), [1, null, 2]);
  assert.deepStrictEqual(serialize(trimBST(buildTree([3, 0, 4, null, 2, null, null, 1]), 1, 3)), [3, 2, null, 1]);
});

test('everything trimmed away', () => {
  assert.strictEqual(trimBST(buildTree([5, 3, 8]), 10, 20), null);
  assert.strictEqual(trimBST(buildTree([5, 3, 8]), 0, 2), null);
});

test('matches recursive reference on random BSTs', () => {
  for (let t = 0; t < 1000; t++) {
    const root = randomBST(1 + Math.floor(Math.random() * 25));
    let low = Math.floor(Math.random() * 40);
    let high = Math.floor(Math.random() * 40);
    if (low > high) [low, high] = [high, low];
    const expected = serialize(refTrim(root, low, high));
    assert.deepStrictEqual(serialize(trimBST(root, low, high)), expected);
  }
});

test('skewed tree of 10^4 nodes', () => {
  const root = new TreeNode(0);
  let cur = root;
  for (let i = 1; i < 10000; i++) cur = cur.right = new TreeNode(i);
  const res = trimBST(root, 5000, 5002);
  assert.deepStrictEqual(serialize(res), [5000, null, 5001, null, 5002]);
});
